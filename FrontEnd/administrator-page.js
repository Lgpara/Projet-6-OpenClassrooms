// Récupération de travaux de via l'API
const reponseWorks = await fetch("http://localhost:5678/api/works")
const works = await reponseWorks.json()
// Récupération des catégories de via l'API
const reponseWorksCategories = await fetch("http://localhost:5678/api/categories")
const worksCategories = await reponseWorksCategories.json()




// Récupération du token dans le local storage (init dans login.js)
let token = window.localStorage.getItem("token")

// Selecteur bouton navigation
const logIn = document.querySelector(".login_nav")
const logOut = document.querySelector(".logout_nav")

// Selecteur pour les boutton modifier
const btnUnderPhoto = document.querySelector(".edit_btn_photo")
const btnForProjet = document.querySelector(".edit_btn_projet")

// Selecteur du parent des filter
const filterContainer = document.querySelector(".filter_container")

// Selecteur du conteneur avec le titre "Mes Projets" pour un ajout de margin
const projetTitleContainer = document.querySelector(".projet_title_container")

// Selecteur du bloc admin (Bande d'édition noir en haut de l'écran)
const adminMode = document.querySelector(".adminmode")

// Fonction d'action du mode admin si il y a présence d'un token
function tokenReader(){
    if (token !== "undefined"){
        adminMode.classList.remove("no_display")
        logIn.classList.add("no_display")
        logOut.classList.remove("no_display")

        btnForProjet.classList.remove("no_display")
        btnUnderPhoto.classList.remove("no_display")

        filterContainer.classList.add("no_display")
        projetTitleContainer.classList.add("addmargin")

    } else {
        adminMode.classList.add("no_display")

        btnForProjet.classList.add("no_display")
        btnUnderPhoto.classList.add("no_display")

        filterContainer.classList.remove("no_display")
        projetTitleContainer.classList.remove("addmargin")

    }
}
// Appel de cette fonction pour activer la boucle de vérification
tokenReader()

// Ecoute du click du bouton logout; suppression du token
// appel de la fonction tokenReader car MAJ du token
logOut.addEventListener("click", function(){
    logIn.classList.remove("no_display")
    logOut.classList.add("no_display")
    token = "undefined"
    localStorage.setItem("token", token)
    tokenReader()
})

// Ouverture et fermeture de la modale
// Selection de la fenêtre
let modaleWindow = document.querySelector(".module")

// Open 
const editionClick = document.querySelector(".edition_mode")
editionClick.addEventListener("click", function(){
    modaleWindow.classList.remove("no_display") 
})
// Close
const closeIcone = document.querySelector(".closeModule")
closeIcone.addEventListener("click", function(){
    modaleWindow.classList.add("no_display") 
})

// Navigation entre les fenetre de la modale
const addPhoto = document.querySelector(".addPhoto")
const addPhotoBlock = document.querySelector(".addphoto_block")
const backArrow = document.querySelector(".back_arrow")
const delPhotoBlock = document.querySelector(".delphoto_block")

// Evenement de click sur le bouton "Ajouter une photo"
addPhoto.addEventListener("click", function(){
    delPhotoBlock.classList.add("no_display")
    backArrow.classList.remove("no_display")
    addPhotoBlock.classList.remove("no_display")
})
// Evenement de click sur l'icon flèche vers la gauche
backArrow.addEventListener("click", function(){
    delPhotoBlock.classList.remove("no_display")
    backArrow.classList.add("no_display")
    addPhotoBlock.classList.add("no_display")
})

// Ajout dynamique des mignatures des projets dans l'interface
// d'ajout de suppression de projet dans la modale

const photoContainer = document.querySelector(".photo_container")
// Fonction qui crée les elements html a partir de l'api
// Crée des boutons de suppressions sur ceux ci
function create(works) {
    for (let i = 0; i != works.length; i++) {
        let imgContainer = document.createElement("figure")
        photoContainer.appendChild(imgContainer)
        let img = document.createElement("img")
        img.src = works[i].imageUrl
        img.alt = works[i].title
        let imgId = works[i].id
        let caption = document.createElement("figcaption")
        caption.innerText = "éditer"
        let trashIcon = document.createElement("div")
        trashIcon.classList.add("trashIconContainer")
        trashIcon.innerHTML =`<i class="fa-solid fa-trash-can trashIcon"></i>`
        trashIcon.classList.add(`referenceId${imgId}`)
        // Injection des éléments crées dans l'index (img + caption + icone poubelle)
        imgContainer.appendChild(trashIcon)
        imgContainer.appendChild(img)
        imgContainer.appendChild(caption)
        // Ecoute du click sur les icones poubelle pour suppressions des éléments
        let delBtn = document.querySelector(`.referenceId${imgId}`)
        delBtn.addEventListener("click", function(){
            let deleteInfos = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            }
            fetch(`http://localhost:5678/api/works/${imgId}`, deleteInfos)
        })
        
    }
}
create(works)

// Ajout des photos

const submitPhoto = document.getElementById("submit_photo")
const photoInput = document.getElementById("photo_input")
const fileCategory = document.getElementById("file_category")

// Ecoute du click sur le bouton valider
submitPhoto.addEventListener("submit", function(event) {
    event.preventDefault();
    if (entry3.value == "") {
        alert("Veuillez renseigner une catégorie !");
    } else {
        let formData = new FormData();
        formData.append('image', photoInput.files[0]);
        formData.append('title', entry2.value);
        formData.append('category', fileCategory.value);
        let content = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        };
        
        fetch("http://localhost:5678/api/works", content);
    }
});




























const entry1 = document.querySelector(".entry1")
const entry2 = document.querySelector(".entry2")
const entry3 = document.querySelector(".entry3")
const validationBtn = document.querySelector(".add_photo_validation_btn")

let formEntries = [entry1,entry2,entry3]
for (let i = 0; i < formEntries.length; i++){
    console.log(formEntries[i])
    formEntries[i].addEventListener("change", function(){
        if (entry2.value !== "" && entry3.value !== "" && photoInput.value !== "") {
            validationBtn.classList.add("selected")    
        } else {
            validationBtn.classList.remove("selected")
        }
    })
} 


let uploadedImg = photoInput.files[0]


entry1.addEventListener("change", function(){
    let uploadedImg = photoInput.files[0]
    if(uploadedImg.size > 4000000){
        alert("Votre fichier supérieur à 4mo, veuillez réessayer avec un ficher moins volumineux")
    } else {
        if(uploadedImg.type !== "image/png" && uploadedImg.type !== "image/jpeg"){
            alert("Le format de l'image n'est pas pris en charge, veuillez réessaye avec un fichier au format .jpeg ou .png")
        } else {
            const reader = new FileReader()
            reader.onload = function(){
                const image = document.createElement("img")
                image.src = reader.result
                image.classList.add("uploadedImg")
                let photoContainer = document.querySelector(".uploaded_photo_container")
                photoContainer.innerHTML = ""
                let noPhoto = document.querySelectorAll(".no_photo")
                noPhoto.forEach(function(element){
                    element.classList.add("no_display")
                })
                photoContainer.appendChild(image)
            }
            reader.readAsDataURL(uploadedImg)
        }
    }
    console.log(photoInput.files[0])
})



// ajout des catégories dans le menu déroulant de l'ajout de projets

for (let i = 0; i < worksCategories.length; i++){
    let options = document.createElement("option")
    options.value = worksCategories[i].id
    options.innerHTML = worksCategories[i].name
    
    entry3.appendChild(options)
}        











