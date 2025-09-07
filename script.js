// Elements
const loginBox = document.getElementById("loginBox");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");
const tabBar = document.getElementById("tabBar");
const contents = document.querySelectorAll('.tab-content');

// ซ่อน tab-content และ tabBar ก่อน Login
contents.forEach(c => c.style.display = "none");
tabBar.style.display = "none";

// Login
loginBtn.addEventListener('click', () => {
    const pass = document.getElementById("pass").value;
    if(pass === "2002") {
        loginBox.style.display = "none";

        // แสดง Tab bar และ Tab แรก
        tabBar.style.display = "flex";
        const firstTab = document.getElementById('timeline');
        firstTab.style.display = "block";
        firstTab.classList.add('active');

        errorMsg.style.display = "none";
    } else {
        errorMsg.textContent = "รหัสผ่านไม่ถูกต้อง!";
        errorMsg.style.display = "block";
        setTimeout(() => { errorMsg.style.display = "none"; }, 3000);
    }
});

// Toggle เปิด/ปิดปี
const years = document.querySelectorAll('.year');
years.forEach(year => {
    year.addEventListener('click', () => {
        const events = year.nextElementSibling;
        events.style.display = (events.style.display === "block") ? "none" : "block";
    });
});

// Tab switch
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        contents.forEach(c => c.style.display = "none");
        const target = document.getElementById(tab.dataset.tab);
        target.style.display = "block";
        target.classList.add('active');
    });
});
