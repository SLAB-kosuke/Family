// Firebase（v10 modular）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// 🔧 Firebase設定（ここを自分のに変更）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const col = collection(db, "familySchedule");

// 追加
window.addSchedule = async function () {
  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;
  const person = document.getElementById("person").value;

  if (!date || !title) return alert("入力してください");

  await addDoc(col, {
    date,
    title,
    person,
    createdAt: Date.now()
  });

  document.getElementById("title").value = "";
};

// リアルタイム表示
const q = query(col, orderBy("date", "asc"));

onSnapshot(q, (snapshot) => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  snapshot.forEach(doc => {
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
