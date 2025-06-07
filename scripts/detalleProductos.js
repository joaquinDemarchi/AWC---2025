const API_TOKEN = 'pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc';
const BASE_ID = 'appjgwL9EfmDSYv7l';
const TABLE_NAME = 'Table 1';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


// Función para capturar el ID del producto de la URL
// y mostrarlo en la consola
// document.addEventListener('DOMContentLoaded', () => {
//     // Obtener el ID del producto de la URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get('id');

//     console.log("id de producto: " + productId)

//     renderProducts(productId);
// });


// Función para traer del AIRTABLE Y renderizar los productos en el HTML
const getProducts = async () => {

    let productId = null; // Inicializar productId;

    document.addEventListener('DOMContentLoaded', () => {
        // Obtener el ID del producto de la URL
        const urlParams = new URLSearchParams(window.location.search);
        // Capturar el ID del producto
        productId = urlParams.get('id');

        console.log("id de producto: " + productId)

    });

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    // Mostrar la información de Airtable en la consola
    console.log('informacion de airtable', data);

    const productoSeleccionado = data.records.filter(item => item.fields.id == productId).map(item => {

        // Filtrar por el ID del producto
        return {
            id: item.fields.id,
            title: item.fields.title,
            descripLarga: item.fields.descripLarga,
            thumbnail: item.fields.thumbnail,
            price: item.fields.price,
            material: item.fields.material,
            color: item.fields.color
        };
    })

    // Mostrar el producto seleccionado en la consola
    console.log('producto seleccionado:', productoSeleccionado);
    // if (productoSeleccionado.length > 0) {
    //     console.log('primer producto:', productoSeleccionado[0]);
    // } else {
    //     console.log('No se encontró el producto con ese ID');
    // }

    renderProducts(productoSeleccionado[0]); // Renderizar el primer producto seleccionado  
}



getProducts()


const contProdDet = document.querySelector('.product-detail');


function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.descripLarga}</p>
        <p>Precio: $${product.price}</p>
        <p>Material: ${product.material}</p>
        <p>Color: ${product.color}</p>
        <a href="detalleProducto.html?id=${product.id}" class="btn">añadir a carrito</a>
        <a href="graciasPorCompra.html" class="btn">Comprar</a>
    `;

    return card;
}

function renderProducts(product) {
    //sirve para la seccion inicio
    if (contProdDet) {

        const card = createProductCard(product);
        contProdDet.appendChild(card);

        //sirve para seccion de ofertas 
    } else {
        console.warn('No se encontró ningun contenedor de productos');
    }
}

//CARGAR COMPONENTES

// Función para cargar componentes HEADER y FOOTER en todas las paginas.
async function loadComponent(componentName, elementId) {
    try {
        const response = await fetch(`./componentes/${componentName}.html`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error de carga:  ${componentName}:`, error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header-container');
    loadComponent('footer', 'footer-container');
});