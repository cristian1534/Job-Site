import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"; 

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB_nUWg7VcArnH4RbuVUOYrvZXUusp7Irs",
  authDomain: "jobs-site-c8fbc.firebaseapp.com",
  projectId: "jobs-site-c8fbc",
  storageBucket: "jobs-site-c8fbc.appspot.com",
  messagingSenderId: "53726838517",
  appId: "1:53726838517:web:45dd063c5f607451788fbc",
});

const db = firebase.firestore();
const storage = firebase.storage();

export { db, firebaseApp, storage };
