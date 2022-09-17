//Création de la requête qui récupère l'ensemble des produits sur l'api
fetch("https://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
    .then((err) => console.log(err))

//Création des articles
function addProducts(donnees) {
    let id = donnees[0]._id

//Création de la balise <a> + anchor
    let anchor = document.createElement("a")
        anchor.href = "./product.html?id=" + id
        anchor.text = "lien vers l'id du produit"
//Récupération de l'item + rattachement de l'anchor
    let items = document.querySelector("#items")
        items.appendChild(anchor)
        console.log(items)
}