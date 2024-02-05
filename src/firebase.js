// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXn259zOqRAClNIWJGvK72lJQ1WY-sd40",
  authDomain: "web-authentication-d5d1c.firebaseapp.com",
  projectId: "web-authentication-d5d1c",
  storageBucket: "web-authentication-d5d1c.appspot.com",
  messagingSenderId: "362627655592",
  appId: "1:362627655592:web:a3b1a258ad042916085f9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
