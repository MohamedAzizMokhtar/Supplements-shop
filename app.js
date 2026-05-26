let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let creatineProducts =[];
let preworkoutProducts=[];
let aminoProducts=[];
let micronutrientsProducts=[];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addProteinToHTML = () => {
        // add new datas
        if(products.length > 0) // if has data
        {
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
    const addCreatineToHTML = () => {
        const creatineProductsHTML = document.querySelector('.creatineProducts');
        if (creatineProductsHTML && creatineProducts.length > 0) {
            creatineProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                creatineProductsHTML.appendChild(newProduct);
            });
        }
    }
    const addPreWorkoutToHTML = () => {
        const preworkoutProductsHTML = document.querySelector('.preworkoutProducts');
        if (preworkoutProductsHTML && preworkoutProducts.length > 0) {
            preworkoutProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                preworkoutProductsHTML.appendChild(newProduct);
            });
        }
    }

    const addAminoToHTML = () => {
        const aminoProductsHTML = document.querySelector('.aminoProducts');
        if (aminoProductsHTML && aminoProducts.length > 0) {
            aminoProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                aminoProductsHTML.appendChild(newProduct);
            });
        }
    }
    const addMicronutrientsToHTML = () => {
        const micronutrientsProductsHTML = document.querySelector('.micronutrientsProducts');
        if (micronutrientsProductsHTML && micronutrientsProducts.length > 0) {
            micronutrientsProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                micronutrientsProductsHTML.appendChild(newProduct);
            });
        }
    }

    document.querySelectorAll('.listProduct').forEach(productSection => {
        productSection.addEventListener('click', (event) => {
            let positionClick = event.target;
            if(positionClick.classList.contains('addCart')){
                let id_product = positionClick.parentElement.dataset.id;
                let productType = productSection.classList.contains('creatineProducts') ? 'creatine' :
                                 productSection.classList.contains('preworkoutProducts') ? 'preworkout' :
                                 productSection.classList.contains('aminoProducts') ? 'amino' :
                                 productSection.classList.contains('micronutrientsProducts') ? 'micronutrients' :
                                 'protein'; // Default to protein if no specific type is found
                addToCart(id_product, productType);
            }
        });
    });
    const addToCart = (product_id, productType) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id && value.productType == productType);
        if(cart.length <= 0){
            cart = [{
                product_id: product_id,
                productType: productType,
                quantity: 1
            }];
        }else if(positionThisProductInCart < 0){
            cart.push({
                product_id: product_id,
                productType: productType,
                quantity: 1
            });
        }else{
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
        addCartToHTML();
        addCartToMemory();
    }
    
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const loadCartFromMemory = () => {
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
        addCartToMemory();
    }
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length <= 0) {
        listCartHTML.innerHTML = '<p class="empty">Cart is empty</p>';
        iconCartSpan.innerText = 0;
        return;
    }
    cart.forEach(item => {
        totalQuantity = totalQuantity + item.quantity;
        const itemId = item.product_id || item.productId;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = itemId;
        let productType = item.productType;
        let productList = productType === 'creatine' ? creatineProducts :
                          productType === 'preworkout' ? preworkoutProducts :
                          productType === 'amino' ? aminoProducts :
                          productType === 'micronutrients' ? micronutrientsProducts :
                          products;
        let positionProduct = productList.findIndex((value) => value.id == itemId);
        let info = productList[positionProduct];
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
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        let productType = cart.find(item => item.product_id === product_id)?.productType;
        changeQuantityCart(product_id, type, productType);
    }
})
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
    addCartToHTML();
    addCartToMemory();
}



// Function to filter products based on search query
// Function to filter products based on search query
const filterProducts = (query, productList) => {
    const filteredProducts = productList.filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase());
    });
    return filteredProducts;
};



// Function to display filtered products
const displayFilteredProducts = (filteredProducts, productContainer) => {
    productContainer.innerHTML = ''; // Clear previous products

    filteredProducts.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.dataset.id = product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML =
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
        productContainer.appendChild(newProduct);
    });
};

// Event listener for search input
const searchInput = document.querySelector('.search_input');
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim(); // Get search query

    // Filter products for each section
    const filteredProteinProducts = filterProducts(query, products);
    const filteredCreatineProducts = filterProducts(query, creatineProducts);
    const filteredPreworkoutProducts = filterProducts(query, preworkoutProducts);
    const filteredAminoProducts = filterProducts(query, aminoProducts);
    const filteredMicronutrientsProducts = filterProducts(query, micronutrientsProducts);

    // Display filtered products for each section
    displayFilteredProducts(filteredProteinProducts, listProductHTML);
    displayFilteredProducts(filteredCreatineProducts, document.querySelector('.creatineProducts'));
    displayFilteredProducts(filteredPreworkoutProducts, document.querySelector('.preworkoutProducts'));
    displayFilteredProducts(filteredAminoProducts, document.querySelector('.aminoProducts'));
    displayFilteredProducts(filteredMicronutrientsProducts, document.querySelector('.micronutrientsProducts'));
});

const initApp = () => {
    // Fetch Protein products
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addProteinToHTML();
    });
    
    // Fetch Creatine products
    fetch('creatine.json')
    .then(response => response.json())
    .then(data => {
        creatineProducts = data;
        addCreatineToHTML();
    });

    // Fetch PreWorkout products
    fetch('preworkout.json')
    .then(response => response.json())
    .then(data => {
        preworkoutProducts = data;
        addPreWorkoutToHTML();
    });

    // Fetch Amino products
    fetch('amino.json')
    .then(response => response.json())
    .then(data => {
        aminoProducts = data;
        addAminoToHTML();
    });

    // Fetch Micronutrients products
    fetch('micronutrients.json')
    .then(response => response.json())
    .then(data => {
        micronutrientsProducts = data;
        addMicronutrientsToHTML();
    });

        // get data cart from memory
        loadCartFromMemory();
        addCartToHTML();
    }
initApp();