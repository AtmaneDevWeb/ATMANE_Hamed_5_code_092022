function getUrlParam(paramName = "") {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let urlParam = urlParams.get(paramName);
    return urlParam
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

    function findProductFromCart(productId = "", productColor = "") { }
    function deleteProductFromCart(productId = "", productColor = "") { }
    function updateProductQuantityFromCart(productId = "", productColor = "", quantity = 0) { }
    function addProductToCart(productId = "", productColor = "", quantity = 0) { }