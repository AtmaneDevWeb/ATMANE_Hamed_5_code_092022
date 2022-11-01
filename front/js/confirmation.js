orderId = getUrlParam("orderId");
console.log(orderId);
// order id manquant
if (orderId == null || orderId == "") {
    document.getElementsByClassName('confirmation')[0].textContent = "OrderId manquant";
} else {
    // Affichage de l'orderId dans la page
    const orderIdSpan = document.querySelector("#orderId");
    orderIdSpan.textContent = orderId;
    // Suppression des produits du panier
    localStorage.setItem('cart', '[]');
}
