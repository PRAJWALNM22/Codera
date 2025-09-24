// Firebase Configuration Update Helper
// Copy this script, replace YOUR_CONFIG with your actual Firebase config, and run it

// REPLACE THIS with your actual Firebase config from the Firebase Console
const YOUR_FIREBASE_CONFIG = {
  // PLACEHOLDER - Replace with your actual config
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", 
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// This is what you need to replace in index.html
console.log("Replace the firebaseConfig section in index.html with:");
console.log("=====================================");
console.log(`const firebaseConfig = ${JSON.stringify(YOUR_FIREBASE_CONFIG, null, 4)};`);
console.log("=====================================");

// Instructions
console.log("\n📋 INSTRUCTIONS:");
console.log("1. Copy the firebaseConfig from Firebase Console");
console.log("2. Replace YOUR_FIREBASE_CONFIG above with your real config");
console.log("3. Copy the output and replace the firebaseConfig in index.html");
console.log("4. The config should be around line 142-157 in index.html");