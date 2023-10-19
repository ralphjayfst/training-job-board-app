// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// for now hardcoded in the app but can transfer
// to .env file for configurations
const firebaseConfig = {
  apiKey: "AIzaSyDthUQVSap8_-Y_rnitToktdtxO4ZdSzWo",
  authDomain: "job-post-activity.firebaseapp.com",
  projectId: "job-post-activity",
  storageBucket: "job-post-activity.appspot.com",
  messagingSenderId: "613226395944",
  appId: "1:613226395944:web:68940546e411d2cc1e781d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);