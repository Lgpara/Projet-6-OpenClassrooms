const btnLogin = document.querySelector(".login_button")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const logFom = document.getElementById("logForm")





logForm.addEventListener("submit", async function(event){
    event.preventDefault()
    let email = emailInput.value
    let password = passwordInput.value
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: (`{"email": "${email}","password": "${password}"}`),
        headers: { "Content-Type": "application/json" }
    })
    const data = await reponse.json()
    if(data.message === "user not found" || reponse.status === 401){
        alert("Erreur dans l’identifiant ou le mot de passe")
        passwordInput.value = ""
    } else {
        window.localStorage.setItem("token", data.token)
        window.location.href = "index.html"
    }
})