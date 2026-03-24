import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
