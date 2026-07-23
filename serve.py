import http.server, json, os, urllib.parse, socketserver, subprocess, sys, multiprocessing

DIST = os.path.join(os.path.dirname(__file__), 'dist')

def get_cpu():
    try:
        out = subprocess.check_output('wmic cpu get loadpercentage', shell=True, timeout=2, stderr=subprocess.DEVNULL, creationflags=subprocess.CREATE_NO_WINDOW)
        for line in out.decode().split('\n'):
            line = line.strip()
            if line.isdigit(): return int(line)
    except: pass
    return 0

def get_ram():
    try:
        out = subprocess.check_output('wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /format:csv', shell=True, timeout=2, stderr=subprocess.DEVNULL, creationflags=subprocess.CREATE_NO_WINDOW)
        for line in out.decode().split('\n'):
            parts = [p.strip() for p in line.split(',')]
            if len(parts) >= 3 and parts[1].isdigit():
                total = int(parts[1]) * 1024; free = int(parts[2]) * 1024; used = total - free
                return {'ram': round(used / total * 100), 'ramGB': round(used / (1024**3), 1), 'ramTotal': str(round(total / (1024**3), 1))}
    except: pass
    return {'ram': 0, 'ramGB': 0, 'ramTotal': '0'}

def get_gpu():
    try:
        out = subprocess.check_output('nvidia-smi --query-gpu=name,utilization.gpu --format=csv,noheader', shell=True, timeout=3, stderr=subprocess.DEVNULL)
        line = out.decode().strip()
        parts = line.split(',')
        name = parts[0].strip() if parts else 'Unknown'
        pct = int(parts[1].strip().replace('%','')) if len(parts) > 1 else 0
        return {'gpu': min(100, max(0, pct)), 'gpuName': name}
    except: pass
    try:
        out = subprocess.check_output('wmic path win32_VideoController get name', shell=True, timeout=2, stderr=subprocess.DEVNULL, creationflags=subprocess.CREATE_NO_WINDOW)
        lines = [l.strip() for l in out.decode().split('\n') if l.strip() and 'Name' not in l]
        return {'gpu': None, 'gpuName': lines[0] if lines else 'Unknown'}
    except: pass
    return {'gpu': None, 'gpuName': 'Unknown'}

class ZEKHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        return os.path.join(DIST, path.lstrip('/')) if not path.startswith('/api/') else path

    def do_GET(self):
        if self.path == '/api/metrics':
            cpu = get_cpu(); ram = get_ram(); gpu = get_gpu()
            self.send_json({'cpu': cpu, 'ram': ram['ram'], 'ramGB': ram['ramGB'], 'ramTotal': ram['ramTotal'], 'gpu': gpu['gpu'], 'gpuName': gpu['gpuName'], 'procRAM': 0, 'cores': multiprocessing.cpu_count()})
            return
        return super().do_GET()

    def send_json(self, data, status=200):
        self.send_response(status); self.send_header('Content-Type', 'application/json'); self.end_headers()
        self.wfile.write(json.dumps(data).encode())

def start_auth_server():
    script = os.path.join(os.path.dirname(__file__), 'server', 'server.js')
    if os.path.exists(script):
        try:
            proc = subprocess.Popen(['node', script], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, creationflags=subprocess.CREATE_NO_WINDOW)
            print(f'Auth server started (PID {proc.pid}) on http://localhost:6060')
            return proc
        except Exception as e:
            print(f'Auth server failed to start: {e}')
    else:
        print(f'Server script not found: {script}')
    return None

if __name__ == '__main__':
    start_auth_server()
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 7070
    server = socketserver.ThreadingTCPServer(('0.0.0.0', port), ZEKHandler)
    server.allow_reuse_address = True
    print(f'Serving frontend on http://localhost:{port}')
    server.serve_forever()
