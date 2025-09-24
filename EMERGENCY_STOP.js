// EMERGENCY STOP SCRIPT
// Run this in the console to stop all WebRTC processes and continuous loops

window.EMERGENCY_STOP = () => {
    console.log('🚨 EMERGENCY STOP INITIATED');
    
    // 1. Clear all possible intervals and timeouts
    console.log('🛑 Clearing all intervals and timeouts...');
    for (let i = 0; i < 100000; i++) {
        try {
            clearInterval(i);
            clearTimeout(i);
        } catch(e) {}
    }
    
    // 2. Stop all media tracks
    console.log('📹 Stopping all media tracks...');
    try {
        if (window.localScreenStream) {
            window.localScreenStream.getTracks().forEach(track => track.stop());
        }
        if (window.localAudioStream) {
            window.localAudioStream.getTracks().forEach(track => track.stop());
        }
    } catch(e) {
        console.log('Media tracks cleanup error:', e);
    }
    
    // 3. Close all peer connections
    console.log('🔌 Closing all peer connections...');
    try {
        if (window.peerConnections) {
            Object.values(window.peerConnections).forEach(pc => {
                if (pc && pc.close) pc.close();
            });
            window.peerConnections = {};
        }
    } catch(e) {
        console.log('Peer connections cleanup error:', e);
    }
    
    // 4. Clear localStorage signals
    console.log('🧹 Clearing localStorage signals...');
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.includes('webrtc') || key.includes('screen-share') || key.includes('ice-candidates')) {
                localStorage.removeItem(key);
            }
        });
    } catch(e) {
        console.log('LocalStorage cleanup error:', e);
    }
    
    // 5. Override console methods to reduce spam
    console.log('🤫 Reducing console spam...');
    const originalLog = console.log;
    const originalWarn = console.warn;
    
    console.log = (...args) => {
        const msg = args.join(' ');
        // Only log important messages, filter out repetitive ones
        if (!msg.includes('📺 Received screen share') && 
            !msg.includes('ICE candidate') && 
            !msg.includes('📬 Processing') &&
            !msg.includes('Firebase') &&
            !msg.includes('webrtc')) {
            originalLog(...args);
        }
    };
    
    console.warn = (...args) => {
        const msg = args.join(' ');
        if (!msg.includes('Firebase') && !msg.includes('webrtc')) {
            originalWarn(...args);
        }
    };
    
    console.log('✅ EMERGENCY STOP COMPLETE - Console should be quieter now');
    console.log('🔄 You can now run diagnostics or refresh the page');
};

// Also make it available globally
window.STOP = window.EMERGENCY_STOP;

console.log('🚨 EMERGENCY STOP script loaded!');
console.log('💾 Run: EMERGENCY_STOP() or STOP() to halt everything');