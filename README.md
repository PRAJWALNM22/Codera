# Codera Battle Platform

A real-time coding battle platform with chat capabilities.

## Prerequisites

- Node.js installed
- Python 3 installed

## Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Running the Application

You need to run both the frontend file server and the backend chat server.

1. **Start the Frontend** (Static File Server):
   ```bash
   npm start
   ```
   Or manually:
   ```bash
   python serve.py
   ```
   This serves the application at [http://localhost:8000](http://localhost:8000).

2. **Start the Backend** (Socket.IO Chat Server):
   Open a new terminal and run:
   ```bash
   node chat_server.js
   ```
   This runs the signaling server at [http://localhost:8080](http://localhost:8080).

## Usage

- Open [http://localhost:8000](http://localhost:8000) in your browser.
- The app expects the chat server to be running on port 8080.


aaaaaaaa