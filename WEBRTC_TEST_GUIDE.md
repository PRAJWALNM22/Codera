# WebRTC Voice Chat & Screen Sharing Test Guide

## Overview
The voice chat and screen sharing functionality in your battle room should now work properly. Here's how to test it:

## Prerequisites
- Modern browser (Chrome, Firefox, Edge - latest versions)
- Microphone access permissions
- Two browser tabs or windows

## Testing Steps

### Step 1: Open the Application
1. Open `index.html` in your browser
2. Navigate to the battle room: `#/battle/room`
3. You should see a room ID in the header

### Step 2: Run WebRTC Diagnostic
1. Click the yellow diagnostic button (circle with checkmark) in the header
2. This will test:
   - ✅ WebRTC support
   - ✅ getUserMedia support  
   - ✅ getDisplayMedia support
   - ✅ STUN server connectivity
   - ✅ Microphone permissions
3. Check the console output for detailed results

### Step 3: Test Voice Chat (Two Tabs)
1. **Tab 1 (Creator)**: Copy the room URL from the address bar
2. **Tab 2 (Joiner)**: Open a new tab and paste the URL
3. **Tab 1**: Click the green microphone button to start voice chat
   - Allow microphone permissions when prompted
   - You should see "Voice chat enabled!" in console
4. **Tab 2**: The voice chat should automatically connect
   - Check console for "Received voice chat offer" messages
5. **Both tabs**: Speak and listen - you should hear audio between tabs

### Step 4: Test Screen Sharing
1. In either tab, click the purple screen sharing button
2. Select a screen/window to share when prompted
3. The other tab should receive the screen sharing stream
4. Check the "Communication Status" panel - it should show "Sharing" status

### Step 5: Debug Console Messages
Watch the browser console for these key messages:

**Voice Chat Success Indicators:**
- 🎤 "Starting voice chat..."
- ✅ "Microphone access granted"
- 🔗 "Adding audio tracks to peer connection..."
- 📤 "WebRTC offer sent"
- 📡 "Received remote track: audio"
- ✅ "Remote audio ready to play"

**Screen Sharing Success Indicators:**
- 📺 "Starting screen sharing..."
- ✅ "Screen capture access granted"
- 📤 "Creating screen sharing offer..."
- 📡 "Received remote track: video"

**Connection Success:**
- ✅ "WebRTC connection established successfully!"
- "WebRTC connection state: connected"

## Troubleshooting

### Voice Chat Not Working
1. **Check Permissions**: Run diagnostic test first
2. **Check Console**: Look for permission errors
3. **Try Chrome**: Better WebRTC support than some browsers
4. **Allow Autoplay**: Some browsers block audio autoplay

### Screen Sharing Not Working
1. **Browser Support**: Only works in modern browsers
2. **HTTPS Required**: Some browsers require HTTPS for screen sharing
3. **Permission Denied**: Make sure to allow screen capture

### No Connection Between Tabs
1. **Same Room ID**: Ensure both tabs have same room ID in URL
2. **Console Errors**: Check for signaling errors
3. **Refresh Both Tabs**: Sometimes helps reset connection
4. **Clear localStorage**: Run `localStorage.clear()` in console

### Audio Debug Panel
When voice chat is active, you'll see an audio debug panel in the bottom-left with:
- Local audio controls (muted for you)
- Remote audio controls (plays friend's audio)

## Expected Behavior

### Working Voice Chat:
- Green microphone button changes to mute/unmute controls
- Audio debug panel appears
- Console shows successful WebRTC connection
- You can hear audio from the other tab

### Working Screen Sharing:
- Purple button changes to stop button
- "Friend's Screen" video appears in Communication Status panel
- Console shows video track reception

## Performance Tips
- Close other applications using microphone/camera
- Use wired headphones to prevent echo
- Ensure stable internet connection for best quality

## Browser Compatibility
- ✅ **Chrome**: Full support
- ✅ **Firefox**: Full support  
- ✅ **Edge**: Full support
- ⚠️ **Safari**: Limited support (newer versions better)

## Security Notes
- Microphone/camera permissions required
- Screen sharing permissions required  
- HTTPS recommended for production
- STUN servers used for NAT traversal

---

## Technical Details

The implementation includes:
- Enhanced error handling and user feedback
- Automatic WebRTC diagnostics
- Firebase + localStorage fallback signaling
- Comprehensive console logging
- Multiple STUN servers for reliability
- Audio/video stream management
- Connection state monitoring

If you encounter issues, check the console output and compare with the expected success indicators above.