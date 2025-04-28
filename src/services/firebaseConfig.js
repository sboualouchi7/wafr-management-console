// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Copiez exactement les valeurs fournies par Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCONgOjCc5V6ZcGVhbV9EMXG-LIxxG-ztM",
  authDomain: "wafr-management-console.firebaseapp.com",
  projectId: "wafr-management-console",
  storageBucket: "wafr-management-console.firebasestorage.app",
  messagingSenderId: "69268951821",
  appId: "1:69268951821:web:db9c033284b97c70459644",
  measurementId: "G-5Y42QLVH4W"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };