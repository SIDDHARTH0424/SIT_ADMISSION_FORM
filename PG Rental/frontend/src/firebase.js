import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBnV8xtHZRF7KNpquKKVO_vbfc8oWFZIHg",
    authDomain: "pg-rental1.firebaseapp.com",
    projectId: "pg-rental1",
    storageBucket: "pg-rental1.firebasestorage.app",
    messagingSenderId: "1030024934889",
    appId: "1:1030024934889:web:59637326afeb15c2d70778"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
