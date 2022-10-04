// Récupération de l'id du produit contenu dans l'url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");
let imgUrl, altText;
let Sname;

// Création de la requête qui récupère les "id" des produits sur l'api
fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((res) => handleData(res))
  .catch((error) => {
    console.log(error);
  });

// Affichage des caractéristiques du produit
function handleData(sofa) {
  // Affichage de l'image du produit
  let imgItem = document.createElement("img");
  document.querySelector(".item__img").appendChild(imgItem);
  imgItem.src = sofa.imageUrl;
  imgItem.alt = sofa.altTxt;

  // Affichage du nom du produit
  document.querySelector("#title").textContent = sofa.name;

  // Affichage du prix du produit
  document.querySelector("#price").textContent = sofa.price;

  // Affichage de la description du produit
  document.querySelector("#description").textContent = sofa.description;

  // Affichage des couleurs disponibles
  for (let color of sofa.colors) {
    let colorOfSofa = document.createElement("option");
    document.querySelector("#colors").appendChild(colorOfSofa);
    colorOfSofa.value = color;
    colorOfSofa.textContent = color;
  }

  // Ajouter un article dans le panier
  let adCartBtn = document.querySelector("#addToCart");
  adCartBtn.addEventListener("click", () => {
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    const sPrice = document.querySelector("#price").textContent;
    const Sname = document.querySelector("#title").textContent;

    if (color == null || color == "" || quantity == null || quantity <= 0) {
      alert("Veuillez sélectionner une couleur ainsi qu'une quantité !");
    } else {
      let parsedSofa = JSON.parse(localStorage.getItem(id + color));
      if (parsedSofa && parsedSofa.color == color) {
        sofaFromLocalStorage = parsedSofa;
        sofaFromLocalStorage.quantity =
          sofaFromLocalStorage.quantity + Number(quantity);
        localStorage.setItem(id + color, JSON.stringify(sofaFromLocalStorage));
      } else {
        // Création de l'objet qui sera stocké dans le localStorage qui va nous permettre de gérer le panier
        let data = {
          id: id,
          color: color,
          quantity: Number(quantity),
        };

        // Stockage des données dans le localStorage et renvoi vers le panier
        localStorage.setItem(id + color, JSON.stringify(data));
        if (confirm("Produit ajouté, voulez vous aller à la page panier")) {
          window.location.href = "cart.html";
        }
      }
    }
  });
}
