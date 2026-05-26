import { cart, addToCart, changeQuantityCart, initCartFromMemory } from './cart.js';

let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];



iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addEquipmentToHTML = () => {
    if (listProductHTML && products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product, 'equipment');
        addCartToHTML();
    }
});
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    const equipmentCart = cart.filter((item) => item.productType === 'equipment');
    if (equipmentCart.length <= 0) {
        listCartHTML.innerHTML = '<p class="empty">Cart is empty</p>';
        iconCartSpan.innerText = 0;
        return;
    }
    equipmentCart.forEach(item => {
        totalQuantity = totalQuantity + item.quantity;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = item.product_id;

        let positionProduct = products.findIndex((value) => value.id == item.product_id);
        let info = products[positionProduct];
        if (!info) {
            return;
        }
        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
        <div class="image">
            <img src="${info.image}">
        </div>
        <div class="name">
            ${info.name}
        </div>
        <div class="totalPrice">$${info.price * item.quantity}</div>
        <div class="quantity">
            <span class="minus"><</span>
            <span>${item.quantity}</span>
            <span class="plus">></span>
        </div>
        `;
    });
    iconCartSpan.innerText = totalQuantity;
}


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type, 'equipment');
        addCartToHTML();
    }
});
initCartFromMemory();
addCartToHTML();

// Function to filter products based on search query
const filterProducts = (query) => {
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });
    return filteredProducts;
};

// Function to display filtered products
const displayFilteredProducts = (filteredProducts) => {
    listProductHTML.innerHTML = ''; // Clear previous products

    filteredProducts.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.dataset.id = product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML =
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
        listProductHTML.appendChild(newProduct);
    });
};

// Event listener for search input
const searchInput = document.querySelector('.search_input');
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim(); // Get search query
    const filteredProducts = filterProducts(query); // Filter products
    displayFilteredProducts(filteredProducts); // Display filtered products
});


const initApp = () => {
    // Fetch Equipments
    fetch('equipment.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addEquipmentToHTML();
    });

    // Initialize cart from memory
    initCartFromMemory();
}

initApp();