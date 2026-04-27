import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAR2z1DEr1OY5MbRDQxWM7OBQ8Ou-au25s",
  authDomain: "restaurant-food-lover.firebaseapp.com",
  projectId: "restaurant-food-lover",
  storageBucket: "restaurant-food-lover.firebasestorage.app",
  messagingSenderId: "835872524416",
  appId: "1:835872524416:web:39c7f3444c82090e133e65",
  measurementId: "G-FCQHNVQ1WF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);