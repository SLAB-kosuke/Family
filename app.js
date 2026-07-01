// Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// 👉 Firestoreも追加（ここが重要）
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyBGeCs9-gsS66uCZ9HqEsbSqNv4_dOE5Bg",
  authDomain: "family-calendar-38bf7.firebaseapp.com",
  projectId: "family-calendar-38bf7",
  storageBucket: "family-calendar-38bf7.firebasestorage.app",
  messagingSenderId: "419708212606",
  appId: "1:419708212606:web:fc89ed052d38c41787cf2f",
  measurementId: "G-ZKHECSN6CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🔥 Firestore初期化
const db = getFirestore(app);
const col = collection(db, "familySchedule");


// ==========================
// 予定追加
// ==========================
window.addSchedule = async function () {
  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;
  const person = document.getElementById("person").value;

  if (!date || !title) {
    alert("日付と予定を入力してください");
    return;
  }

  await addDoc(col, {
    date,
    title,
    person,
    createdAt: Date.now()
  });

  document.getElementById("title").value = "";
};


// ==========================
// リアルタイム取得
// ==========================
const q = query(col, orderBy("date", "asc"));

onSnapshot(q, (snapshot) => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  snapshot.forEach((doc) => {
    const d = doc.data();

    const el = document.createElement("div");
    el.className = "item";

    el.innerHTML = `
      <div>📅 ${d.date}</div>
      <div>👤 ${d.person}</div>
      <div>📝 ${d.title}</div>
    `;

    list.appendChild(el);
  });
});
