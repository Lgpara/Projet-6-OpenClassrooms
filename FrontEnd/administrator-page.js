let token = window.localStorage.getItem("token")
if (token !== null){
    console.log("token found")
    const adminMode = document.querySelector(".adminmode")
    adminMode.classList.remove("no_display")
}


//open module 
const editionClick = document.querySelector(".edition_mode")
editionClick.addEventListener("click", function(){
    console.log("hello")
    let modaleWindow = document.querySelector(".module")
    modaleWindow.classList.remove("no_display") 
})

//close module
const closeIcone = document.querySelector(".closeModule")
closeIcone.addEventListener("click", function(){
    let modaleWindow = document.querySelector(".module")
    modaleWindow.classList.add("no_display") 
})




//add project to module
const reponseWorks = await fetch("http://localhost:5678/api/works")
const works = await reponseWorks.json()
const photoContainer = document.querySelector(".photo_container")

function create(works) {
    for (let i = 0; i != works.length; i++) {
        let imgContainer = document.createElement("figure")
        photoContainer.appendChild(imgContainer)
        let img = document.createElement("img")
        img.src = works[i].imageUrl
        img.alt = works[i].title
        let caption = document.createElement("figcaption")
        caption.innerText = "éditer"

        let trashIcon = document.createElement("div")
        trashIcon.classList.add("trashIconContainer")
        trashIcon.innerHTML =`<i class="fa-solid fa-trash-can trashIcon"></i>`
        imgContainer.appendChild(trashIcon)
        imgContainer.appendChild(img)
        imgContainer.appendChild(caption)
    }
}
create(works)

const addPhoto = document.querySelector(".addPhoto")
addPhoto.addEventListener("click", function(){
    
})