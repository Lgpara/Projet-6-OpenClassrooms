const btnLogin = document.querySelector(".btn")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")


btnLogin.addEventListener("click", async function(){
    let email = emailInput.value
    let password = passwordInput.value
    console.log(email)
    console.log(password)
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: (`{"email": "${email}","password": "${password}"}`),
        headers: { "Content-Type": "application/json" }
    })
    const data = await reponse.json()
    window.localStorage.setItem("token", data)
    window.location.href = "index.html"
})