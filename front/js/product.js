id = getUrlParam("id");
console.log(id);
let imgUrl, altText;
let Sname;
// Product id manquant
if (id == null || id == "") {
  document.getElementsByClassName('item')[0].textContent = "Product id manquant";
} else {
  // Création de la requête qui récupère les "id" des produits sur l'api
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
        // Id incorrect
      } else {
        document.getElementsByClassName('item')[0].textContent = "Id incorrect";
      }
    })
    .then((data) => {
      let product = data;
      // Affichage de l'image du produit
      let imgItem = document.createElement("img");
      document.querySelector(".item__img").appendChild(imgItem);
      imgItem.src = product.imageUrl;
      imgItem.alt = product.altTxt;
      // Affichage du nom du produit
      document.querySelector("#title").textContent = product.name;
      // Affichage du prix du produit
      document.querySelector("#price").textContent = product.price;
      // Affichage de la description du produit
      document.querySelector("#description").textContent = product.description;
      // Affichage des couleurs disponibles
      for (let color of product.colors) {
        let colorOfSofa = document.createElement("option");
        document.querySelector("#colors").appendChild(colorOfSofa);
        colorOfSofa.value = color;
        colorOfSofa.textContent = color;
      }
      let adCartBtn = document.querySelector("#addToCart");
      adCartBtn.addEventListener("click", () => {
        // Ajouter un article dans le panier
        const color = document.querySelector("#colors").value;
        const quantity = document.querySelector("#quantity").value;
        //Contrôle quantité et couleur sélectionnées
        if (color == null || color == "" || quantity == null) {
          alert("Veuillez sélectionner une couleur ainsi qu'une quantité !");
        } else if (quantity > 100 || quantity <= 0) {
          alert("Veuillez choisir une quantité entre 1 et 100 articles");
        }
        else {
          // Ajout du produit dans le panier
          addProductToCart(id, color, Number(quantity));
          // On redirige l'utilisateur vers la page panier
          if (confirm("Produit ajouté, voulez vous aller à la page panier")) {
            window.location.href = "cart.html";
          }
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
