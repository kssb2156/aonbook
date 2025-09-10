document.addEventListener('DOMContentLoaded', () => {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Sample period data - you'd replace this with real data from a backend or local storage
    const periodData = [
        { start: new Date(2025, 8, 2), end: new Date(2025, 8, 8) }, // September 2025
        { start: new Date(2025, 7, 5), end: new Date(2025, 7, 10) }, // August 2025
        { start: new Date(2025, 6, 8), end: new Date(2025, 6, 14) }  // July 2025
    ];

    const today = new Date(); // Get today's date

    function renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthYear = document.getElementById('current-month-year');
        calendarGrid.innerHTML = ''; // Clear previous days

        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear + 543}`; // Display Thai Buddhist year

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Day of week (0-6)
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Number of days in current month

        // Add empty cells for days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
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
            
            // Highlight today's date
            const isToday = date.getDate() === today.getDate() && 
                             date.getMonth() === today.getMonth() && 
                             date.getFullYear() === today.getFullYear();
            if (isToday) {
                dayDiv.classList.add('selected');
            }

            // Highlight period and end of period
            const activePeriod = periodData.find(p => date >= p.start && date <= p.end);
            if (activePeriod) {
                if (date.getTime() === activePeriod.end.getTime()) {
                    dayDiv.classList.add('end-of-period');
                } else {
                    dayDiv.classList.add('period');
                }
            }

            // Prediction logic
            const lastPeriod = periodData[0]; // Assuming the first item is the most recent
            if (lastPeriod) {
                const avgCycle = 28; // Average cycle length in days
                const predictionStart = new Date(lastPeriod.end);
                predictionStart.setDate(predictionStart.getDate() + avgCycle);

                const predictionEnd = new Date(predictionStart);
                predictionEnd.setDate(predictionEnd.getDate() + 5); // Assuming a 5-day duration for prediction

                if (date >= predictionStart && date <= predictionEnd) {
                    dayDiv.classList.add('prediction');
                }
            }
            
            calendarGrid.appendChild(dayDiv);
        }

        renderPrediction(); // Update prediction box
    }

    function renderPrediction() {
        const predictionBox = document.getElementById('prediction-box');
        const lastPeriod = periodData[0]; // Most recent period
        
        if (lastPeriod) {
            const avgCycle = 28; // Average cycle length
            const predictionStart = new Date(lastPeriod.end);
            predictionStart.setDate(predictionStart.getDate() + avgCycle);
            
            const day = predictionStart.getDate();
            const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
            const month = monthNames[predictionStart.getMonth()];
            const year = predictionStart.getFullYear() + 543; // Thai Buddhist year

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
        historyList.innerHTML = ''; // Clear previous history items
        const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

        // Sort periodData by start date descending to show most recent first
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

            // Calculate duration (add 1 because start and end day are inclusive)
            const duration = (period.end.getTime() - period.start.getTime()) / (1000 * 60 * 60 * 24) + 1;

            historyItem.innerHTML = `
                <div class="history-item-date">${startDay} ${startMonth} ${startYear} ถึง ${endDay} ${endMonth} ${endYear}</div>
                <div class="history-item-duration">ระยะเวลา: ${duration} วัน</div>
            `;
            historyList.appendChild(historyItem);
        });
    }

    // Function to change month
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

    // Function to show/hide tabs
    window.showTab = (tabName) => {
        document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`.tab-item[onclick="showTab('${tabName}')"]`).classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-view`).classList.add('active');
        
        if (tabName === 'history') {
            renderHistory(); // Re-render history when the tab is activated
        }
    }

    // Initial renders
    renderCalendar();
    renderHistory(); // Render history once to populate it initially
});
