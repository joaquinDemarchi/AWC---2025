let carritoConProd = JSON.parse(localStorage.getItem('cart')) || [];

function createProductCartCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.addEventListener('click', () => {
        const exists = carritoConProd.findIndex(p => p.title === product.title);
        if (exists !== -1) {
            // Elimina el producto del carrito
            carritoConProd.splice(exists, 1);
            // Actualiza el localStorage
            console.log('Producto eliminado del carrito');
            localStorage.setItem('cart', JSON.stringify(carritoConProd));
            // Vuelve a renderizar los productos del carrito
            renderCartProducts(carritoConProd);
        }
    });
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function renderCartProducts(list){
    const contenedorProdCart = document.querySelector('.cart-container');
    contenedorProdCart.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos productos
    
    //mensaje si el carrito está vacío
    if (list.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'El carrito está vacío';
        contenedorProdCart.appendChild(emptyMessage);
        return;
    }
    
    list.forEach( product => {
        const card = createProductCartCard(product);
        contenedorProdCart.appendChild(card);

        const totalPrice = document.querySelector('.totalCarrito');
        const total = list.reduce((acc, prod) => acc + prod.price, 0);
        totalPrice.textContent = `Total: $${total.toFixed(0)}`;
        totalPrice.classList.add('totalCarritoP');
    });
}

function clearCart() {
    carritoConProd = [];
    localStorage.setItem('cart', JSON.stringify(carritoConProd));
    renderCartProducts(carritoConProd);
    console.log('Carrito vaciado');

    const totalPrice = document.querySelector('.totalCarrito');
    totalPrice.textContent = 'Total: $0';
    totalPrice.classList.add('totalCarritoP');
    
    alert('Compra finalizada con éxito');
    window.location.href = 'index.html';
}

const clearCartButton = document.querySelector('.btn-finCompra');
clearCartButton.addEventListener('click', clearCart);

renderCartProducts(carritoConProd);