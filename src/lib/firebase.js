import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMp8daIQH9aCQ-J3aDSVBpQS-zAMlp-KI",
  authDomain: "my-tiny-home-hub.firebaseapp.com",
  projectId: "my-tiny-home-hub",
  storageBucket: "my-tiny-home-hub.firebasestorage.app",
  messagingSenderId: "30255415887",
  appId: "1:30255415887:web:fc778cb9cf6666d958203a"
};

// Initialize Firebase for Client-side
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
