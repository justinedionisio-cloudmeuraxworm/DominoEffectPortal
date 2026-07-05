import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Firebase config
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

// FORM
const form = document.getElementById("loginForm");

// Google Form link
const googleFormLink = "https://forms.gle/2b34XGkhKcWNTf8H8";

// Participant ID (clean format)
const participantID = "P-" + Math.floor(100000 + Math.random() * 900000);

let docID = null;
const startTime = Date.now();

// -------------------- DEVICE INFO --------------------
function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    return "Unknown";
}

function getPlatform() {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone")) return "iOS";
    if (ua.includes("Mac")) return "macOS";
    return "Unknown";
}

// -------------------- SAVE ON OPEN --------------------
async function saveVisit() {
    try {
        const ref = await addDoc(collection(db, "research"), {
            participantID: participantID,
            browser: getBrowser(),
            platform: getPlatform(),
            screen: screen.width + "x" + screen.height,
            loginClicked: false,
            createdAt: serverTimestamp()
        });

        docID = ref.id;

        console.log("Saved:", docID);

    } catch (err) {
        console.error(err);
    }
}

saveVisit();

// -------------------- LOGIN CLICK --------------------
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
        if (docID) {
            await updateDoc(doc(db, "research", docID), {
                loginClicked: true,
                timeSpent: timeSpent,
                loginTime: serverTimestamp()
            });
        }

        // COMPLETION SCREEN
        document.body.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial;background:#f4f6f9;">
            <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 10px 20px rgba(0,0,0,.15);text-align:center;max-width:500px;">
                
                <h2>Simulation Complete</h2>

                <p>This was a simulated cybersecurity experiment.</p>

                <p><b>No passwords or personal credentials were collected.</b></p>

                <hr>

                <h3>Your Participant ID</h3>

                <div style="font-size:22px;font-weight:bold;margin:10px 0;">
                    ${participantID}
                </div>

                <button onclick="navigator.clipboard.writeText('${participantID}')"
                style="padding:10px 15px;margin:10px;background:#2d7ff9;color:white;border:none;border-radius:6px;cursor:pointer;">
                    Copy ID
                </button>

                <br><br>

                <a href="${googleFormLink}" target="_blank">
                    <button style="padding:12px 18px;background:#28a745;color:white;border:none;border-radius:6px;cursor:pointer;">
                        Continue to Google Form
                    </button>
                </a>

            </div>
        </div>
        `;

    } catch (err) {
        console.error(err);
        alert("Error saving data.");
    }
});
