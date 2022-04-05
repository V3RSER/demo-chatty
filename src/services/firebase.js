// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeMeWKZeKjsJtx5yGUb1XF80eA_vpJI-A",
  authDomain: "chatty-1c6a6.firebaseapp.com",
  projectId: "chatty-1c6a6",
  storageBucket: "chatty-1c6a6.appspot.com",
  messagingSenderId: "769639905752",
  appId: "1:769639905752:web:20ca8cbe9a5f79bd4d9aad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = app.auth;
export const db = app.database();


