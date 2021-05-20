function addCart(obj) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(obj)
    localStorage.setItem('cart', JSON.stringify(cart))
    loadCart();
}

function loadCart() {
    let cartItemsCount;
    
    if(localStorage.getItem('cart') === null) {
        cartItemsCount = 0;
    } else {
        cartItemsCount = JSON.parse(localStorage.getItem('cart')).length;
    }

    document.querySelector('.basket > span').textContent = cartItemsCount;
}

export {addCart, loadCart}