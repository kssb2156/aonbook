document.addEventListener('DOMContentLoaded', () => {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const periodData = [
        { start: new Date(2025, 8, 2), end: new Date(2025, 8, 8) }, // Sep
        { start: new Date(2025, 7, 5), end: new Date(2025, 7, 10) }, // Aug
        { start: new Date(2025, 6, 8), end: new Date(2025, 6, 14) }  // Jul
    ];

    const today = new Date();

    function renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthYear = document.getElementById('current-month-year');
        calendarGrid.innerHTML = '';

        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear + 543}`; // Thai Buddhist year

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add empty cells for the start of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'inactive');
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = i;
            const date = new Date(currentYear, currentMonth, i);
            
            // Check for highlights
            const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
            if (isToday) {
                dayDiv.classList.add('selected');
            }

            const activePeriod = periodData.find(p => date >= p.start && date <= p.end);
            if (activePeriod) {
                dayDiv.classList.add('period');
                if (date.getTime() === activePeriod.end.getTime()) {
                    dayDiv.classList.remove('period');
                    dayDiv.classList.add('end-of-period');
                }
            }

            // Prediction logic (simplified)
            const lastPeriod = periodData[0];
            const avgCycle = 28; // days
            const predictionStart = new Date(lastPeriod.end);
            predictionStart.setDate(predictionStart.getDate() + avgCycle);

            const predictionEnd = new Date(predictionStart);
            predictionEnd.setDate(predictionEnd.getDate() + 5); // Example: 5-day duration

            if (date >= predictionStart && date <= predictionEnd) {
                dayDiv.classList.add('prediction');
            }
            
            calendarGrid.appendChild(dayDiv);
        }

        renderPrediction();
    }

    function renderPrediction() {
        const predictionBox = document.getElementById('prediction-box');
        const lastPeriod = periodData[0];
        const avgCycle = 28;
        const predictionStart = new Date(lastPeriod.end);
        predictionStart.setDate(predictionStart.getDate() + avgCycle);
        
        const day = predictionStart.getDate();
        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        const month = monthNames[predictionStart.getMonth()];
        const year = predictionStart.getFullYear() + 543;

        predictionBox.innerHTML = `คาดการณ์รอบเดือนครั้งถัดไป: **${day} ${month} ${year}** (ระยะห่างเฉลี่ย ${avgCycle} วัน)`;
    }

    function renderHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

        periodData.forEach(period => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');

            const startDay = period.start.getDate();
            const startMonth = monthNames[period.start.getMonth()];
            const startYear = period.start.getFullYear() + 543;

            const endDay = period.end.getDate();
            const endMonth = monthNames[period.end.getMonth()];
            const endYear = period.end.getFullYear() + 543;

            const duration = (period.end.getTime() - period.start.getTime()) / (1000 * 60 * 60 * 24) + 1;

            historyItem.innerHTML = `
                <div class="history-item-date">${startDay} ${startMonth} ${startYear} ถึง ${endDay} ${endMonth} ${endYear}</div>
                <div class="history-item-duration">ระยะเวลา: ${duration} วัน</div>
            `;
            historyList.appendChild(historyItem);
        });
    }

    window.changeMonth = (delta) => {
        currentMonth += delta;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    }

    window.showTab = (tabName) => {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-view`).classList.add('active');
        
        if (tabName === 'history') {
            renderHistory();
        }
    }

    renderCalendar();
    renderHistory();
});
