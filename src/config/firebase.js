import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRj-7x8A7nOsweY8sXd6SD3Ry8oqOAdbc",
  authDomain: "ochiqkutubxona-d034a.firebaseapp.com",
  projectId: "ochiqkutubxona-d034a",
  storageBucket: "ochiqkutubxona-d034a.appspot.com",
  messagingSenderId: "312876750845",
  appId: "1:312876750845:web:bb842e5e72aa83b5f6ab94",
  measurementId: "G-JRF1FJP475",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
