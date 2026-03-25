"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({
  user: null,
  userData: null,
  loading: true,
  loginWithGoogle: () => {},
  loginWithEmail: () => {},
  signup: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle redirect result from signInWithRedirect (Google OAuth)
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await createUserProfile(result.user);
      }
    }).catch((error) => {
      console.error("Redirect sign-in error:", error);
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch custom user data from Firestore
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          // If profile doesn't exist, create it (e.g. for users who didn't use signup function)
          const newUserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            role: 'user',
            createdAt: new Date(),
          };
          await setDoc(userRef, newUserProfile);
          setUserData(newUserProfile);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUserProfile = async (user, additionalData = {}) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const { email, displayName, photoURL } = user;
      const createdAt = new Date();
      try {
        const profile = {
          uid: user.uid,
          email,
          displayName: displayName || additionalData.displayName || '',
          photoURL: photoURL || '',
          role: 'user', // Default role
          createdAt,
          ...additionalData
        };
        await setDoc(userRef, profile);
        setUserData(profile);
      } catch (error) {
        console.error("Error creating user profile", error);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Try popup first; fall back to redirect if blocked
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user);
    } catch (error) {
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        await signInWithRedirect(auth, googleProvider);
      } else {
        console.error("Error logging in with Google:", error);
        throw error;
      }
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in with email:", error);
      throw error;
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      await createUserProfile(userCredential.user, { displayName });
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, loginWithGoogle, loginWithEmail, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
