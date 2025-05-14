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

    //va creando los elementos de la tarjeta

    //imagen
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    //titulo
    const title = document.createElement('h3');
    title.textContent = product.name;

    //descrip
    const description = document.createElement('p');
    description.textContent = product.description;

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


products.forEach( product => {
    const card = createProductCard(product);
    contenedorProductos.appendChild(card);
});

