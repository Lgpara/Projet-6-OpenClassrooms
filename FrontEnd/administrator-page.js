
let token = window.localStorage.getItem("token")
console.log(token)
if (token !== null && token !== undefined){
    console.log("token found")
    const adminMode = document.querySelector(".adminmode")
    adminMode.classList.remove("no_display")
}


//open module 
const editionClick = document.querySelector(".edition_mode")
editionClick.addEventListener("click", function(){
    let modaleWindow = document.querySelector(".module")
    modaleWindow.classList.remove("no_display") 
})

//close module
const closeIcone = document.querySelector(".closeModule")
closeIcone.addEventListener("click", function(){
    let modaleWindow = document.querySelector(".module")
    modaleWindow.classList.add("no_display") 
})






//add/del project to module
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
        let imgId = works[i].id
        console.log(imgId)
    
        let caption = document.createElement("figcaption")
        caption.innerText = "éditer"
        let trashIcon = document.createElement("div")
        trashIcon.classList.add("trashIconContainer")
        trashIcon.innerHTML =`<i class="fa-solid fa-trash-can trashIcon"></i>`
        trashIcon.classList.add(`referenceId${imgId}`)

        imgContainer.appendChild(trashIcon)
        imgContainer.appendChild(img)
        imgContainer.appendChild(caption)

        let delBtn = document.querySelector(`.referenceId${imgId}`)
        delBtn.addEventListener("click", function(){
            let deleteInfos = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Autorization": `Bearer ${token}` 
                },
            }
            fetch(`http://localhost:5678/api/works/${imgId}`, deleteInfos)
        })

    }
}
create(works)





//Navigation entre les fenetre du module


const addPhoto = document.querySelector(".addPhoto")
const addPhotoBlock = document.querySelector(".addphoto_block")
const backArrow = document.querySelector(".back_arrow")
const delPhotoBlock = document.querySelector(".delphoto_block")


addPhoto.addEventListener("click", function(){
    delPhotoBlock.classList.add("no_display")
    backArrow.classList.remove("no_display")
    addPhotoBlock.classList.remove("no_display")
})

backArrow.addEventListener("click", function(){
    delPhotoBlock.classList.remove("no_display")
    backArrow.classList.add("no_display")
    addPhotoBlock.classList.add("no_display")
})

const form1 = document.querySelector(".fm1")
const form2 = document.querySelector(".fm2")
const validationBtn = document.querySelector(".add_photo_validation_btn")

form2.addEventListener("input", function(){
    if (form1.value !== null && form2.value !== null) {
        validationBtn.classList.add("selected")    
    } else {
        validationBtn.classList.remove("selected")
    }
})






const reponseWorksCategories = await fetch("http://localhost:5678/api/categories")
const worksCategories = await reponseWorksCategories.json()
console.log(worksCategories)
// ajout des catégories dans le menu déroulant de l'ajout de projets

for (let i = 0; i < worksCategories.length; i++){
    let options = document.createElement("option")
    options.value = worksCategories[i].id
    options.innerHTML = worksCategories[i].name
    form2.appendChild(options)
}




// Ajout des photos



validationBtn.addEventListener("click", function(){
    if (form1.value !== null && form2.value !== null) {
        let newId = worksCategories[-1].id - 1
        let content = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Autorization": `${token}` 
            },
            body: {
                "id": newId,
                "title": form1.value,
                "imageUrl": "string",
                "categoryId": form2.value,
                "userId": 1
            }
        }
    } 
})