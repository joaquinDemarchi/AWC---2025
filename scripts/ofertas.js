const products = [
    {
        name: "Camiseta",
        description: "Camiseta de algodón 100%",
        image: "./img/camiseta.png",
        price: 15
    },  
    {
        name: "Pantalones",
        description: "Pantalones de mezclilla",
        image: "./img/pantalones.webp",
        price: 25
    },
    {
        name: "Zapatos",
        description: "Zapatos de cuero",
        image:"./img/zapatos.webp",
        price: 50
    },
    {
        name: "Sombrero",
        description: "Sombrero de paja",
        image: "./img/sombrero.webp",
        price: 10

    }
];

const contenedorOfertas = document.querySelector('.ofertas-container');

function createProductCard(product, isOffer = false) {
    //crea tarjeta produto
    const card = document.createElement('article');
    card.classList.add('producto');
    if(isOffer) card.classList.add('producto-oferta'); 

    //crea imagen
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    //crea titulo
    const title = document.createElement('h3');
    title.textContent = product.name;

    //crea descrip
    const description = document.createElement('p');
    description.textContent = product.description;

    console.log("Precio de", product.name, ":", product.price, "Tipo:", typeof product.price);
    //crea precio
    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    if (product.price <= 25) {
        price.classList.add('precioOf');
        console.log("Clase añadida:", price.classList)
    }

    //crea boton
    const button = document.createElement('button');
    button.textContent = 'Comprar';

    //crea añade todos los elementos a la tarjeta
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

const ofertas = products.filter(product => product.price <= 25);

console.log(ofertas);


ofertas.forEach(product => {
    const card = createProductCard(product, true);
    contenedorOfertas.appendChild(card);


});

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