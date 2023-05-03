// firebase config key setup

import firebase from "@firebase/app";
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApN_GG50__-83UAEqQlBtFH943a9M8q6I",
  authDomain: "mgmg-007.firebaseapp.com",
  projectId: "mgmg-007",
  storageBucket: "mgmg-007.appspot.com",
  messagingSenderId: "834855187376",
  appId: "1:834855187376:web:89e039f898b5f325459c75",
  measurementId: "G-T6J7358D6W"
}

const app = initializeApp(firebaseConfig);

export { app };