import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmlrYtgQ90nokJHrlQ8nHXlm2bjV1HeBM",
  authDomain: "dominoeffectresearch.firebaseapp.com",
  projectId: "dominoeffectresearch",
  storageBucket: "dominoeffectresearch.firebasestorage.app",
  messagingSenderId: "697760158609",
  appId: "1:697760158609:web:3f78d522dfa0c5b62a0030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the login form
const form = document.getElementById("loginForm");

// Create a random participant ID
const participantID = "P-" + Math.floor(Math.random() * 1000000);

let documentID = null;

// Save participant when page opens
async function saveVisit() {
  try {
    const docRef = await addDoc(collection(db, "research"), {
      participantID: participantID,
      pageOpened: true,
      loginClicked: false,
      pageOpenedTime: serverTimestamp(),
      completed: false
    });

    documentID = docRef.id;

    console.log("Participant saved:", documentID);

  } catch (err) {
    console.error(err);
  }
}

saveVisit();

// Login button
form.addEventListener("submit", async function(e){

  e.preventDefault();

  try{

    if(documentID){

      await updateDoc(doc(db,"research",documentID),{

        loginClicked:true,
        completed:true,
        loginTime:serverTimestamp()

      });

    }

    alert(
`Simulation Complete!

This was a simulated phishing exercise for our research.

No username or password was saved.

Thank you for participating!`);

  }catch(err){

    console.error(err);

    alert("Failed to save research data.");

  }

});
