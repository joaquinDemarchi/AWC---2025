//CONEXION CON AIRTABLE

const API_TOKEN = 'pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc';
const BASE_ID = 'appjgwL9EfmDSYv7l';
const TABLE_NAME = 'Table 1';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;



// AIR TABLE: PARA AGREGAR PRODUCTOS

// async function crearProducto(product) {
   
//     const itemAirtable = {
//         fields: product
//     };

    // const response = await fetch(API_URL, {
    //     headers: {
    //         'Authorization': `Bearer ${API_TOKEN}`,
    //         'Content-Type': 'application/json'
    //     },
    // });

//     fetch(API_URL, {
//         method: 'POST',
//         headers:{
//             'Authorization': `Bearer ${API_TOKEN}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(itemAirtable)
//     }).then(data => console.log(data));

// }

// crearProducto() 


///------------------------------------------------------
//const products = [];

//CONEXION CON API DE PRUDUCTOS 

// const getProducts = async () => {
//     const response = await fetch('https://dummyjson.com/products');
//     const data = await response.json();
//     console.log('data.products', data.products);
//     renderProducts(data.products);
// }

//AIR TABLE: PARA LISTAR PRODUCTOS 
//PROFE

const getProducts = async () => {

    const response = await fetch(API_URL, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log('data', data);

    const productsMaped = data.records.map(item => {
        return {
        title: item.fields.title,
        description: item.fields.description,
        thumbnail: item.fields.thumbnail,
        price: item.fields.price
        };
    })
    console.log(productsMaped);
    renderProducts(productsMaped);
}



//OTRA POSIBLE SOLUCION

// const getProducts = async () => {
//     try {
//         const response = await fetch(API_URL, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${API_TOKEN}`,
//                 'Content-Type': 'application/json'
//             }
//         });
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('Respuesta completa de Airtable:', data);

//         if (!data.records || !Array.isArray(data.records)) {
//             throw new Error('La respuesta no contiene records o no es un array');
//         }

//         const productsMaped = data.records.map(item => {
//             return {
//                 title: item.fields?.title || 'Sin título',
//                 description: item.fields?.description || 'Sin descripción',
//                 thumbnail: item.fields?.thumbnail || '',
//                 price: item.fields?.price || 0
//             };
//         });
        
//         console.log('Productos mapeados:', productsMaped);
//         renderProducts(productsMaped);
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//     }
// }

getProducts();
///------------------------------------------------------

//CREAR Y LLENAR CARDS

//localiza la etiqut que contendra los preductos
const contenedorProductos = document .querySelector('.product-container');
const contenedorOfertas = document.querySelector('.ofertas-container');

function createProductCard(product) {
    
    //crea CARD produto
    const card = document.createElement('article');
    card.classList.add('producto');

    //va creando los elementos de la tarjeta:

    //imagen
    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    img.setAttribute("onclick","window.location.href = './detalleProducto.html'")

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
    

    //Añade todos los elementos CREADOS a la tarjeta
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    //card.appendChild(button);

    
    return card;
}

///------------------------------------------------------

//IMPRIMIR TARJETAS

// Verifica si los contenedores existen antes de usarlos
function renderProducts(list){
    //sirve para la seccion inicio
    if (contenedorProductos) {
        list.forEach(product => {
        const card = createProductCard(product);
        contenedorProductos.appendChild(card);
    });
    //sirve para seccion de ofertas 
    } else if(contenedorOfertas) {
        
        list.forEach(product => {
            console.log(product.discountPercentage);
            
        if (product.discountPercentage > 15){
            const card = createProductCard(product);
            contenedorOfertas.appendChild(card);
        }
    })
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