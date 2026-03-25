import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMp8daIQH9aCQ-J3aDSVBpQS-zAMlp-KI",
  authDomain: "my-tiny-home-hub.firebaseapp.com",
  projectId: "my-tiny-home-hub",
  storageBucket: "my-tiny-home-hub.firebasestorage.app",
  messagingSenderId: "30255415887",
  appId: "1:30255415887:web:fc778cb9cf6666d958203a"
};

// Initialize Firebase for Client-side
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
