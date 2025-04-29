import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from '../services/mockAuth';  // Utilisez mockAuth pour la simplicité
import { auth, googleProvider } from '../services/mockAuth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("AuthProvider initialized, currentUser:", currentUser);

  // Login function with direct state update
  const login = async (email, password) => {
    console.log("Login attempt with:", email);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", result.user);
      setCurrentUser(result.user);
      return result;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Google login function with direct state update
  const loginWithGoogle = async () => {
    console.log("Google login attempt");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login successful:", result.user);
      setCurrentUser(result.user);
      return result;
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    console.log("Logout attempt");
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed, user:", user);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  // Force an initial authentication check to mock persistence
  useEffect(() => {
    // Vérifier si nous avons des données d'authentification dans le localStorage
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        console.log("Found saved user:", user);
        setCurrentUser(user);
      } catch (e) {
        console.error("Error parsing saved user:", e);
        localStorage.removeItem('mockUser');
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      console.log("Saving user to localStorage:", currentUser);
      localStorage.setItem('mockUser', JSON.stringify(currentUser));
    } else {
      console.log("Removing user from localStorage");
      localStorage.removeItem('mockUser');
    }
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};