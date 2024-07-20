
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}        from 'firebase/auth'
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCEAvM__FzQj4iD-YM5t_rpbJApJT6lR0I",
  authDomain: "fiteat-f6558.firebaseapp.com",
  projectId: "fiteat-f6558",
  storageBucket: "fiteat-f6558.appspot.com",
  messagingSenderId: "664958908737",
  appId: "1:664958908737:web:d53de2572263bf729d49c0",
  measurementId: "G-0N0Q4RG2W0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);
export { auth, storage,db };