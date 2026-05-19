function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function createCalendar(month, year) {
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

                day.classList.add("ok")
                week.appendChild(day);
                date++;
            }
        }
        calendar.appendChild(week);
    }
}
function getHours() {
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
                    <input class="tgl tgl-light" id="cb1-6-${h}" type="checkbox" />
                    <label class="tgl-btn" for="cb1-6-${h}"></label>
                </div>
            </div>`;            
        hours.appendChild(hour);
    }
}
const currentDate = new Date();
createCalendar(currentDate.getMonth(), currentDate.getFullYear());
getHours()