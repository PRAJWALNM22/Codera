# Testing Guide: Global Voice Chat & Screen Sharing

## Prerequisites ✅

Before testing, make sure you have:

1. **Firebase Project Setup** (see `FIREBASE_SETUP_GUIDE.md`)
   - Created Firebase project
   - Enabled Firestore database
   - Updated Firebase config in `index.html`
   - Set up Firestore security rules

2. **Browser Permissions**
   - Allow microphone access for voice chat
   - Allow screen sharing permissions
   - Enable notifications (optional)

## Testing Scenarios 🧪

### 1. Local Testing (Without Firebase)

**Scenario**: Test basic functionality on the same device

**Steps**:
1. Open `index.html` in your browser
2. Navigate to Battle → Battle Overview → Battle with Random/Friends
3. In the battle room, you'll see: "Firebase config not provided, running in local demo mode"
4. Test voice chat and screen sharing buttons
5. Check browser console for WebRTC connection logs

**Expected Results**:
- Voice chat button toggles correctly
- Screen sharing captures your screen
- Browser console shows localStorage-based signaling
- No errors in console related to WebRTC

### 2. Single Network Testing (With Firebase)

**Scenario**: Test global communication on same network with Firebase

**Prerequisites**: Firebase config added to `index.html`

**Steps**:
1. Open battle room in first browser tab
2. Copy the room URL using "Share Room" button
3. Open the copied URL in a new tab or different browser
4. Test voice chat between the two tabs
5. Test screen sharing between the two tabs

**Expected Results**:
- Both tabs show "Firebase initialized" in console
- Voice chat works between tabs
- Screen sharing displays the shared screen
- Firebase logs show successful signaling

### 3. Different Networks Testing (Global)

**Scenario**: Test across different internet connections

**Steps**:
1. Open battle room on your computer
2. Copy the room URL using "Share Room" button
3. Send URL to a friend on different network OR
4. Use your phone's mobile data to access the same URL
5. Test voice chat and screen sharing across networks

**Expected Results**:
- WebRTC connection establishes across different networks
- Voice chat works with good audio quality
- Screen sharing displays correctly on remote device
- Connection state shows "connected" in UI

### 4. Mobile Device Testing

**Scenario**: Test mobile compatibility

**Steps**:
1. Open the battle room URL on mobile browser
2. Test voice chat (mobile microphone)
3. Test screen sharing (mobile screen)
4. Check responsiveness of UI on mobile

**Expected Results**:
- Mobile permissions prompt for microphone/screen
- Voice chat works on mobile
- UI adapts to mobile screen size
- All buttons are accessible and functional

## Testing Checklist 📋

### Voice Chat Testing
- [ ] Voice chat starts without errors
- [ ] Microphone permissions granted
- [ ] Mute/unmute works correctly
- [ ] Audio quality is acceptable
- [ ] No echo or feedback issues
- [ ] Voice chat stops cleanly
- [ ] Connection state updates correctly

### Screen Sharing Testing  
- [ ] Screen sharing starts without errors
- [ ] Screen sharing permissions granted
- [ ] Remote screen displays correctly
- [ ] Screen sharing stops when tab is closed
- [ ] Multiple screen sharing scenarios work
- [ ] Video quality is acceptable
- [ ] Screen sharing controls work

### Firebase Integration Testing
- [ ] Room creation works with Firebase
- [ ] Room joining works with different users
- [ ] WebRTC signaling via Firebase works
- [ ] ICE candidates exchange correctly
- [ ] Connection state persists across page refreshes
- [ ] Multiple participants can join

### URL Sharing Testing
- [ ] "Share Room" button copies correct URL
- [ ] Copied URL opens the same battle room
- [ ] Room ID is visible and selectable
- [ ] URL works across different devices/networks
- [ ] URL format is user-friendly

## Troubleshooting 🛠️

### Common Issues

**1. "Firebase not defined" error**
- **Solution**: Make sure Firebase scripts load before your code
- **Check**: Firebase config is properly set in `index.html`

**2. WebRTC connection fails**
- **Solution**: Check STUN/TURN server configuration
- **Check**: Both users have proper internet connectivity
- **Try**: Different browser or clear browser cache

**3. Microphone/Camera permissions denied**
- **Solution**: Manually allow permissions in browser settings
- **Check**: HTTPS is required for WebRTC (use localhost for testing)

**4. Screen sharing not working**
- **Solution**: Try different browsers (Chrome/Firefox work best)
- **Check**: Screen sharing permissions in browser settings

**5. Firebase permission denied**
- **Solution**: Check Firestore security rules
- **Update**: Rules to allow read/write for development

### Debug Commands

**Check WebRTC Connection State:**
```javascript
// In browser console
console.log('Peer connection state:', peerConnection?.connectionState);
console.log('ICE connection state:', peerConnection?.iceConnectionState);
```

**Check Firebase Connection:**
```javascript
// In browser console  
db.collection('battleRooms').limit(1).get().then(() => {
    console.log('✅ Firebase connected');
}).catch(err => {
    console.log('❌ Firebase error:', err);
});
```

**Monitor WebRTC Statistics:**
```javascript
// In browser console
peerConnection?.getStats().then(stats => {
    stats.forEach(stat => console.log(stat));
});
```

## Browser Compatibility 🌐

### Recommended Browsers
- **Chrome** (best WebRTC support)
- **Firefox** (good WebRTC support)
- **Safari** (limited WebRTC support)
- **Edge** (good WebRTC support)

### Mobile Browsers
- **Chrome Mobile** (recommended)
- **Firefox Mobile** (good support)
- **Safari Mobile** (limited support)

## Performance Tips ⚡

1. **Network Requirements**:
   - Minimum: 1 Mbps upload/download for voice
   - Recommended: 5+ Mbps for screen sharing

2. **System Requirements**:
   - Modern browser with WebRTC support
   - Sufficient RAM (2GB+ recommended)
   - Good CPU for screen encoding

3. **Optimization**:
   - Close unnecessary browser tabs
   - Use wired connection when possible
   - Minimize background applications

## Getting Help 🆘

If you encounter issues:

1. **Check Browser Console**: Look for error messages
2. **Verify Firebase Setup**: Ensure config and rules are correct
3. **Test Network Connectivity**: Try different networks
4. **Update Browser**: Use latest browser version
5. **Review Logs**: Check Firebase console for connection logs

## Success Indicators ✨

You know everything is working when:

1. **Setup Phase**:
   - ✅ Firebase initializes without errors
   - ✅ Room creation/joining works
   - ✅ Room URL sharing functions

2. **Connection Phase**:
   - ✅ WebRTC connection establishes ("connected" status)
   - ✅ ICE candidates exchange successfully
   - ✅ No console errors during connection

3. **Communication Phase**:
   - ✅ Voice chat works bidirectionally
   - ✅ Screen sharing displays correctly
   - ✅ Controls (mute, share, stop) work
   - ✅ Connection persists during the battle

## Next Steps 🚀

Once testing is successful:

1. **Production Setup**:
   - Secure Firebase rules for production
   - Add TURN servers for better connectivity
   - Implement proper authentication

2. **Enhanced Features**:
   - Add video chat capability
   - Implement recording functionality
   - Add bandwidth adaptation

3. **Monitoring**:
   - Add connection quality indicators
   - Implement error reporting
   - Monitor Firebase usage

Happy testing! 🎉