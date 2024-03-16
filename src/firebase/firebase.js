import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbJuqkNL9fHxaL413cSSfETPek97ArB9Q",
  authDomain: "do-dodo.firebaseapp.com",
  projectId: "do-dodo",
  storageBucket: "do-dodo.appspot.com",
  messagingSenderId: "366584630251",
  appId: "1:366584630251:web:3e2bef6f43ff67135367ae",
  measurementId: "G-LTR757DN19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
