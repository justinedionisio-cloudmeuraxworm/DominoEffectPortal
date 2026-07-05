import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Firebase Configuration
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

// Get form
const form = document.getElementById("loginForm");

// Random Participant ID
const participantID = "P-" + Math.floor(Math.random() * 1000000);

let documentID = null;

// Save visit when page opens
async function saveVisit() {
    try {
        const docRef = await addDoc(collection(db, "research"), {
            participantID: participantID,
            pageOpened: true,
            loginClicked: false,
            completed: false,
            pageOpenedTime: serverTimestamp()
        });

        documentID = docRef.id;

        console.log("Participant saved:", documentID);

    } catch (error) {
        console.error("Firestore Error:", error);
    }
}

// Call it immediately
saveVisit();

// Login button
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        if (documentID) {

            await updateDoc(doc(db, "research", documentID), {
                loginClicked: true,
                completed: true,
                loginTime: serverTimestamp()
            });

        }

        // Replace the form with a success message
        document.body.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                background:#f5f7fb;
                font-family:Arial,sans-serif;
            ">
                <div style="
                    background:white;
                    padding:30px;
                    border-radius:12px;
                    box-shadow:0 0 15px rgba(0,0,0,.15);
                    max-width:500px;
                    text-align:center;
                ">
                    <h2>✅ Simulation Complete</h2>

                    <p>
                    This was a simulated phishing exercise for our research.
                    </p>

                    <p>
                    <strong>No username or password was collected or stored.</strong>
                    </p>

                    <p>
                    Thank you for participating!
                    </p>
                </div>
            </div>
        `;

    } catch (error) {

        console.error(error);

        alert("An error occurred while saving the research data.");

    }

});
