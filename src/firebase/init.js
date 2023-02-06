// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyR-SaU7nzblf5ZBzAmrYRJhNuHBln8Ls",
  authDomain: "moviebay-16ff2.firebaseapp.com",
  projectId: "moviebay-16ff2",
  storageBucket: "moviebay-16ff2.appspot.com",
  messagingSenderId: "454619983018",
  appId: "1:454619983018:web:f7a7023770f713061bb4d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();