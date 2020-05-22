import Firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAJTH7kjTlnAKCxSKnNgn-WSgjn54DcI8c",
  authDomain: "domi-e691d.firebaseapp.com",
  databaseURL: "https://domi-e691d.firebaseio.com",
  projectId: "domi-e691d",
  storageBucket: "domi-e691d.appspot.com",
  messagingSenderId: "928875881944",
  appId: "1:928875881944:web:c454311744954182823ead",
  measurementId: "G-QLJ97HHKD6"
};
// Initialize Firebase
const firebaseApp = Firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
