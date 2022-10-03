const numberOfItems = localStorage.length;
const cart = [];

// Récupération des produits à partir de l'API et du localStorage-----------------------------

buildCart = async () => {
  for (let i = 0; i < numberOfItems; i++) {
    const sofa = localStorage.getItem(localStorage.key(i));
    const sofaObjectFromLocalStorage = JSON.parse(sofa);

    await fetch(
      `http://localhost:3000/api/products/${sofaObjectFromLocalStorage.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        sofaObjectFromLocalStorage.sPrice = data.price;
        sofaObjectFromLocalStorage.imgUrl = data.imageUrl;
        sofaObjectFromLocalStorage.altText = data.altTxt;
        sofaObjectFromLocalStorage.Sname = data.name;
        cart.push(sofaObjectFromLocalStorage);
      });
  }
};

buildCart().then(() => cart.forEach((sofa) => displayItem(sofa)));

//Afficher item

function displayItem(sofa) {
  //créer article
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = sofa.id;
  article.dataset.color = sofa.color;

  //create image
  const divCartImg = document.createElement("div");
  divCartImg.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = sofa.imgUrl;
  image.alt = sofa.altText;
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
  h2.textContent = sofa.Sname;
  divCartItemDesription.appendChild(h2);

  const p1 = document.createElement("p");
  p1.textContent = `couleur : ${sofa.color}`;
  divCartItemDesription.appendChild(p1);

  const p2 = document.createElement("p");
  p2.textContent = `Prix : ${sofa.sPrice}`;
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
  divContentSettings.appendChild(input);

  const divContentSettingsDelete = document.createElement("div");
  divContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  const p4 = document.createElement("p");
  p4.classList.add("deleteItem");
  p4.textContent = "Suprimer";
  divContentSettingsDelete.appendChild(p4);
  divContentSettings.appendChild(divContentSettingsDelete);
  divContentSettingsDelete.addEventListener("click", () => {});

  document.querySelector("#cart__items").appendChild(article);
  divCartItemContent.appendChild(divContentSettings);

  //total price
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");
  cart.forEach((sofa) => {
    const totalUnitPrie = sofa.sPrice * sofa.quantity;
    total += totalUnitPrie;
    totalPrice.textContent = total;
  });

  //total quantity:
  let totalQ = 0;
  const totalQuantity = document.querySelector("#totalQuantity");
  cart.forEach((sofa) => {
    totalQ += sofa.quantity;
    totalQuantity.textContent = totalQ;
  });

  //Suprimer
}
