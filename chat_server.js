const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server with CORS enabled
// Note: In production with same-origin, CORS might not be strictly necessary 
// if connected via relative path, but good to have.
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Map to track active rooms and users
// In a real production app, use Redis or a database
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);

    // Join Room Handler
    socket.on('join', (roomId) => {
        socket.join(roomId);
        socket.roomId = roomId; // Store roomId on socket for convenience

        // Track users in room
        const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        console.log(`👤 Client ${socket.id} joined room ${roomId}. Total: ${roomSize}`);

        // Notify others in room
        socket.to(roomId).emit('user-joined', { userId: socket.id });
    });

    // Chat Message Handler
    socket.on('chat', (data) => {
        if (socket.roomId) {
            // Broadcast to room (excluding sender)
            socket.to(socket.roomId).emit('chat', {
                ...data,
                sender: data.sender || 'Anonymous', // Fallback
                id: data.id || Date.now().toString(),
                timestamp: Date.now()
            });
            console.log(`💬 Chat in ${socket.roomId}: ${data.text}`);
        }
    });

    // WebRTC Signaling Handler (Offer, Answer, ICE Candidate)
    socket.on('signal', (data) => {
        // data structure: { signalType: 'offer'|'answer'|'ice-candidate', payload: ..., to: ... }

        if (socket.roomId) {
            console.log(`📡 Signal ${data.signalType} from ${socket.id} in ${socket.roomId}`);

            // If 'to' is specified, send to specific client (for 1:1 signaling optimization)
            if (data.to) {
                io.to(data.to).emit('signal', {
                    signalType: data.signalType,
                    payload: data.payload,
                    from: socket.id
                });
            } else {
                // Otherwise broadcast to room (excluding sender)
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

// Fallback for SPA routing if needed (though app uses hash routing currently)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`   - Serving static files from: ${__dirname}`);
    console.log(`   - Socket.IO active`);
});