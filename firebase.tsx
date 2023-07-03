import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMQcgpWvJltwy8GP4ioLrQAbzh9Y20dhE",
  authDomain: "mathsapp-7d236.firebaseapp.com",
  projectId: "mathsapp-7d236",
  storageBucket: "mathsapp-7d236.appspot.com",
  messagingSenderId: "782976371167",
  appId: "1:782976371167:web:cb8ead14b5ee59dbbc9c6a",
  measurementId: "G-6Z4364M912",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
