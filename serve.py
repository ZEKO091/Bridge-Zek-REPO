import http.server, json, os, urllib.parse, socketserver, subprocess, sys, multiprocessing, threading, signal

DIST = os.path.join(os.path.dirname(__file__), 'dist')
VTT_SCRIPT = os.path.join(os.path.dirname(__file__), 'python', 'vtt_agent.py')

voice_process = None
voice_logs = []

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
        global voice_process, voice_logs
        if self.path == '/api/metrics':
            cpu = get_cpu(); ram = get_ram(); gpu = get_gpu()
            self.send_json({'cpu': cpu, 'ram': ram['ram'], 'ramGB': ram['ramGB'], 'ramTotal': ram['ramTotal'], 'gpu': gpu['gpu'], 'gpuName': gpu['gpuName'], 'procRAM': 0, 'cores': multiprocessing.cpu_count()})
            return

        if self.path == '/api/voice/start':
            if voice_process and voice_process.poll() is None:
                self.send_json({'ok': True, 'msg': 'Already running'}); return
            if not os.path.exists(VTT_SCRIPT):
                self.send_json({'ok': False, 'msg': 'vtt_agent.py not found'}); return
            voice_logs = []
            try:
                voice_process = subprocess.Popen([sys.executable, VTT_SCRIPT], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, creationflags=subprocess.CREATE_NO_WINDOW)
                def reader():
                    for line in voice_process.stdout:
                        voice_logs.append(line.rstrip())
                threading.Thread(target=reader, daemon=True).start()
                self.send_json({'ok': True, 'msg': 'Voice agent started'})
            except Exception as e:
                self.send_json({'ok': False, 'msg': str(e)})
            return

        if self.path == '/api/voice/stop':
            if voice_process and voice_process.poll() is None:
                voice_process.terminate()
                try: voice_process.wait(timeout=3)
                except: voice_process.kill()
                voice_process = None
                self.send_json({'ok': True, 'msg': 'Stopped'})
            else:
                self.send_json({'ok': True, 'msg': 'Not running'})
            return

        if self.path == '/api/voice/status':
            running = voice_process is not None and voice_process.poll() is None
            self.send_json({'running': running, 'logs': voice_logs[-20:] if voice_logs else []})
            return

        return super().do_GET()

    def send_json(self, data, status=200):
        self.send_response(status); self.send_header('Content-Type', 'application/json'); self.end_headers()
        self.wfile.write(json.dumps(data).encode())

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    server = socketserver.ThreadingTCPServer(('0.0.0.0', port), ZEKHandler)
    server.allow_reuse_address = True
    print(f'Serving on http://localhost:{port}')
    server.serve_forever()
