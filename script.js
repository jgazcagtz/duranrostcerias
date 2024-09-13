document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: "Paquete 1", img: "https://i.imgur.com/Z3uKVA8.png", price: 120, includes: "Incluye pollo y un complemento" },
        { name: "Paquete 2", img: "https://i.imgur.com/TX5izK2.png", price: 150, includes: "Incluye pollo y dos complementos" },
        { name: "Paquete 3", img: "https://i.imgur.com/winqkR2.png", price: 170, includes: "Incluye pollo y tres complementos" },
        { name: "Paquete Medio Pollo", img: "https://i.imgur.com/EFNZp9M.png", price: 70, includes: "Incluye medio pollo y un complemento" },
        { name: "Cebollitas", img: "https://i.imgur.com/kVUSAS5.png", price: 60 },
        { name: "Frijoles", img: "https://i.imgur.com/HsFrgxV.png", price: 50 },
        { name: "Arroz", img: "https://i.imgur.com/G5xqAdY.png", price: 40 },
        { name: "Papas Fritas", img: "https://i.imgur.com/8MMaGMz.png", price: 45 },
        { name: "Salsa Verde", img: "https://i.imgur.com/PtQvvqf.png", price: 25 },
        { name: "Salsa Roja", img: "https://i.imgur.com/C47tGVY.png", price: 25 },
        { name: "Tortillas", img: "https://i.imgur.com/0sriEJp.png", price: 30 }
    ];

    // Define top 6 most expensive products for horizontal layout
    const topProducts = [...products].sort((a, b) => b.price - a.price).slice(0, 6);

    const cart = [];
    let total = 0;
    let selectedProduct = null;

    function createProductElement(product, index, layout = 'vertical') {
        const productItem = document.createElement('div');
        productItem.classList.add(layout === 'horizontal' ? 'horizontal-product-item' : 'vertical-product-item');
        productItem.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p>${product.includes}</p>
                <select id="quantity-${layout}-${index}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button class="choose-btn" onclick="window.showProductModal(${index}, '${layout}')">Elegir</button>
            </div>
        `;
        return productItem;
    }

    function displayProducts(productsToDisplay, layout = 'vertical') {
        const menu = layout === 'horizontal' ? document.getElementById('menu-horizontal') : document.getElementById('menu');
        menu.innerHTML = '';
        productsToDisplay.forEach((product, index) => {
            menu.appendChild(createProductElement(product, index, layout));
        });
    }

    window.showProductModal = function(index, layout = 'vertical') {
        const productList = layout === 'horizontal' ? topProducts : products;
        const quantitySelect = document.getElementById(`quantity-${layout}-${index}`);
        const quantity = parseInt(quantitySelect.value);
        selectedProduct = { ...productList[index], quantity };

        const modalContent = document.getElementById('product-modal-content');
        modalContent.innerHTML = `
            <h3>${selectedProduct.name}</h3>
            <img src="${selectedProduct.img}" alt="${selectedProduct.name}" style="width: 100px; height: 100px;">
            <p>Precio: $${selectedProduct.price.toFixed(2)}</p>
            <p>${selectedProduct.includes}</p>
            <p>Cantidad: ${selectedProduct.quantity}</p>
        `;

        toggleProductModal();
    };

    window.addProductToCart = function() {
        const existingProduct = cart.find(item => item.name === selectedProduct.name);

        if (existingProduct) {
            existingProduct.quantity += selectedProduct.quantity;
        } else {
            cart.push({ name: selectedProduct.name, price: selectedProduct.price, quantity: selectedProduct.quantity });
        }

        updateCart();
        toggleProductModal();
        alert(`Producto agregado al carrito: ${selectedProduct.name} x ${selectedProduct.quantity}`);
    };

    function updateCart() {
        const cartItemsSection = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        cartItemsSection.innerHTML = '';
        total = 0;

        cart.forEach((item) => {
            cartItemsSection.innerHTML += `<p>${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>`;
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    window.clearCart = function() {
        cart.length = 0;
        updateCart();
    };

    // Display top 6 most expensive products in horizontal layout
    displayProducts(topProducts, 'horizontal');

    // Display all products in vertical layout initially
    displayProducts(products, 'vertical');
});

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' || cart.style.display === '' ? 'block' : 'none';
}

function toggleModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
}

function toggleProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'block' : 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('edit-modal');
    const productModal = document.getElementById('product-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === productModal) {
        productModal.style.display = 'none';
    }
}
