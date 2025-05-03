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

    },
    {
        name: "Play Station 5",
        description: "Consola de videojuegos",
        image: "./img/PS5.webp",
        price: 25
    },
    {
        name: "Zapatilla",
        description: "Zapatillas deportivas",
        image:"./img/zapas.webp",
        price: 50
    },
    {
        name: "TV",
        description: "Television Samsung",
        image: "./img/TV.jfif",
        price: 10

    }
];

//localiza la etiqut que contendra los preductos
const contenedorProductos = document.querySelector('.product-container');
const contenedorOfertas = document.querySelector('.ofertas-container');

function createProductCard(product) {
    //crea tarjeta produto
    const card = document.createElement('article');
    card.classList.add('producto');

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

    //crea precio
    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

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

// function addProduct() {
//     const newProduct = {
//         name: "Nuevo Producto",
//         description: "Descripción del nuevo producto",
//         image: "./img/image-google.png",
//         price: 20
//     };

//     const card = createProductCard(newProduct);
//     contenedorProductos.appendChild(card);
// }

products.forEach( product => {
    const card = createProductCard(product);
    contenedorProductos.appendChild(card);
});



// const button = document.querySelector('#btn-add-products');

// button.addEventListener('click', addProduct);

