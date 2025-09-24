#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
import threading
import time

def open_browser():
    time.sleep(1)
    webbrowser.open('http://localhost:8000')

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    PORT = 8000
    Handler = http.server.SimpleHTTPRequestHandler
    
    print(f"🚀 Starting Codera Battle Room server...")
    print(f"📡 Server running at: http://localhost:{PORT}")
    print(f"📁 Serving files from: {os.getcwd()}")
    print(f"🌐 Opening browser automatically...")
    print(f"⏹️  Press Ctrl+C to stop the server")
    
    # Open browser in a separate thread
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped!")