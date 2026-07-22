import http.server
import json
import os
import urllib.parse
import time

DIST = os.path.join(os.path.dirname(__file__), 'dist')

# CPU tracking
cpu_prev_idle = 0
cpu_prev_total = 0

def get_cpu():
    global cpu_prev_idle, cpu_prev_total
    try:
        import psutil
        return psutil.cpu_percent(interval=0)
    except:
        pass
    # fallback: read /proc/stat on Linux or use wmic on Windows
    try:
        import subprocess
        out = subprocess.check_output('wmic cpu get loadpercentage /format:csv', shell=True, timeout=3, stderr=subprocess.DEVNULL)
        lines = out.decode().strip().split('\n')
        for line in lines:
            parts = line.strip().split(',')
            if len(parts) >= 2 and parts[-1].strip().isdigit():
                return int(parts[-1].strip())
    except:
        pass
    return 0

def get_ram():
    try:
        import psutil
        m = psutil.virtual_memory()
        return {'ram': round(m.percent), 'ramGB': round(m.used / (1024**3), 1), 'ramTotal': str(round(m.total / (1024**3), 1))}
    except:
        pass
    try:
        import subprocess
        out = subprocess.check_output('wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /format:csv', shell=True, timeout=3, stderr=subprocess.DEVNULL)
        lines = out.decode().strip().split('\n')
        for line in lines:
            parts = [p.strip() for p in line.split(',')]
            if len(parts) >= 3 and parts[1].isdigit():
                total = int(parts[1]) * 1024
                free = int(parts[2]) * 1024
                used = total - free
                return {'ram': round(used / total * 100), 'ramGB': round(used / (1024**3), 1), 'ramTotal': str(round(total / (1024**3), 1))}
    except:
        pass
    return {'ram': 0, 'ramGB': 0, 'ramTotal': '0'}

def get_gpu():
    try:
        import subprocess
        # nvidia
        out = subprocess.check_output('nvidia-smi --query-gpu=name,utilization.gpu --format=csv,noheader', shell=True, timeout=3, stderr=subprocess.DEVNULL)
        line = out.decode().strip()
        parts = line.split(',')
        name = parts[0].strip() if parts else 'Unknown'
        pct = int(parts[1].strip().replace('%','')) if len(parts) > 1 else 0
        return {'gpu': min(100, max(0, pct)), 'gpuName': name}
    except:
        pass
    try:
        out = subprocess.check_output('wmic path win32_VideoController get name', shell=True, timeout=3, stderr=subprocess.DEVNULL)
        lines = [l.strip() for l in out.decode().split('\n') if l.strip() and 'Name' not in l]
        name = lines[0] if lines else 'Unknown'
        return {'gpu': None, 'gpuName': name}
    except:
        pass
    return {'gpu': None, 'gpuName': 'Unknown'}

def get_proc_ram():
    try:
        import psutil
        p = psutil.Process(os.getpid())
        return round(p.memory_info().rss / (1024**2))
    except:
        pass
    try:
        import subprocess
        out = subprocess.check_output(f'wmic process where ProcessId={os.getpid()} get WorkingSetSize', shell=True, timeout=3, stderr=subprocess.DEVNULL)
        lines = [l.strip() for l in out.decode().split('\n') if l.strip() and 'WorkingSetSize' not in l]
        if lines and lines[0].isdigit():
            return round(int(lines[0]) / (1024**2))
    except:
        pass
    return 0

class ZEKHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if path.startswith('/api/'):
            return path
        return os.path.join(DIST, path.lstrip('/'))

    def do_GET(self):
        if self.path.startswith('/api/list'):
            qs = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(qs)
            folder = params.get('path', [''])[0]
            if not folder or not os.path.isdir(folder):
                self.send_json([]); return
            try:
                entries = []
                for name in os.listdir(folder):
                    full = os.path.join(folder, name)
                    is_dir = os.path.isdir(full)
                    size = os.path.getsize(full) if not is_dir else 0
                    entries.append({'name': name, 'isDirectory': is_dir, 'isFile': not is_dir, 'size': size})
                entries.sort(key=lambda e: (not e['isDirectory'], e['name'].lower()))
                self.send_json(entries)
            except Exception as e:
                self.send_json({'error': str(e)}, 500)
            return

        if self.path.startswith('/api/read'):
            qs = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(qs)
            filepath = params.get('file', [''])[0]
            if filepath and os.path.isfile(filepath):
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                        content = f.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'text/plain')
                    self.end_headers()
                    self.wfile.write(content.encode('utf-8'))
                    return
                except:
                    pass
            self.send_error(404)
            return

        if self.path == '/api/metrics':
            cpu = get_cpu()
            ram_data = get_ram()
            gpu_data = get_gpu()
            proc_ram = get_proc_ram()
            import multiprocessing
            cores = multiprocessing.cpu_count()
            self.send_json({
                'cpu': cpu, 'ram': ram_data['ram'], 'ramGB': ram_data['ramGB'],
                'ramTotal': ram_data['ramTotal'], 'gpu': gpu_data['gpu'],
                'gpuName': gpu_data['gpuName'], 'procRAM': proc_ram, 'cores': cores
            })
            return

        return super().do_GET()

    def do_POST(self):
        if self.path == '/api/write':
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length).decode('utf-8'))
            filepath = body.get('file', '')
            content = body.get('content', '')
            if filepath:
                try:
                    os.makedirs(os.path.dirname(filepath), exist_ok=True)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    self.send_json({'ok': True})
                except Exception as e:
                    self.send_json({'error': str(e)}, 500)
                return
            self.send_json({'error': 'no file'}, 400)
            return
        return super().do_POST()

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

if __name__ == '__main__':
    port = 8080
    server = http.server.HTTPServer(('0.0.0.0', port), ZEKHandler)
    print(f'Serving dist/ + real metrics API on http://localhost:{port}')
    server.serve_forever()
