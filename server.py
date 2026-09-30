#!/usr/bin/env python3
"""
Smriti-Setu NER Local Server
AI-Based Cognitive Gaming & Memory Assistance Platform for Elderly Dementia Patients in NER
"""

import http.server
import socketserver
import os
import sys

# Configure UTF-8 stdout for Windows terminals
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("================================================================")
        print(f"  Smriti-Setu NER Server running at: http://localhost:{PORT}")
        print("  AI Cognitive Platform for Elderly Dementia Care in NER")
        print("================================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)

