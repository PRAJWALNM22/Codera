const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for parsing JSON bodies (needed for API proxies)
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

// --- API Proxy Endpoints ---

// AI Chatbot Proxy (Gemini)
app.post('/api/ai', async (req, res) => {
    try {
        const payload = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("❌ Missing GEMINI_API_KEY");
            return res.status(500).json({ error: "Server configuration error" });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        // Dynamically import node-fetch if running in newer Node versions or use require for compatibility
        let fetch;
        try {
            fetch = (await import('node-fetch')).default;
        } catch (e) {
            fetch = require('node-fetch');
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`AI API Error: ${response.status}`, errorText);
            return res.status(response.status).json({ error: `AI API error: ${response.status}` });
        }

        const result = await response.json();
        res.json(result);

    } catch (error) {
        console.error("Error in AI proxy:", error);
        res.status(500).json({ error: "Failed to process AI request" });
    }
});

// Code Execution Proxy (Judge0)
app.post('/api/judge', async (req, res) => {
    try {
        const payload = req.body;
        const apiKey = process.env.RAPIDAPI_KEY;

        if (!apiKey) {
            console.error("❌ Missing RAPIDAPI_KEY");
            return res.status(500).json({ error: "Server configuration error" });
        }

        const apiUrl = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true";

        let fetch;
        try {
            fetch = (await import('node-fetch')).default;
        } catch (e) {
            fetch = require('node-fetch');
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Judge0 API Error: ${response.status}`, errorText);
            return res.status(response.status).json({ error: `Judge0 API error: ${response.status}` });
        }

        const result = await response.json();
        res.json(result);

    } catch (error) {
        console.error("Error in Judge0 proxy:", error);
        res.status(500).json({ error: "Failed to execute code" });
    }
});

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server with CORS enabled
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Map to track active rooms and users
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);

    // Join Room Handler
    socket.on('join', (roomId) => {
        socket.join(roomId);
        socket.roomId = roomId;

        const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        console.log(`👤 Client ${socket.id} joined room ${roomId}. Total: ${roomSize}`);
        socket.to(roomId).emit('user-joined', { userId: socket.id });
    });

    // Chat Message Handler
    socket.on('chat', (data) => {
        if (socket.roomId) {
            socket.to(socket.roomId).emit('chat', {
                ...data,
                sender: data.sender || 'Anonymous',
                id: data.id || Date.now().toString(),
                timestamp: Date.now()
            });
            console.log(`💬 Chat in ${socket.roomId}: ${data.text}`);
        }
    });

    // WebRTC Signaling Handler
    socket.on('signal', (data) => {
        if (socket.roomId) {
            // console.log(`📡 Signal ${data.signalType} from ${socket.id} in ${socket.roomId}`);
            if (data.to) {
                io.to(data.to).emit('signal', {
                    signalType: data.signalType,
                    payload: data.payload,
                    from: socket.id
                });
            } else {
                socket.to(socket.roomId).emit('signal', {
                    signalType: data.signalType,
                    payload: data.payload,
                    from: socket.id
                });
            }
        }
    });

    // Disconnect Handler
    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
        if (socket.roomId) {
            socket.to(socket.roomId).emit('user-left', { userId: socket.id });
        }
    });
});

// Fallback for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`   - Serving static files from: ${__dirname}`);
    console.log(`   - Socket.IO active`);
    console.log(`   - API Proxies enabled: /api/ai, /api/judge`);
});