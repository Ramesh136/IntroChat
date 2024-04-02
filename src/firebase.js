
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth"
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw0cEdKPAjHIzqdWk8o7-BOs0WPl_jXhk",
  authDomain: "introchat-51de1.firebaseapp.com",
  projectId: "introchat-51de1",
  storageBucket: "introchat-51de1.appspot.com",
  messagingSenderId: "924555892012",
  appId: "1:924555892012:web:1e08e80b3df2637fcd0889",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore(app)
