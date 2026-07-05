import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmlrYtgQ90nokJHrlQ8nHXlm2bjV1HeBM",
    authDomain: "dominoeffectresearch.firebaseapp.com",
    projectId: "dominoeffectresearch",
    storageBucket: "dominoeffectresearch.firebasestorage.app",
    messagingSenderId: "697760158609",
    appId: "1:697760158609:web:3f78d522dfa0c5b62a0030"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("loginForm");

let participantRef = null;

// Generate Participant ID
function generateID(){
    return "P-" + Math.floor(Math.random()*100000);
}

// Save when page opens
async function createParticipant(){

    participantRef = await addDoc(collection(db,"research"),{

        participantID: generateID(),

        pageOpened: true,

        loginClicked: false,

        createdAt: serverTimestamp()

    });

    console.log("Participant Saved!");
}

createParticipant();

// Login Button
form.addEventListener("submit", async function(e){

    e.preventDefault();

    await updateDoc(doc(db,"research",participantRef.id),{

        loginClicked:true

    });

    alert(
`Simulation Complete!

This was a simulated phishing exercise.

No username or password was saved.

Thank you for participating!`
);

});