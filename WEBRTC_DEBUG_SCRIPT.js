// WebRTC Debug Console Script
// Copy and paste this into the browser console to debug screen sharing issues

console.log('🔍 Starting WebRTC Debug Analysis...');

// Check if we're in the battle room
const currentPath = window.location.hash;
if (!currentPath.includes('/battle/room')) {
    console.warn('⚠️ Not in battle room. Please navigate to #/battle/room first');
}

// Function to get detailed WebRTC state
function getWebRTCState() {
    console.log('\n📊 ===== WEBRTC STATE ANALYSIS =====');
    
    // Check if peer connection exists
    const pc = window.peerConnectionRef?.current;
    if (!pc) {
        console.log('❌ No peer connection found');
        return;
    }
    
    console.log('✅ Peer Connection found');
    console.log('  - Connection State:', pc.connectionState);
    console.log('  - ICE Connection State:', pc.iceConnectionState);
    console.log('  - ICE Gathering State:', pc.iceGatheringState);
    console.log('  - Signaling State:', pc.signalingState);
    
    // Check senders (what we're sending)
    const senders = pc.getSenders();
    console.log('\n📤 SENDERS (What we\'re sending):');
    senders.forEach((sender, index) => {
        if (sender.track) {
            console.log(`  ${index}: ${sender.track.kind} - ${sender.track.label} (enabled: ${sender.track.enabled})`);
        } else {
            console.log(`  ${index}: No track`);
        }
    });
    
    // Check receivers (what we're receiving)
    const receivers = pc.getReceivers();
    console.log('\n📥 RECEIVERS (What we\'re receiving):');
    receivers.forEach((receiver, index) => {
        if (receiver.track) {
            console.log(`  ${index}: ${receiver.track.kind} - ${receiver.track.label} (enabled: ${receiver.track.enabled})`);
        } else {
            console.log(`  ${index}: No track`);
        }
    });
    
    // Check remote streams
    console.log('\n🎬 REMOTE STREAMS:');
    const remoteStreams = receivers
        .map(receiver => receiver.track)
        .filter(track => track)
        .reduce((streams, track) => {
            const streamId = track.id.split('_')[0]; // Approximate stream grouping
            if (!streams[streamId]) {
                streams[streamId] = [];
            }
            streams[streamId].push(track);
            return streams;
        }, {});
    
    Object.keys(remoteStreams).forEach(streamId => {
        const tracks = remoteStreams[streamId];
        console.log(`  Stream ${streamId}:`);
        tracks.forEach(track => {
            console.log(`    - ${track.kind}: ${track.label} (enabled: ${track.enabled}, readyState: ${track.readyState})`);
        });
    });
}

// Function to check video element state
function checkVideoElement() {
    console.log('\n📺 ===== VIDEO ELEMENT ANALYSIS =====');
    
    const videoElement = document.querySelector('video[autoplay]');
    if (!videoElement) {
        console.log('❌ No video element found');
        return;
    }
    
    console.log('✅ Video Element found');
    console.log('  - Has srcObject:', !!videoElement.srcObject);
    console.log('  - Video Width:', videoElement.videoWidth);
    console.log('  - Video Height:', videoElement.videoHeight);
    console.log('  - Ready State:', videoElement.readyState);
    console.log('  - Network State:', videoElement.networkState);
    console.log('  - Paused:', videoElement.paused);
    console.log('  - Muted:', videoElement.muted);
    console.log('  - Autoplay:', videoElement.autoplay);
    
    if (videoElement.srcObject) {
        const stream = videoElement.srcObject;
        console.log('\n🎥 Stream attached to video:');
        console.log('  - Stream ID:', stream.id);
        console.log('  - Active:', stream.active);
        console.log('  - Video tracks:', stream.getVideoTracks().length);
        console.log('  - Audio tracks:', stream.getAudioTracks().length);
        
        stream.getVideoTracks().forEach((track, index) => {
            console.log(`    Video ${index}: ${track.label} (enabled: ${track.enabled}, readyState: ${track.readyState})`);
        });
    }
}

// Function to check localStorage signaling
function checkLocalStorageSignals() {
    console.log('\n💾 ===== LOCALSTORAGE SIGNALS =====');
    
    const roomId = new URL(window.location.href).searchParams.get('id') || 
                   (window.location.hash.includes('?') ? new URLSearchParams(window.location.hash.split('?')[1]).get('id') : null);
    
    if (!roomId) {
        console.log('❌ No room ID found');
        return;
    }
    
    console.log('Room ID:', roomId);
    
    // Check voice signals
    const voiceSignals = localStorage.getItem('webrtc-voice-signals-' + roomId);
    console.log('Voice signals:', voiceSignals ? JSON.parse(voiceSignals) : 'None');
    
    // Check screen signals
    const screenSignals = localStorage.getItem('screen-share-signals-' + roomId);
    console.log('Screen signals:', screenSignals ? JSON.parse(screenSignals) : 'None');
    
    // Check ICE candidates
    const iceCandidates = localStorage.getItem('ice-candidates-' + roomId);
    console.log('ICE candidates:', iceCandidates ? JSON.parse(iceCandidates).length : 0);
}

// Function to simulate screen sharing test
function testScreenSharing() {
    console.log('\n🧪 ===== SCREEN SHARING TEST =====');
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        console.log('❌ getDisplayMedia not supported');
        return;
    }
    
    console.log('✅ getDisplayMedia is supported');
    console.log('💡 To test screen sharing:');
    console.log('1. Open two browser tabs with the same room URL');
    console.log('2. In tab 1, click the purple screen share button');
    console.log('3. Select a screen/window to share');
    console.log('4. Watch console for "ontrack" events in tab 2');
    console.log('5. Check if video element gets srcObject in tab 2');
}

// Run all checks
function runFullDiagnostic() {
    console.clear();
    console.log('🔍 Running Full WebRTC Diagnostic...\n');
    
    getWebRTCState();
    checkVideoElement();
    checkLocalStorageSignals();
    testScreenSharing();
    
    console.log('\n✅ Diagnostic complete! Check the analysis above.');
    console.log('💡 If screen sharing still not working:');
    console.log('1. Check if ontrack events are firing');
    console.log('2. Verify remoteScreenStream state is being set');
    console.log('3. Ensure video element srcObject is being assigned');
    console.log('4. Check for any JavaScript errors');
}

// Make functions available globally
window.webrtcDebug = {
    getWebRTCState,
    checkVideoElement,
    checkLocalStorageSignals,
    testScreenSharing,
    runFullDiagnostic
};

console.log('🔧 WebRTC Debug Tools loaded!');
console.log('💡 Available commands:');
console.log('  - webrtcDebug.runFullDiagnostic() - Run complete analysis');
console.log('  - webrtcDebug.getWebRTCState() - Check peer connection state');
console.log('  - webrtcDebug.checkVideoElement() - Check video element state');
console.log('  - webrtcDebug.checkLocalStorageSignals() - Check signaling data');
console.log('  - webrtcDebug.testScreenSharing() - Get testing instructions');
console.log('\n🚀 Run webrtcDebug.runFullDiagnostic() to start!');