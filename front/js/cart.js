function afficherArticles() {
  document.querySelector("#cart__items").textContent = "";
  // Récupération du panier
  let cart = getCart()
  if (cart.length == 0) {
    document.getElementsByClassName('cart')[0].textContent = " Votre panier est vide";
  }
  else {
    //remise à zéro du prix total avant d'afficher les articles
    let totalAmount = 0;
    let totalQuty = 0;
    document.querySelector("#totalPrice").textContent = 0;
    document.querySelector("#totalQuantity").textContent = 0;
    for (let i = 0; i < cart.length; i++) {
      const sofa = cart[i];
      fetch(`http://localhost:3000/api/products/${sofa.id}`)
        .then((res) => res.json())
        .then((data) => {
          let product = data;
          //créer article
          let article = document.createElement("article");
          article.classList.add("cart__item");
          article.dataset.id = sofa.id;
          article.dataset.color = sofa.color;
          //create image
          const divCartImg = document.createElement("div");
          divCartImg.classList.add("cart__item__img");
          const image = document.createElement("img");
          image.src = product.imageUrl;
          image.alt = product.altTxt;
          divCartImg.appendChild(image);
          article.appendChild(divCartImg);
          //create cart item content
          const divCartItemContent = document.createElement("div");
          divCartItemContent.classList.add("cart__item__content");
          const divCartItemDesription = document.createElement("div");
          divCartItemDesription.classList.add("cart__item__content__description");
          article.appendChild(divCartItemContent);
          divCartItemContent.appendChild(divCartItemDesription);
          const h2 = document.createElement("h2");
          h2.textContent = product.name;
          divCartItemDesription.appendChild(h2);
          const p1 = document.createElement("p");
          p1.textContent = ` ${sofa.color}`;
          divCartItemDesription.appendChild(p1);
          const p2 = document.createElement("p");
          p2.textContent = ` ${product.price} €`;
          divCartItemDesription.appendChild(p2);
          const divContentSettings = document.createElement("div");
          divContentSettings.classList.add("cart__item__content__settings");
          const divContentSettingsQuantity = document.createElement("div");
          divContentSettingsQuantity.classList.add(
            "cart__item__content__settings__quantity"
          );
          const p3 = document.createElement("p");
          p3.textContent = `Qté : `;
          divContentSettingsQuantity.appendChild(p3);
          divContentSettings.appendChild(divContentSettingsQuantity);
          article.appendChild(divContentSettings);
          const input = document.createElement("input");
          input.type = "number";
          input.classList.add("itemQuantity");
          input.name = "itemQuantity";
          input.min = "1";
          input.max = "100";
          input.value = sofa.quantity;
          divContentSettingsQuantity.appendChild(input);
          // Supression des articles au click.
          input.addEventListener("input", () => {
            // Modifier le produit dans le panier
            updateProductQuantityFromCart(sofa.id, sofa.color, input.value);
            // Mise à jour de la page
            afficherArticles();
          });
          //création du bouton suprimer
          const divContentSettingsDelete = document.createElement("div");
          divContentSettingsDelete.classList.add(
            "cart__item__content__settings__delete"
          );
          const p4 = document.createElement("p");
          p4.classList.add("deleteItem");
          p4.textContent = "Suprimer";
          divContentSettingsDelete.appendChild(p4);
          divContentSettings.appendChild(divContentSettingsDelete);
          // Supression des articles au click.
          divContentSettingsDelete.addEventListener("click", () => {
            // Suppression du produit dans le panier
            deleteProductFromCart(sofa.id, sofa.color);
            // Mise à jour de la page
            afficherArticles();
          });
          document.querySelector("#cart__items").appendChild(article);
          divCartItemContent.appendChild(divContentSettings);
          //total price
          const totalPrice = document.querySelector("#totalPrice");
          totalAmount += product.price * sofa.quantity;
          totalPrice.textContent = totalAmount;
          //total quantity:
          const totalQuantity = document.querySelector("#totalQuantity");
          totalQuty += sofa.quantity;
          totalQuantity.textContent = Number(totalQuty);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
afficherArticles();
//-----------------------------submitForm-----------------------------------------------------
const btnOrder = document.querySelector("#order");
//Envoi du formulaire au click
btnOrder.addEventListener('click', submitForm)
function submitForm(e) {
  e.preventDefault();
  let cart = getCart();
  if (cart.length === 0) alert("Veuillez sélectionner un canapé à acheter..")
  if (invalidForm()) return false
  let productsIds = [];
  for (let i = 0; i < cart.length; i++) {
    productsIds.push(cart[i].id);
  }
  const form = document.querySelector(".cart__order__form");
  const bodyR = {
    contact: {
      firstName: form.elements.firstName.value,
      lastName: form.elements.lastName.value,
      address: form.elements.address.value,
      city: form.elements.city.value,
      email: form.elements.email.value
    },
    products: productsIds
  }
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(bodyR),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.orderId);
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
    })
}
function invalidForm() {
  let cart = getCart();
  const form = document.querySelector(".cart__order__form");
  let errorDetected = false;
  // Vérifie que le panier n'est pas vide
  if (cart.length === 0) {
    alert("Veuillez sélectionner un canapé à acheter..");
    errorDetected = true;
  }
  // FirstName
  const firstNameInput = document.getElementById('firstName');
  const firstNameError = document.getElementById('firstNameErrorMsg');
  const firstNameRegex = new RegExp("^[A-ZÀ-ÿ-a-z,.' -]+$");
  if (firstNameRegex.test(firstNameInput.value)) {
    firstNameError.textContent = "";
  }
  else {
    firstNameError.textContent = "Ce champ est incorrect";
    errorDetected = true;
  }
  // LastName
  const lastNameInput = document.getElementById('lastName');
  const lastNameError = document.getElementById('lastNameErrorMsg');
  const lastNameRegex = new RegExp("^[A-ZÀ-ÿ-a-z,.' -]+$");
  if (lastNameRegex.test(lastNameInput.value)) {
    lastNameError.textContent = "";
  }
  else {
    lastNameError.textContent = "Ce champ est incorrect";
    errorDetected = true;
  }
  // Address
  const addressInput = document.getElementById('address');
  const addressError = document.getElementById('addressErrorMsg');
  const addressRegex = new RegExp("^[0-9A-ZÀ-ÿ-a-z,.' -]+$");
  if (addressRegex.test(addressInput.value)) {
    addressError.textContent = "";
  }
  else {
    addressError.textContent = "Ce champ est incorrect";
    errorDetected = true;
  }
  // City
  const cityInput = document.getElementById('city');
  const cityError = document.getElementById('cityErrorMsg');
  const cityRegex = new RegExp("^[A-ZÀ-ÿ-a-z,.' -]+$");
  if (cityRegex.test(cityInput.value)) {
    cityError.textContent = "";
  }
  else {
    cityError.textContent = "Ce champ est incorrect";
    errorDetected = true;
  }
  // Email
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailErrorMsg');
  const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$");
  if (emailRegex.test(emailInput.value)) {
    emailError.textContent = "";
  }
  else {
    emailError.textContent = "Ce champ est incorrect";
    errorDetected = true;
  }
  if (errorDetected === true) return true;
  return false;
}