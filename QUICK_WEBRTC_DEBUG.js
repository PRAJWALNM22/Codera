// Quick WebRTC Screen Sharing Debug Script
// Run this in console when testing screen sharing

console.log('🔍 Quick WebRTC Screen Sharing Diagnostics');

function quickDiagnosis() {
    console.log('\n=== CURRENT STATE ===');
    
    // Check screen peer connection
    const screenPC = window.screenPeerConnectionRef?.current;
    if (screenPC) {
        console.log('📺 Screen Peer Connection:');
        console.log('  - Connection State:', screenPC.connectionState);
        console.log('  - ICE Connection State:', screenPC.iceConnectionState);
        console.log('  - Signaling State:', screenPC.signalingState);
        
        const receivers = screenPC.getReceivers();
        console.log('  - Receivers:', receivers.length);
        receivers.forEach((receiver, i) => {
            if (receiver.track) {
                console.log(`    ${i}: ${receiver.track.kind} - ${receiver.track.readyState}`);
            }
        });
        
        const senders = screenPC.getSenders();
        console.log('  - Senders:', senders.length);
        senders.forEach((sender, i) => {
            if (sender.track) {
                console.log(`    ${i}: ${sender.track.kind} - ${sender.track.readyState}`);
            }
        });
    } else {
        console.log('❌ No screen peer connection found');
    }
    
    // Check video element
    const video = document.querySelector('video[autoplay]');
    if (video) {
        console.log('\n📺 Video Element:');
        console.log('  - Has srcObject:', !!video.srcObject);
        console.log('  - Video dimensions:', video.videoWidth, 'x', video.videoHeight);
        console.log('  - Ready state:', video.readyState);
        console.log('  - Network state:', video.networkState);
        
        if (video.srcObject) {
            console.log('  - Stream tracks:', video.srcObject.getTracks().length);
            video.srcObject.getTracks().forEach((track, i) => {
                console.log(`    ${i}: ${track.kind} - ${track.readyState} - enabled: ${track.enabled}`);
            });
        }
    } else {
        console.log('❌ No video element found');
    }
    
    // Check remote screen stream state
    const hasRemoteStream = !!window.remoteScreenStream;
    console.log('\n🎬 Remote Screen Stream State:', hasRemoteStream);
    
    console.log('\n=== NEXT STEPS ===');
    console.log('1. Try screen sharing again');
    console.log('2. Watch for "📡 ===== ONTRACK EVENT FIRED =====" in console');
    console.log('3. If no ontrack event, the issue is in WebRTC negotiation');
    console.log('4. If ontrack fires but no video, the issue is in stream attachment');
}

// Auto-run and make available
quickDiagnosis();
window.quickDiagnosis = quickDiagnosis;

console.log('\n💡 Run quickDiagnosis() anytime to check current state');