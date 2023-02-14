// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHYpxFd7VFHjrtVRw8I-TZ8KtBl_z8Zmc",
  authDomain: "disneycharacters-b91d8.firebaseapp.com",
  projectId: "disneycharacters-b91d8",
  storageBucket: "disneycharacters-b91d8.appspot.com",
  messagingSenderId: "885495356162",
  appId: "1:885495356162:web:b75659c2ffbdf6bde6c01b"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}
const auth = firebase.auth();
const db = getFirestore(app);

export {auth, app, db, getFirestore, doc, setDoc, getDoc};