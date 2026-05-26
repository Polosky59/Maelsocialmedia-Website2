const inputBtn = document.querySelector("#btn-input")

const inputUsername = document.querySelector("#username")
const inputPassword = document.querySelector("#Password")


inputBtn.addEventListener("click", () => {
    let usernameValue = inputUsername.value
    let passwordValue = inputPassword.value

    fetch("http://localhost:1515/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: usernameValue,
            password: passwordValue
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data["status"])
                window.location.replace("admin")
        })
        .catch(error => console.error('Erreur:', error));
})