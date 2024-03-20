// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYYIEnb1vdzi7-h4RN0OSENz0G7bwrkCM",
  authDomain: "mern-blog-71c27.firebaseapp.com",
  projectId: "mern-blog-71c27",
  storageBucket: "mern-blog-71c27.appspot.com",
  messagingSenderId: "517844596441",
  appId: "1:517844596441:web:274d7949768dda191e70c8",
  measurementId: "G-8YKY0HLXFP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
