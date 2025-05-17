const products = [];

const getProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    console.log('data.products', data.products);
    renderProducts(data.products);
}

getProducts();

//localiza la etiqut que contendra los preductos
const contenedorProductos = document.querySelector('.product-container');
const contenedorOfertas = document.querySelector('.ofertas-container');

function createProductCard(product) {
    
    //crea tarjeta produto
    const card = document.createElement('article');
    card.classList.add('producto');

    //va creando los elementos de la tarjeta

    //imagen
    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;

    //titulo
    const title = document.createElement('h3');
    title.textContent = product.title;

    //descrip
    const description = document.createElement('p');
    description.textContent = 'Aqui va la descripcion del producto. Debe tener un numero de caracteres determminado';

    //precio
    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
    price.classList.add('precioProd');


    //boton compra
    const button = document.createElement('button');
    button.textContent = 'Comprar';
    button.setAttribute("onclick","window.location.href = './detalleProducto.html'")
    

    //crea añade todos los elementos a la tarjeta
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    
    return card;
}


function renderProducts(list){

    if (contenedorProductos) {
        list.forEach(product => {
        const card = createProductCard(product);
        contenedorProductos.appendChild(card);
    });
    } else if(contenedorOfertas) {
        
        list.forEach(product => {
            console.log(product.discountPercentage);
            
        if (product.discountPercentage > 15){
            const card = createProductCard(product);
            contenedorOfertas.appendChild(card);
        }
    })
    } else {
    console.warn('No se encontró ningun contenedor');
    }
}

// Verifica si los contenedores existen antes de usarlos



// Función para cargar componentes
async function loadComponent(componentName, elementId) {
    try {
        const response = await fetch(`./componentes/${componentName}.html`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header-container');
    loadComponent('footer', 'footer-container');
});