const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyDZcPzGUd8LuFYgOXMWnzxcwVzN54iXOyY",
    authDomain: "ourmeetingguide-78f3b.firebaseapp.com",
    projectId: "ourmeetingguide-78f3b",
    storageBucket: "ourmeetingguide-78f3b.firebasestorage.app",
    messagingSenderId: "818137426931",
    appId: "1:818137426931:web:bcfb88a1746a927b3c4086"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
