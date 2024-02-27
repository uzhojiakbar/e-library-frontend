import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAN1ECfXlgQ-rdgQe0l_IUBmTEhkZR0NwY",
  authDomain: "test-firebase-e8fa3.firebaseapp.com",
  projectId: "test-firebase-e8fa3",
  storageBucket: "test-firebase-e8fa3.appspot.com",
  messagingSenderId: "79221990956",
  appId: "1:79221990956:web:308d383feedbcdd2509389",
  measurementId: "G-X4747Y7GBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()