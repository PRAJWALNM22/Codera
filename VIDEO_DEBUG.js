// Video Debug Script - Run this in the RECEIVER tab console

console.log('🎬 === VIDEO ELEMENT DIAGNOSTICS ===');

function debugVideoElement() {
    const video = document.querySelector('video[autoplay]');
    
    if (!video) {
        console.log('❌ No video element found');
        return;
    }
    
    console.log('📺 Video Element Found:');
    console.log('  - srcObject:', !!video.srcObject);
    console.log('  - Video Width:', video.videoWidth);
    console.log('  - Video Height:', video.videoHeight);
    console.log('  - Client Width:', video.clientWidth);
    console.log('  - Client Height:', video.clientHeight);
    console.log('  - Ready State:', video.readyState);
    console.log('  - Network State:', video.networkState);
    console.log('  - Paused:', video.paused);
    console.log('  - Current Time:', video.currentTime);
    console.log('  - Duration:', video.duration);
    console.log('  - Ended:', video.ended);
    console.log('  - Muted:', video.muted);
    console.log('  - Volume:', video.volume);
    
    // Check CSS properties
    const style = window.getComputedStyle(video);
    console.log('  - CSS Display:', style.display);
    console.log('  - CSS Visibility:', style.visibility);
    console.log('  - CSS Width:', style.width);
    console.log('  - CSS Height:', style.height);
    console.log('  - CSS Object-fit:', style.objectFit);
    
    if (video.srcObject) {
        console.log('\n🎥 Stream Details:');
        const stream = video.srcObject;
        console.log('  - Stream ID:', stream.id);
        console.log('  - Active:', stream.active);
        console.log('  - Video Tracks:', stream.getVideoTracks().length);
        console.log('  - Audio Tracks:', stream.getAudioTracks().length);
        
        stream.getVideoTracks().forEach((track, i) => {
            console.log(`  - Video Track ${i}:`);
            console.log(`    - Label: ${track.label}`);
            console.log(`    - Enabled: ${track.enabled}`);
            console.log(`    - Ready State: ${track.readyState}`);
            console.log(`    - Muted: ${track.muted}`);
            
            // Get track settings if available
            if (track.getSettings) {
                const settings = track.getSettings();
                console.log(`    - Settings:`, settings);
            }
        });
    }
    
    // Try to force video to play
    console.log('\n🔄 Attempting to play video...');
    video.play().then(() => {
        console.log('✅ Video play() succeeded');
        setTimeout(() => {
            console.log('📊 After play - dimensions:', video.videoWidth, 'x', video.videoHeight);
        }, 1000);
    }).catch(e => {
        console.log('❌ Video play() failed:', e);
    });
    
    // Add event listeners for debugging
    video.onloadedmetadata = () => console.log('📺 Metadata loaded - dimensions:', video.videoWidth, 'x', video.videoHeight);
    video.onresize = () => console.log('📏 Video resized to:', video.videoWidth, 'x', video.videoHeight);
    video.oncanplay = () => console.log('✅ Video can play');
    video.onplaying = () => console.log('▶️ Video is playing');
    video.onerror = (e) => console.log('❌ Video error:', e);
    
    return video;
}

// Run diagnostics
const video = debugVideoElement();

// Make video clickable to manually trigger play
if (video) {
    video.style.border = '2px solid red';
    video.style.cursor = 'pointer';
    video.onclick = () => {
        console.log('👆 Video clicked - attempting manual play');
        video.play().then(() => {
            console.log('✅ Manual play succeeded');
        }).catch(e => {
            console.log('❌ Manual play failed:', e);
        });
    };
    
    console.log('👆 Added red border to video - click it to manually trigger play');
}

console.log('\n💡 The video element now has a red border - click it if you can see it!');