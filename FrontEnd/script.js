//Usefull Const 
const gallery = document.querySelector(".gallery")

const adminMode = document.querySelector(".adminmode")

const filters = document.querySelector(".filter_container")

adminMode.classList.add("no_display")

// Récupération des projets via l'api
const reponseWorks = await fetch("http://localhost:5678/api/works")
const works = await reponseWorks.json()


//Usefull function
function clearHTML() {
    gallery.innerHTML = null
}


//Boucle pour injecter les projets dans le code HTML
function create(var1) {
    for (let i = 0; i != var1.length; i++) {
        let imgContainer = document.createElement("figure")
        gallery.appendChild(imgContainer)
        let img = document.createElement("img")
        img.src = var1[i].imageUrl
        img.alt = var1[i].title
        let caption = document.createElement("figcaption")
        caption.innerText = var1[i].title
        imgContainer.appendChild(img)
        imgContainer.appendChild(caption)
    }
}
//Appel de la fonction pour initiliser la page avec le filtre "tous"
create(works)

///////////Filtre
//Tous
const filterAll = document.querySelector(".btn_all")
filterAll.addEventListener("click", function() {
    let filterNumber = 0
    clearHTML()
    let var1 = works
    create(var1)
    addSelection(filterNumber)
})
//Objet
const filterObjet = document.querySelector(".btn_objet")
filterObjet.addEventListener("click", function() {
    let filterNumber = 1
    clearHTML()
    const worksObjet = works.filter(function (work){
        return work.category.name == "Objets"
    })
    let var1 = worksObjet
    create(var1)
    addSelection(filterNumber)
})
//Apartements
const filterAppartment = document.querySelector(".btn_appartment")
filterAppartment.addEventListener("click", function() {
    let filterNumber = 2
    clearHTML()
    const worksAppartment = works.filter(function (work){
        return work.category.name == "Appartements"
    })
    let var1 = worksAppartment
    create(var1)
    addSelection(filterNumber)
})
//Hotel et restaurant
const filterHotel = document.querySelector(".btn_hotel")
filterHotel.addEventListener("click", function() {
    let filterNumber = 3
    clearHTML()
    const worksHotel = works.filter(function (work){
        return work.category.name == "Hotels & restaurants"
    })
    let var1 = worksHotel
    create(var1)
    addSelection(filterNumber)
})





//Boucle pour ajouter le changement d'apparance du bouton de filtre 
//quand celui ci est sélectionné
function addSelection(filterNumber){
    // const filters = document.querySelector(".filter_container")
    filters.children[filterNumber].classList.add("selected")
    for (let i = 0; i < filters.children.length; i++) {
        if (i !== filterNumber) {
            filters.children[i].classList.remove("selected")
        }
    }
}








