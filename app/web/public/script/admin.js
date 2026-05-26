const navBTN = document.querySelectorAll(".nav-btn")

navBTN.forEach((currentValue, index, array) => {
    currentValue.addEventListener("click", function (e) {
        const calendar = document.querySelector("#calendar-box")
        const config = document.querySelector("#config-box")

        navBTN.forEach((e) => {
            e.classList.remove("actif")
        })

        currentValue.classList.add("actif")

        if (e.target.innerText == "Configuration") {
            calendar.style.display = "none";
            config.style.display = "";
        }
        if (e.target.innerText == "Rendez-vous") {
            calendar.style.display = "";
            config.style.display = "none";
        }
    })
});

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function createCalendar(month, year, data) {
    const dayTitle = document.querySelector("#day")
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

                day.classList.add("day")
                if (data.some(d => d['date'].split("/")[0] == date)){
                    
                }else{
                    day.classList.add("empty")
                }


                day.classList.add("ok")

                day.addEventListener("click", (e) => {
                    console.log(day.innerText, month + 1, year + 1)
                    dayTitle.innerText = `${day.innerText}/${month + 1}/${year}`
                    getHours(data)
                })

                week.appendChild(day);
                date++;
            }
        }
        calendar.appendChild(week);
    }
}

function getHours(data) {
    let day = document.querySelector("#day").innerText
    const hours = document.querySelector("#hours-list");

    hours.innerHTML = "";

    for (let h = 6; h < 24; h++) {

        let hour = document.createElement("div");
        hour.innerHTML = `
        <div class="item">
            <div class="time">
                <span class="hour">${h.toString().padStart(2, '0')}h00</span>
            </div>
            <div class="checkbox-wrapper-6">
                <input class="tgl tgl-light" id="cb1-6-${h}" 
                type="checkbox"  
                ${data.some(d => d['date'] == `${day} - ${h}`) ? "checked" : ""}/>
                <label class="tgl-btn" for="cb1-6-${h}"></label>
            </div>
        </div>`;

        const checkbox = hour.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('click', function (e) {
            console.log(`Checkbox ${h} cliquée`);
            fetch("http://localhost:1515/api/calendar/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: day,
                    hour: h,
                })
            })
                .then(response => response.json())
                .then(data => meting(data))
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
    const container = document.querySelector("#meting")
    data.forEach((e) => {
        if (e["nom"] && e["email"]) {
            let met = document.createElement("div")
            met.classList.add("item")
            met.innerHTML = `
                <div class="time">
                <span class="date">16/06</span>
                <span class="hour">15h00</span>
                </div>
                <div class="info">
                    <span class="client-name">${e["nom"]}</span>
                    <span class="client-email">${e["email"]}</span>
                </div>
                <div class="status status-${e["confirme"] == 1 ? "confirmed" : "pending"}">
                    ${e["confirme"] == 1 ? "Confirmé" : "En attent"}
                </div>`
            container.appendChild(met)
        }
    })
}

const currentDate = new Date();
const toto = document.querySelector("#day")

toto.innerHTML = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
getMeting()