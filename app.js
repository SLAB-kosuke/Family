import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGeCs9-gsS66uCZ9HqEsbSqNv4_dOE5Bg",
  authDomain: "family-calendar-38bf7.firebaseapp.com",
  projectId: "family-calendar-38bf7",
  storageBucket: "family-calendar-38bf7.firebasestorage.app",
  messagingSenderId: "419708212606",
  appId: "1:419708212606:web:fc89ed052d38c41787cf2f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const col = collection(db, "schedule");

// =====================
// 🔐 ログイン（超シンプル）
// =====================
const PASS = "1234";

window.login = function () {
  const input = document.getElementById("password").value;

  if (input === PASS) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
    renderCalendar();
  } else {
    alert("パスワード違います");
  }
};


// =====================
// 📅 カレンダー
// =====================
let current = new Date();
let selectedDate = null;

function renderCalendar() {
  const year = current.getFullYear();
  const month = current.getMonth();

  document.getElementById("monthLabel").innerText =
    `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  // 空白
  for (let i = 0; i < firstDay; i++) {
    cal.innerHTML += `<div></div>`;
  }

  // 日付
  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${year}-${month + 1}-${d}`;

    const div = document.createElement("div");
    div.className = "day";
    div.innerHTML = d;

    div.onclick = () => openModal(dateStr);

    cal.appendChild(div);
  }
}

window.prevMonth = function () {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
};

window.nextMonth = function () {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
};


// =====================
// ➕ 入力モーダル
// =====================
window.openModal = function (date) {
  selectedDate = date;
  document.getElementById("selectedDate").innerText = date;
  document.getElementById("inputModal").style.display = "block";
};

window.closeModal = function () {
  document.getElementById("inputModal").style.display = "none";
};


// =====================
// ☁️ 保存
// =====================
window.saveSchedule = async function () {
  const title = document.getElementById("title").value;
  const person = document.getElementById("person").value;

  if (!title) return;

  await addDoc(col, {
    date: selectedDate,
    title,
    person,
    createdAt: Date.now()
  });

  closeModal();
  document.getElementById("title").value = "";
};
