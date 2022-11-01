//Création de la requête qui récupère l'ensemble des produits sur l'api
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))
  .catch((err) => console.log(err));

//Création des articles
function addProducts(sofaList) {
  // Pas de produits disponibles à la vente
  if (sofaList == undefined || sofaList.length == 0) {
    document.getElementById('items').textContent = "Aucun produit disponible à la vente";
  }
  for (let i = 0; i < sofaList.length; i++) {
    //Création de la balise <a> + récupération des id produits
    let a = document.createElement("a");
    a.href = `product.html?id=${sofaList[i]._id}`;

    //Récupération de l'item + injection de la balise <a>
    let items = document.querySelector("#items");
    items.appendChild(a);

    //Création et injection de la balise <a> dans <aticle>
    let article = document.createElement("article");
    a.appendChild(article);

    //Création et injection de l'image
    let kanapImg = document.createElement("img");
    kanapImg.src = sofaList[i].imageUrl;
    kanapImg.alt = sofaList[i].altTxt;
    article.appendChild(kanapImg);

    //Création et injection du h3
    let kanapName = document.createElement("h3");
    kanapName.classList.add("productName");
    kanapName.textContent = sofaList[i].name;
    article.appendChild(kanapName);

    //Création et injection du paragraphe p
    let kanapDescription = document.createElement("p");
    kanapDescription.classList.add("productDescription");
    kanapDescription.textContent = sofaList[i].description;
    article.appendChild(kanapDescription);
  }
}
