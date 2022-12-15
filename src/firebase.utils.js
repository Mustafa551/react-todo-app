import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2Hxrj9qZ8I6NI1lErxYNFHMegtPaIPSc",
    authDomain: "todo-app-130ef.firebaseapp.com",
    projectId: "todo-app-130ef",
    storageBucket: "todo-app-130ef.appspot.com",
    messagingSenderId: "975338099413",
    appId: "1:975338099413:web:050d56f664b5d97c1b085c"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {db}