function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function createCalendar(month, year, data) {
    const dayTitle = document.querySelector("#day");
    const calendar = document.querySelector("#calendar");
    calendar.innerHTML = '';

    let date = 1;
    const daysInMonth = getDaysInMonth(month, year);

    for (let i = 0; i < 6; i++) {
        let week = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < new Date(year, month, 1).getDay()) || date > daysInMonth) {
                let day = document.createElement('td');
                week.appendChild(day);
            } else {
                let day = document.createElement('td');
                day.innerText = date;
                day.classList.add("day");

                const hasData = data.some(d => {
                    const dt = new Date(Number(d.date || d.timestamp));
                    return dt.getDate() === date &&
                           dt.getMonth() === month &&
                           dt.getFullYear() === year;
                });

                if (hasData) {
                    day.classList.add("ok"); 
                } else {
                    day.classList.add("empty");
                }

                day.addEventListener("click", () => {
                    dayTitle.innerText = `${day.innerText}/${month + 1}/${year}`;
                    getHours(data);
                });

                week.appendChild(day);
                date++;
            }
        }
        calendar.appendChild(week);
    }
}

function getHours(data) {
    let day = document.querySelector("#day").innerText;
    const hours = document.querySelector("#hours-list");
    hours.innerHTML = "";

    const [d, m, y] = day.split("/").map(Number);

    for (let h = 6; h < 24; h++) {
        const dateObj = new Date(y, m - 1, d, h);
        const timestamp = dateObj.getTime();

        let hour = document.createElement("div");
        
        const isChecked = data.some(d => Number(d.date || d.timestamp) === timestamp);

        hour.innerHTML = `
        <div class="item">
            <div class="time">
                <span class="hour">${h.toString().padStart(2, '0')}h00</span>
            </div>
            <div class="checkbox-wrapper-6">
                <input class="tgl tgl-light" id="cb1-6-${h}" 
                type="checkbox"  
                ${isChecked ? "checked" : ""}/>
                <label class="tgl-btn" for="cb1-6-${h}"></label>
            </div>
        </div>`;

        const checkbox = hour.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function () { 
            fetch("http://localhost:1515/api/calendar/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "timestamp": timestamp })
            })
            .then(() => {
                getMeting(); 
            })
            .catch(error => console.error('Erreur:', error));
        });
        hours.appendChild(hour);
    }
}

function getMeting() {
    fetch("http://localhost:1515/api/calendar/getAll", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            meting(data);
            getHours(data);
            createCalendar(currentDate.getMonth(), currentDate.getFullYear(), data);
        })
        .catch(error => console.error('Erreur:', error));
}

function meting(data) {
    const container = document.querySelector("#meting");
    container.innerHTML = ""; 
    
    data.forEach((e) => {
        if (e["name"] && e["email"]) {
            const dt = new Date(Number(e.timestamp || e.date));

            const day = dt.getDate().toString().padStart(2, '0');
            const month = (dt.getMonth() + 1).toString().padStart(2, '0');
            const hour = dt.getHours().toString().padStart(2, '0');

            let met = document.createElement("div");
            met.classList.add("item");
            met.innerHTML = `
              <div class="time">
                    <span class="date">${day}/${month}</span>
                    <span class="hour">${hour}h00</span>
                </div>
                <div class="info">
                    <span class="client-name">${e["name"]}</span>
                    <span class="client-email">${e["email"]}</span>
                </div>
                <div class="status status-${e["confirme"] == 1 ? "confirmed" : "pending"}">
                    ${e["confirme"] == 1 ? "Confirmé" : "En attente"}
                </div>`;
            container.appendChild(met);
        }
    });
}

const currentDate = new Date();
const initDay = document.querySelector("#day");
initDay.innerHTML = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
getMeting();