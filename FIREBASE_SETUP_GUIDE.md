# Firebase Setup Guide for Global Voice Chat & Screen Sharing

## Step 1: Create Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "codera-battle-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll configure rules later)
4. Select a location for your database (choose closest to your users)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project console, click on the gear icon ⚙️ (Project settings)
2. Scroll down to "Your apps" section
3. Click on the web icon `</>` to add a web app
4. Register your app with a nickname (e.g., "codera-web")
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 4: Update Your Code

Replace the demo Firebase config in your `index.html` file. Look for this section and replace with your real config:

```javascript
// Replace this section in your index.html
const firebaseConfig = {
  // Your real Firebase config goes here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
```

## Step 5: Configure Firestore Security Rules

1. Go to "Firestore Database" in your Firebase console
2. Click on the "Rules" tab
3. Replace the default rules with these development-friendly rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to battle rooms for development
    match /battleRooms/{roomId} {
      allow read, write: if true;
    }
    
    // Allow read/write access to signaling data
    match /battleRooms/{roomId}/signaling/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to participants
    match /battleRooms/{roomId}/participants/{document} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Important**: These rules are for development only. In production, you should implement proper authentication and authorization.

## Step 6: Enable Authentication (Optional but Recommended)

1. Go to "Authentication" in your Firebase console
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Anonymous" authentication for now (easiest for testing)
5. You can add other methods later (Email/Password, Google, etc.)

## Step 7: Test Your Setup

After updating your code with the real Firebase config:

1. Open your app in a browser
2. Open browser developer tools (F12)
3. Check the console for any Firebase connection errors
4. Try creating a battle room and see if it creates documents in Firestore

## Database Structure

Your Firestore will automatically create this structure when users join battle rooms:

```
battleRooms/
  └── {roomId}/
      ├── createdAt: timestamp
      ├── status: "waiting" | "active" | "completed"
      ├── participants: {...}
      └── signaling/
          └── {participantId}/
              ├── offer: {...}
              ├── answer: {...}
              └── iceCandidates: [...]
```

## Troubleshooting

### Common Issues:

1. **"Firebase not defined" error**: Make sure Firebase scripts are loaded before your code
2. **Permission denied**: Check your Firestore security rules
3. **Network errors**: Verify your API key and project ID are correct
4. **CORS errors**: Make sure you're testing from the correct domain (add it to authorized domains if needed)

### Testing Connection:

Add this code temporarily to test Firebase connection:

```javascript
// Test Firebase connection
db.collection('test').add({
  message: 'Hello Firebase!',
  timestamp: new Date()
}).then(() => {
  console.log('✅ Firebase connected successfully!');
}).catch((error) => {
  console.error('❌ Firebase connection failed:', error);
});
```

## Next Steps

Once Firebase is set up:
1. Update your WebRTC signaling code to use Firestore
2. Test voice chat and screen sharing across different networks
3. Add proper error handling and reconnection logic
4. Implement user authentication for better security

## Security Notes for Production

When you're ready to deploy:

1. **Firestore Rules**: Implement proper authentication-based rules
2. **API Keys**: Secure your Firebase API keys and restrict their usage
3. **CORS**: Configure proper CORS settings for your domains
4. **Authentication**: Implement proper user authentication
5. **Rate Limiting**: Consider implementing rate limiting for signaling operations

## Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Firestore Documentation: https://firebase.google.com/docs/firestore
- WebRTC Documentation: https://webrtc.org/getting-started/overview