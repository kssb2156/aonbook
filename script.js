document.addEventListener('DOMContentLoaded', () => {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Sample period data - you'd replace this with real data from a backend or local storage
    const periodData = [
        { start: new Date(2025, 8, 7), end: new Date(2025, 8, 10) },
        { start: new Date(2025, 7, 4), end: new Date(2025, 7, 9) },
        { start: new Date(2025, 5, 23), end: new Date(2025, 5, 28) },
        { start: new Date(2025, 4, 20), end: new Date(2025, 4, 25) },
        { start: new Date(2025, 3, 12), end: new Date(2025, 3, 18) },
        { start: new Date(2025, 2, 7), end: new Date(2025, 2, 12) },
        { start: new Date(2025, 0, 30), end: new Date(2025, 1, 6) },
    ];

    const today = new Date();

    function renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthYear = document.getElementById('current-month-year');
        calendarGrid.innerHTML = '';

        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear + 543}`;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'inactive');
            calendarGrid.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = i;
            const date = new Date(currentYear, currentMonth, i);
            
            const isToday = date.getDate() === today.getDate() && 
                             date.getMonth() === today.getMonth() && 
                             date.getFullYear() === today.getFullYear();
            if (isToday) {
                dayDiv.classList.add('selected');
            }

            const activePeriod = periodData.find(p => date >= p.start && date <= p.end);
            if (activePeriod) {
                if (date.getTime() === activePeriod.end.getTime()) {
                    dayDiv.classList.add('end-of-period');
                } else {
                    dayDiv.classList.add('period');
                }
            }

            const lastPeriod = periodData[0];
            if (lastPeriod) {
                const avgCycle = 28;
                const predictionStart = new Date(lastPeriod.end);
                predictionStart.setDate(predictionStart.getDate() + avgCycle);

                const predictionEnd = new Date(predictionStart);
                predictionEnd.setDate(predictionEnd.getDate() + 5);

                if (date >= predictionStart && date <= predictionEnd) {
                    dayDiv.classList.add('prediction');
                }
            }
            
            calendarGrid.appendChild(dayDiv);
        }

        renderPrediction();
    }

    function renderPrediction() {
        const predictionBox = document.getElementById('prediction-box');
        const lastPeriod = periodData[0];
        
        if (lastPeriod) {
            const avgCycle = 28;
            const predictionStart = new Date(lastPeriod.end);
            predictionStart.setDate(predictionStart.getDate() + avgCycle);
            
            const day = predictionStart.getDate();
            const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            const month = monthNames[predictionStart.getMonth()];
            const year = predictionStart.getFullYear() + 543;

            predictionBox.innerHTML = `
                <p>คาดการณ์รอบเดือนครั้งถัดไป:</p>
                <p><strong>${day} ${month} ${year}</strong></p>
                <p>(ระยะห่างเฉลี่ย ${avgCycle} วัน)</p>
            `;
        } else {
            predictionBox.innerHTML = `<p>ไม่พบข้อมูลรอบเดือนเพื่อคาดการณ์</p>`;
        }
    }

    function renderHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

        const sortedPeriodData = [...periodData].sort((a, b) => b.start.getTime() - a.start.getTime());

        if (sortedPeriodData.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: var(--medium-grey);">ยังไม่มีประวัติรอบเดือน</p>';
            return;
        }

        sortedPeriodData.forEach(period => {
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
        document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`.tab-item[onclick="showTab('${tabName}')"]`).classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-view`).classList.add('active');
        
        if (tabName === 'history') {
            renderHistory();
        }
    }

    renderCalendar();
    renderHistory();
});
