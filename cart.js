let cart = [];

// Function to add product to cart
const addToCart = (product_id, productType) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id && value.productType == productType);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            productType: productType,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            productType: productType,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToMemory();
}

// Function to change quantity of product in cart
const changeQuantityCart = (product_id, type, productType) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id && value.productType == productType);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
}

// Function to add cart to memory (localStorage)
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to initialize cart from memory (localStorage)
const initCartFromMemory = () => {
    if (localStorage.getItem('cart')) {
        const stored = JSON.parse(localStorage.getItem('cart'));
        cart = stored.map((item) => {
            if (item.product_id) {
                return item;
            }
            if (item.productId) {
                return { ...item, product_id: item.productId };
            }
            return item;
        });
    }
}

export { cart, addToCart, changeQuantityCart, initCartFromMemory };
