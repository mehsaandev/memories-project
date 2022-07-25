// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB13JyTDPLPX_rsFMD_8S5R_2y-INxu1O8",
  authDomain: "memories-app-30a17.firebaseapp.com",
  projectId: "memories-app-30a17",
  storageBucket: "memories-app-30a17.appspot.com",
  messagingSenderId: "679512655254",
  appId: "1:679512655254:web:2abfc05ac30d7316eb89b7",
  measurementId: "G-ZJR9027J9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();