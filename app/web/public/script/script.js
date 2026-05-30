const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
    modalContainer.classList.toggle("active")
}

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
                if (date == 10 || date == 11 || date == 12 || date == 13 )
                    day.classList.add("empty")
                else {
                    day.classList.add("ok")
                }
                week.appendChild(day);
                date++;
            }
        }
        calendar.appendChild(week);
    }
}

const currentDate = new Date();
// createCalendar(currentDate.getMonth(), currentDate.getFullYear());