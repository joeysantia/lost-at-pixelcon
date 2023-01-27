import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"
import uniqid from 'uniqid'

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
const db = getFirestore(app)
const analytics = getAnalytics(app);

async function addScore(score) {
  const scoreRef = doc(db, "scores", uniqid())
  await setDoc(scoreRef, {
    name: score.name,
    time: score.time,
    date: score.date
  }) 
}

async function getScores() {
  let docs = await getDocs(collection(db, "scores"))
  let scores = []
  docs.forEach((doc) => {
    return scores.push(doc.data())
  })
  console.log(scores) 
}

export {
    addScore,
    getScores
}