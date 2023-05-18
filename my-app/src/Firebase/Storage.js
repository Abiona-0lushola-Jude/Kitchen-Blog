import {getStorage} from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAMaV9rWER24_b4JLcZmp0hMNHHEA7F9Y",
  authDomain: "kitchenblog-1e9c2.firebaseapp.com",
  projectId: "kitchenblog-1e9c2",
  storageBucket: "kitchenblog-1e9c2.appspot.com",
  messagingSenderId: "775826546780",
  appId: "1:775826546780:web:b0f6f2a2a4cd707e2f4699"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const Storage = getStorage(app)