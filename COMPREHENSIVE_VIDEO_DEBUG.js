// COMPREHENSIVE VIDEO DEBUG SCRIPT
// Run this script in BOTH sender and receiver browser tabs

const comprehensiveVideoDebug = {
    // Check if this tab is sending screen share
    isSender: () => {
        try {
            // Look for screen sharing button or state
            const screenBtn = document.querySelector('[data-testid="screen-share-btn"]') || 
                            document.querySelector('button[title*="screen"]') ||
                            document.querySelector('button[aria-label*="screen"]');
            
            // Check if there are any local video streams
            const videoElements = document.querySelectorAll('video');
            let hasLocalStream = false;
            
            videoElements.forEach(video => {
                if (video.srcObject && video.srcObject.getVideoTracks) {
                    const tracks = video.srcObject.getVideoTracks();
                    tracks.forEach(track => {
                        if (track.label.includes('screen') || track.kind === 'video') {
                            hasLocalStream = true;
                        }
                    });
                }
            });
            
            return hasLocalStream || (screenBtn && screenBtn.textContent.includes('Stop'));
        } catch (e) {
            return false;
        }
    },

    // Analyze screen capture constraints and settings
    analyzeSenderState: () => {
        console.log('\n🔍 ===== SENDER VIDEO ANALYSIS =====');
        
        // Check current video streams
        const videos = document.querySelectorAll('video');
        console.log(`📺 Found ${videos.length} video elements`);
        
        videos.forEach((video, index) => {
            console.log(`\n📺 Video Element ${index + 1}:`);
            console.log(`  - Source type: ${video.srcObject ? 'MediaStream' : video.src ? 'URL' : 'None'}`);
            console.log(`  - Dimensions: ${video.videoWidth} x ${video.videoHeight}`);
            console.log(`  - Display size: ${video.clientWidth} x ${video.clientHeight}`);
            console.log(`  - Ready state: ${video.readyState}`);
            console.log(`  - Paused: ${video.paused}`);
            
            if (video.srcObject && video.srcObject.getVideoTracks) {
                const videoTracks = video.srcObject.getVideoTracks();
                console.log(`  - Video tracks: ${videoTracks.length}`);
                
                videoTracks.forEach((track, trackIndex) => {
                    console.log(`    Track ${trackIndex + 1}:`);
                    console.log(`      - Label: ${track.label}`);
                    console.log(`      - Kind: ${track.kind}`);
                    console.log(`      - State: ${track.readyState}`);
                    console.log(`      - Enabled: ${track.enabled}`);
                    
                    // Get track settings/constraints
                    const settings = track.getSettings();
                    const capabilities = track.getCapabilities();
                    const constraints = track.getConstraints();
                    
                    console.log(`      - Settings:`, settings);
                    console.log(`      - Capabilities:`, capabilities);
                    console.log(`      - Constraints:`, constraints);
                });
            }
        });
        
        // Check WebRTC peer connections
        console.log('\n🔗 WebRTC Peer Connections:');
        if (window.peerConnections) {
            Object.keys(window.peerConnections).forEach(key => {
                const pc = window.peerConnections[key];
                if (pc) {
                    console.log(`  ${key}: ${pc.connectionState} (${pc.iceConnectionState})`);
                    
                    const senders = pc.getSenders();
                    console.log(`    - Senders: ${senders.length}`);
                    senders.forEach((sender, i) => {
                        if (sender.track) {
                            console.log(`      Sender ${i + 1}: ${sender.track.kind} (${sender.track.label})`);
                            if (sender.track.kind === 'video') {
                                const settings = sender.track.getSettings();
                                console.log(`        Settings:`, settings);
                            }
                        }
                    });
                }
            });
        }
    },

    // Analyze receiver video display
    analyzeReceiverState: () => {
        console.log('\n🔍 ===== RECEIVER VIDEO ANALYSIS =====');
        
        // Find the remote video element
        const videos = document.querySelectorAll('video');
        console.log(`📺 Found ${videos.length} video elements`);
        
        videos.forEach((video, index) => {
            console.log(`\n📺 Video Element ${index + 1}:`);
            console.log(`  - ID: ${video.id}`);
            console.log(`  - Class: ${video.className}`);
            console.log(`  - Source type: ${video.srcObject ? 'MediaStream' : video.src ? 'URL' : 'None'}`);
            console.log(`  - Video dimensions: ${video.videoWidth} x ${video.videoHeight}`);
            console.log(`  - Display size: ${video.clientWidth} x ${video.clientHeight}`);
            console.log(`  - CSS width: ${video.style.width || 'auto'}`);
            console.log(`  - CSS height: ${video.style.height || 'auto'}`);
            console.log(`  - Ready state: ${video.readyState}`);
            console.log(`  - Current time: ${video.currentTime}`);
            console.log(`  - Duration: ${video.duration}`);
            console.log(`  - Paused: ${video.paused}`);
            console.log(`  - Muted: ${video.muted}`);
            console.log(`  - Volume: ${video.volume}`);
            
            // Computed styles
            const computedStyle = window.getComputedStyle(video);
            console.log(`  - Computed width: ${computedStyle.width}`);
            console.log(`  - Computed height: ${computedStyle.height}`);
            console.log(`  - Display: ${computedStyle.display}`);
            console.log(`  - Visibility: ${computedStyle.visibility}`);
            console.log(`  - Object-fit: ${computedStyle.objectFit}`);
            
            // Stream analysis
            if (video.srcObject && video.srcObject.getVideoTracks) {
                const videoTracks = video.srcObject.getVideoTracks();
                const audioTracks = video.srcObject.getAudioTracks();
                
                console.log(`  - Video tracks: ${videoTracks.length}`);
                console.log(`  - Audio tracks: ${audioTracks.length}`);
                console.log(`  - Stream active: ${video.srcObject.active}`);
                console.log(`  - Stream ID: ${video.srcObject.id}`);
                
                videoTracks.forEach((track, trackIndex) => {
                    console.log(`    Video Track ${trackIndex + 1}:`);
                    console.log(`      - Label: ${track.label}`);
                    console.log(`      - State: ${track.readyState}`);
                    console.log(`      - Enabled: ${track.enabled}`);
                    
                    const settings = track.getSettings();
                    console.log(`      - Track settings:`, settings);
                    
                    // This is key - check the actual track dimensions
                    if (settings.width && settings.height) {
                        console.log(`      - ⚠️  TRACK RESOLUTION: ${settings.width} x ${settings.height}`);
                        
                        if (settings.width <= 10 || settings.height <= 10) {
                            console.error(`      - ❌ PROBLEM: Track resolution is too small!`);
                        }
                    }
                });
            }
            
            // Parent container analysis
            console.log(`\n📦 Video Container Analysis:`);
            let parent = video.parentElement;
            let level = 1;
            while (parent && level <= 3) {
                console.log(`  Parent ${level}:`);
                console.log(`    - Tag: ${parent.tagName}`);
                console.log(`    - Class: ${parent.className}`);
                console.log(`    - ID: ${parent.id}`);
                console.log(`    - Display size: ${parent.clientWidth} x ${parent.clientHeight}`);
                
                const parentStyle = window.getComputedStyle(parent);
                console.log(`    - Display: ${parentStyle.display}`);
                console.log(`    - Overflow: ${parentStyle.overflow}`);
                console.log(`    - Width: ${parentStyle.width}`);
                console.log(`    - Height: ${parentStyle.height}`);
                
                parent = parent.parentElement;
                level++;
            }
        });
        
        // Check WebRTC receivers
        console.log('\n🔗 WebRTC Peer Connections (Receiver):');
        if (window.peerConnections) {
            Object.keys(window.peerConnections).forEach(key => {
                const pc = window.peerConnections[key];
                if (pc) {
                    console.log(`  ${key}: ${pc.connectionState} (${pc.iceConnectionState})`);
                    
                    const receivers = pc.getReceivers();
                    console.log(`    - Receivers: ${receivers.length}`);
                    receivers.forEach((receiver, i) => {
                        if (receiver.track) {
                            console.log(`      Receiver ${i + 1}: ${receiver.track.kind} (${receiver.track.label})`);
                            if (receiver.track.kind === 'video') {
                                const settings = receiver.track.getSettings();
                                console.log(`        Track settings:`, settings);
                                
                                // Key diagnostic
                                if (settings.width && settings.height) {
                                    console.log(`        - 📐 RECEIVED RESOLUTION: ${settings.width} x ${settings.height}`);
                                }
                            }
                        }
                    });
                }
            });
        }
    },

    // Run full diagnostic
    runFullDiagnostic: () => {
        console.clear();
        console.log('🚀 COMPREHENSIVE VIDEO DIAGNOSTIC STARTING...\n');
        
        const isSender = comprehensiveVideoDebug.isSender();
        console.log(`📍 This tab is: ${isSender ? 'SENDER' : 'RECEIVER'}`);
        
        if (isSender) {
            comprehensiveVideoDebug.analyzeSenderState();
        } else {
            comprehensiveVideoDebug.analyzeReceiverState();
        }
        
        // Always run general diagnostics
        console.log('\n🌐 General Browser Info:');
        console.log(`  - User Agent: ${navigator.userAgent}`);
        console.log(`  - Screen: ${screen.width} x ${screen.height}`);
        console.log(`  - Available Screen: ${screen.availWidth} x ${screen.availHeight}`);
        console.log(`  - Device pixel ratio: ${window.devicePixelRatio}`);
        
        console.log('\n✅ DIAGNOSTIC COMPLETE');
    }
};

// Auto-detect and run appropriate diagnostic
window.comprehensiveVideoDebug = comprehensiveVideoDebug;
console.log('📋 Comprehensive Video Debug script loaded!');
console.log('🎯 Run: comprehensiveVideoDebug.runFullDiagnostic()');
console.log('📤 Or specifically: comprehensiveVideoDebug.analyzeSenderState()');
console.log('📥 Or specifically: comprehensiveVideoDebug.analyzeReceiverState()');