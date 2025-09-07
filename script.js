// Elements
const loginBtn = document.getElementById('loginBtn');
const passInput = document.getElementById('pass');
const errorMsg = document.getElementById('errorMsg');
const timeline = document.getElementById('timeline');
const tabBar = document.getElementById('tabBar');
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const darkModeSwitch = document.getElementById('darkMode');
const resetBtn = document.getElementById('resetBtn');

// Login
loginBtn.addEventListener('click', () => {
    if(passInput.value === '2002'){
        document.getElementById('loginBox').style.display = 'none';
        timeline.classList.add('active');
        tabBar.style.display = 'flex';
        errorMsg.style.display = 'none';
    } else {
        errorMsg.textContent = "รหัสผ่านไม่ถูกต้อง!";
        errorMsg.style.display = 'block';
        setTimeout(()=>{ errorMsg.style.display='none'; },3000);
    }
});

// Toggle Year Events
document.querySelectorAll('.year').forEach(year => {
    year.addEventListener('click', () => {
        const events = year.nextElementSibling;
        events.style.display = (events.style.display==='block') ? 'none':'block';
    });
});

// Tab Switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        contents.forEach(c=>c.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// Dark Mode
darkModeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark', darkModeSwitch.checked);
});


