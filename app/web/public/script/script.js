const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
    const currentDate = new Date();
    if (modalContainer.classList.toggle("active")) {
        fetch("http://localhost:1515/api/calendar/getAllFree", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                createCalendar(currentDate.getMonth(), currentDate.getFullYear(), data);
            })
            .catch(error => console.error('Erreur:', error));
    } else {
        const container = document.querySelector(".dual")
        container.innerHTML = `
         <div id="calendar"></div>
         <div class="rendez-vous"><div id="meting" class="list"></div></div>`
    }
}
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

                if (data.some(d => {
                    const dt = new Date(d.date);
                    return dt.getDate() === date &&
                        dt.getMonth() === month &&
                        dt.getFullYear() === year;
                })) {
                    day.classList.add("ok")
                    day.addEventListener("click", () => {
                        getHour(data, new Date(year, month, Number(day.innerText)));
                    });
                } else {
                    day.classList.add("empty");
                }
                week.appendChild(day);
                date++;
            }
        }
        calendar.appendChild(week);
    }
}

function getHour(data, selectedDate) {
    const container = document.querySelector("#meting")
    container.innerHTML = ""

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();


    data.forEach((e) => {
        const dt = new Date(Number(e.date));
        if (
            dt.getDate() === day &&
            dt.getMonth() === month &&
            dt.getFullYear() === year
        ) {
            let met = document.createElement("div");
            met.classList.add("item");

            const hour = dt.getHours().toString().padStart(2, '0');

            met.innerHTML = `
            <div class="time">
                <span class="date">${day}/${month + 1}/${year}</span>
                <span class="hour">${hour}h00</span>
            </div>
            `;

            met.addEventListener("click", () => {
                const dual = document.querySelector(".dual");
                dual.innerHTML = `
                <form class="form">
                    <div class="field">
                        <label>Username</label>
                        <input id="username" type="text">
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input id="email" type="text">
                    </div>
                    <button id="btn" type="submit">Enregistrer</button>
                </form>
                `;
                const btn = dual.querySelector("#btn");
                btn.addEventListener("click", (event) => {
                    event.preventDefault();

                    const username = document.querySelector("#username").value;
                    const email = document.querySelector("#email").value;


                    const exactTimestamp = dt.getTime();

                    console.log(exactTimestamp);

                    fetch("http://localhost:1515/api/calendar/lock", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username,
                            email,
                            date: exactTimestamp
                        })
                    })
                        .catch(error => console.error("Erreur:", error));
                });
            });
            container.appendChild(met);
        }
    });
}
