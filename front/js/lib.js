function getUrlParam(paramName = "") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let urlParam = urlParams.get(paramName);
    return urlParam;
}
function getCart() {
    let cart = [];
    let cartLocalStorage = localStorage.getItem("cart");
    if (cartLocalStorage != null) {
        cart = JSON.parse(cartLocalStorage);
    }
    return cart;
}
function saveCart(cart = []) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function findProductFromCart(productId = "", productColor = "") {
    // Récupérer le cart
    let cart = getCart();
    // Trouver la case du tableau
    let index = cart.findIndex(item => (item.id == productId && item.color == productColor));
    // Renvoyer l'index correspondant
    return index;
}
function deleteProductFromCart(productId = "", productColor = "") {
    // Récupérer le cart
    let cart = getCart();
    // Chercher la case du tableau
    let index = findProductFromCart(productId, productColor);
    // Supprimer la case du tableau
    cart.splice(index, 1);
    // Sauvegarder le cart
    saveCart(cart);
}
function updateProductQuantityFromCart(productId = "", productColor = "", quantity = 0) {
    // Récupérer le cart
    let cart = getCart();
    // Chercher la case du tableau
    let index = findProductFromCart(productId, productColor);
    // Modifier la case du tableau
    cart[index].quantity = quantity;
    // Sauvegarder le cart
    saveCart(cart);
}
function addProductToCart(productId = "", productColor = "", quantity = 0) {
    // Récupérer le cart
    let cart = getCart();
    // Chercher la case du tableau
    let index = findProductFromCart(productId, productColor);
    // Création de l'objet qui sera stocké dans le localStorage qui va nous permettre de gérer le panier
    let data = {
        id: productId,
        color: productColor,
        quantity: Number(quantity),
    };
    // Suivant si le produit existe déjà dans le panier ou non
    if (index === -1) {
        cart.push(data);
    }
    else {
        cart[index].quantity += data.quantity;
    }
    // Sauvegarder le cart
    saveCart(cart);
}