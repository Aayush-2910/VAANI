import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDur574xFTz0Hr6e_lIceFEjlUttBk3nvI",
  authDomain: "vaani-43777.firebaseapp.com",
  projectId: "vaani-43777",
  storageBucket: "vaani-43777.firebasestorage.app",
  messagingSenderId: "866015998341",
  appId: "1:866015998341:web:81baf0f827d034978a14ec",
  measurementId: "G-TQVD7MPLYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
