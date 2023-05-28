const reponseCategory = await fetch("http://localhost:5678/api/categories")
const category = await reponseCategory.json()



console.log(category)

const filters = document.querySelector(".filter_container")

for (let i = 0; i < category.length; i++) {

    console.log("hello")
    let filter = document.createElement("button")

    if (i == 0) {
        filter.id = 0
        filter.classList.add("btn")
        filter.classList.add("selected")
        filter.id = "category0"

    }


    let categoryType = category[i].name
    let categoryId = category[i].Id

    filter.innerHTML = categoryType
    filter.id = `category${categoryId}`
    filter.classList.add("btn")
    filters.appendChild(filter)
}