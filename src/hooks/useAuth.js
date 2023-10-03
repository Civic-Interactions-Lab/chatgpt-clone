import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

function useAuth() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    // Sign in user anonymously
    signInAnonymously(auth).catch(error => {
      console.error('Failed to sign in anonymously:', error);
    });

    // Set up listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUid(user.uid);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();

  }, []);

  return { uid };
}

export default useAuth;
