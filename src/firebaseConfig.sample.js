import Firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  // Generated
};

// Initialize Firebase
const firebaseApp = Firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
