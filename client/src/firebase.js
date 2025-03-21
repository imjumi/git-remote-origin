// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔹 여기에 본인의 Firebase 설정 정보 입력!
const firebaseConfig = {
    apiKey: "AIzaSyDZcPzGUd8LuFYgOXMWnzxcwVzN54iXOyY",
    authDomain: "ourmeetingguide-78f3b.firebaseapp.com",
    projectId: "ourmeetingguide-78f3b",
    storageBucket: "ourmeetingguide-78f3b.firebasestorage.app",
    messagingSenderId: "818137426931",
    appId: "1:818137426931:web:bcfb88a1746a927b3c4086"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
