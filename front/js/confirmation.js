// Récupération de l'id de la commande contenu dans l'url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let orderId = urlParams.get("orderId");
console.log(orderId);

// Affichage de l'orderId dans la page
const orderIdSpan = document.querySelector("#orderId");
orderIdSpan.textContent = orderId;

// Suppression des produits du panier
localStorage.setItem('cart', []);