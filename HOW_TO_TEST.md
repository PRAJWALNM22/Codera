# 🎮 How to Test Voice Chat & Screen Sharing

## 🚀 **Quick Testing Guide**

### **Step 1: Open Your Website**
1. Open `index.html` in your browser (double-click the file)
2. Navigate: **Battle** → **Battle with Friends** → **Start Battle**

### **Step 2: Join the Same Room**

#### **Method A: Copy Room Link (Easiest)**
1. In the battle room, click **"Copy Invite Link"** button (blue button in header)
2. Open **new browser tab/window**
3. **Paste and go** to the copied URL
4. Both tabs are now in the same room! 🎉

#### **Method B: Manual URL Copy**
1. Look at your browser URL, it should show something like:
   ```
   file:///path/to/index.html#/battle/room?id=abc123xyz
   ```
2. **Copy this entire URL**
3. Open **new tab/window** and **paste it**
4. Both tabs join the same battle room

#### **Method C: Share with Friends**
1. Send the room URL to a friend
2. They open it in their browser
3. You can voice chat and screen share between different devices!

### **Step 3: Test the Features**

#### **🎙️ Voice Chat Testing:**
1. **Tab 1**: Click the **green microphone button** 🎤
2. **Allow microphone permissions** when prompted
3. **Tab 2**: Also click the green microphone button
4. **Speak in one tab** - you should hear it in the other tab!
5. **Test mute/unmute** buttons

#### **🖥️ Screen Sharing Testing:**
1. **Tab 1**: Click the **purple screen share button** 📺
2. **Choose what to share**: Entire screen, browser tab, or application window
3. **Tab 2**: You should see "Friend's Screen" appear in the communication panel
4. **Test stop sharing** button

## ✅ **What You Should See:**

### **In Battle Room Header:**
- ✅ Timer counting down
- ✅ Room ID displayed  
- ✅ **Blue "Copy Invite Link"** button
- ✅ **Green microphone button** (voice chat)
- ✅ **Purple screen share button**
- ✅ Red "Exit Battle" button

### **In Communication Status Panel:**
- ✅ **Battle Status**: In Progress
- ✅ **Voice Chat**: Active/Disabled/Muted
- ✅ **Screen Share**: Sharing/Not Sharing  
- ✅ **Connection**: Connected/Not Connected
- ✅ **Connected**: 2/2 players (when both tabs open)

### **When Screen Sharing Works:**
- ✅ Small video preview of shared screen
- ✅ Real-time updates of what's being shared

## 🛠️ **Troubleshooting:**

### **"Cannot access microphone":**
- Click the 🔒 lock icon in browser address bar
- Allow microphone permissions
- Refresh the page and try again

### **"Cannot share screen":**
- Click "Share" in the browser popup
- Choose what to share (tab, window, or screen)
- Grant permissions

### **"No friend's screen visible":**
- Make sure both tabs have same room ID in URL
- Check that screen sharing button shows "Stop" (meaning it's active)
- Try refreshing both tabs

### **"Voice chat not working":**
- Check both tabs have microphone permissions
- Look for green "Active" status in communication panel
- Try unmuting if status shows "Muted"

## 🎯 **Testing Scenarios:**

### **Scenario 1: Basic Voice Chat**
1. Open 2 tabs with same room URL
2. Enable voice chat in both
3. Talk in one, hear in other ✅

### **Scenario 2: Screen + Voice**
1. Enable voice chat in both tabs  
2. Enable screen sharing in one tab
3. Code in the sharing tab while talking
4. Other tab sees your screen and hears your voice ✅

### **Scenario 3: Multi-Device**
1. Copy invite link from first device
2. Send to friend or open on phone/tablet
3. Test voice chat across devices ✅

## 🏆 **Success Indicators:**
- 🟢 Voice status shows "Active"
- 🟣 Screen share status shows "Sharing"  
- 📺 Remote screen video appears
- 🔊 Audio works both ways
- 📋 Copy button shows "Copied!" when clicked

**Ready to test? Open two tabs and battle with yourself! 🥷**