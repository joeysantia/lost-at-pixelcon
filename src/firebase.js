// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC86NCi-X9_avg_c-Ne6D-zb-SmP3936lQ",
  authDomain: "wheres-waldo-df5f6.firebaseapp.com",
  projectId: "wheres-waldo-df5f6",
  storageBucket: "wheres-waldo-df5f6.appspot.com",
  messagingSenderId: "959621062031",
  appId: "1:959621062031:web:46b257fd51e6d8c01e7ffa",
  measurementId: "G-8K9XWTKGD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);