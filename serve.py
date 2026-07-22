import http.server
import json
import os
import urllib.parse

DIST = os.path.join(os.path.dirname(__file__), 'dist')

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
    print(f'Serving dist/ on http://localhost:{port}')
    server.serve_forever()
