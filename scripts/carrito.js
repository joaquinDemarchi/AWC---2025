let carritoConProd = JSON.parse(localStorage.getItem('cart')) || [];
//cargamos EL CARRITO  desde los datos guardados en el LS 

///------------------------------------------------------

//CARGAR PRODUCTOS DEL CARRITO

function createProductCartCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price.toLocaleString('es-AR')}`;

    const cant = document.createElement('p');
    cant.textContent = `Cantidad: ${product.cantidad}`;
    cant.classList.add('cantidadProd');

    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.addEventListener('click', () => {
        const exists = carritoConProd.findIndex(p => p.title === product.title);
        //devuelve el indice, si no encontra nada deveulve -1
        if (exists !== -1) {
            // Elimina el producto del carrito
            carritoConProd.splice(exists, 1);
            //console.log('Producto eliminado del carrito');

            // Actualiza el localStorage
            localStorage.setItem('cart', JSON.stringify(carritoConProd));
            // Vuelve a renderizar los productos del carrito
            renderCartProducts(carritoConProd);
            
        }
    });
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(cant);
    card.appendChild(button);

    return card;
}

///------------------------------------------------------

//IMPRIMIR 

function renderCartProducts(list){
    const contenedorProdCart = document.querySelector('.cart-container');
    const totalPrice = document.querySelector('.totalCarrito');
    const clearCartButton = document.querySelector('.btn-finCompra');

    contenedorProdCart.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos productos

    //mensaje si el carrito está vacío
    if (list.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'El carrito está vacío';
        contenedorProdCart.appendChild(emptyMessage);

        if (totalPrice) {
            totalPrice.textContent = '';
        }
        if (clearCartButton) {
            clearCartButton.style.display = 'none';
        }
        return;
    }
    
    //crea una card por cada prod del LS
    list.forEach( product => {
        const card = createProductCartCard(product);
        contenedorProdCart.appendChild(card);
    });

    //Calcula el precio total
    if (totalPrice) {
        const total = list.reduce((acc, prod) => acc + (prod.price * (prod.cantidad || 1)), 0);
        totalPrice.textContent = `Total: $ ${Number(total).toLocaleString('es-AR')}`;
        totalPrice.classList.add('totalCarritoP');
    }
    if (clearCartButton) {
        clearCartButton.style.display = 'inline-block';
    }
}

///------------------------------------------------------

//LIMPIAR CARRITO

function clearCart() {
    //BORRA lo guardado en el contenedor de productos
    carritoConProd = [];

    //BORRA el LS
    localStorage.setItem('cart', JSON.stringify(carritoConProd));

    //Actualiza la pag
    renderCartProducts(carritoConProd);
    console.log('Carrito vaciado');

    //deja el totla en 0 
    const totalPrice = document.querySelector('.totalCarrito');
    totalPrice.textContent = 'Total: $0';
    totalPrice.classList.add('totalCarritoP');
    
    // lleva a pag de gracias por compra
    window.location.href = './graciasPorCompra.html';
}

const clearCartButton = document.querySelector('.btn-finCompra');
clearCartButton.addEventListener('click', clearCart);

renderCartProducts(carritoConProd);