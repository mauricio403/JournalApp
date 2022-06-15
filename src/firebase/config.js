// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBecqRhEX_cmFWWWDny8hS0nqsZ6SgdamA",
    authDomain: "journal-react-babca.firebaseapp.com",
    projectId: "journal-react-babca",
    storageBucket: "journal-react-babca.appspot.com",
    messagingSenderId: "591083754303",
    appId: "1:591083754303:web:0557b61a9a1fd1e7b0398a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FierbaseDB = getFirestore(FirebaseApp);
