// firebase config key setup
import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore} from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApN_GG50__-83UAEqQlBtFH943a9M8q6I",
  authDomain: "mgmg-007.firebaseapp.com",
  databaseURL: "https://mgmg-007-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "mgmg-007",
  storageBucket: "mgmg-007.appspot.com",
  messagingSenderId: "834855187376",
  appId: "1:834855187376:web:89e039f898b5f325459c75",
  measurementId: "G-T6J7358D6W"
}

const app = initializeApp(firebaseConfig);

export const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
export const database = getDatabase(app);
 
export const auth = getAuth(app);

export default app;