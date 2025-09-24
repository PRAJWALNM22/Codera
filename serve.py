#!/usr/bin/env python3
"""
Simple HTTP server to serve the Codera application.
This fixes Firebase authentication issues that occur when running from file:// protocol.
"""

import http.server
import socketserver
import os
import webbrowser
from urllib.parse import urlparse

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()

    def log_message(self, format, *args):
        # Log requests with timestamp
        print(f"[{self.log_date_time_string()}] {format % args}")

def start_server(port=8000):
    """Start the HTTP server on the specified port."""
    
    # Change to the directory containing the HTML files
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    print(f"Starting Codera application server...")
    print(f"Directory: {script_dir}")
    print(f"Port: {port}")
    
    try:
        with socketserver.TCPServer(("", port), CORSRequestHandler) as httpd:
            server_url = f"http://localhost:{port}"
            print(f"\n🚀 Codera application is now running at: {server_url}")
            print(f"📁 Serving files from: {script_dir}")
            print(f"🌐 Open your browser and navigate to: {server_url}")
            print(f"\nPress Ctrl+C to stop the server\n")
            
            # Automatically open the browser
            try:
                webbrowser.open(server_url)
                print("✅ Browser opened automatically")
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"Please manually open: {server_url}")
            
            # Start serving
            httpd.serve_forever()
            
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use.")
            print(f"Try running with a different port: python serve.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    import sys
    
    # Default port
    port = 8000
    
    # Check if port was provided as argument
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ Invalid port number. Using default port 8000.")
            port = 8000
    
    start_server(port)