// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "twitter-clone-800b7.firebaseapp.com",
  projectId: "twitter-clone-800b7",
  storageBucket: "twitter-clone-800b7.appspot.com",
  messagingSenderId: "385900277356",
  appId: "1:385900277356:web:c14c417dcc9214381af249",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get Auth Ref
export const auth = getAuth(app);
// Google Provider
export const provider = new GoogleAuthProvider();
// Get reference of database
export const db = getFirestore(app);
// Get reference of storage
export const storage = getStorage(app);
