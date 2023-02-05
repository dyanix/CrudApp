import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
import { getDatabase } from "firebase/database"


const firebaseConfig = {
    apiKey: "AIzaSyBUul11hV2HjB3l1bhB5hlrf_0MnN5tznM",
    authDomain: "crud-app-c5b3a.firebaseapp.com",
    projectId: "crud-app-c5b3a",
    storageBucket: "crud-app-c5b3a.appspot.com",
    messagingSenderId: "992961877926",
    appId: "1:992961877926:web:2c457e9e61a8c010c06167"
  };


  const app = initializeApp(firebaseConfig);
  export const auth = getAuth();
  export const db = getFirestore(app);
  export const storage = getStorage(app);
 export const database = getDatabase(app);
