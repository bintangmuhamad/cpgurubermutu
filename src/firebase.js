import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnrcEr8gUxRY7osN06U-p2Y66fC65DQi8",
  authDomain: "guru-bermutu.firebaseapp.com",
  projectId: "guru-bermutu",
  storageBucket: "guru-bermutu.firebasestorage.app",
  messagingSenderId: "84085479886",
  appId: "1:84085479886:web:37d4e5228153b8f266f39f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);