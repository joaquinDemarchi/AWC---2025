//CONEXION CON AIRTABLE

const airtableConfig = {
    API_TOKEN: 'pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc',
    BASE_ID: 'appjgwL9EfmDSYv7l',
    TABLE_NAME: 'Table 1',
    get API_URL() {
        return `https://api.airtable.com/v0/${this.BASE_ID}/${this.TABLE_NAME}`;
    }
};

///------------------------------------------------------

//AIR TABLE

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

    const response = await fetch(airtableConfig.API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${airtableConfig.API_TOKEN}`,
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

///------------------------------------------------------

//LISTAR 

function createProductCard(product) {
    if (!product) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'No se encontró el producto.';
        return errorMsg;
    }
    const detalle = document.createElement('div');
    detalle.classList.add('product-detalle');

    //CONTENEDOR DE IAMGEN
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    //imagen
    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = product.title;
    imgContainer.appendChild(img);

    //CONTENEDOR DE INFORMACION
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    //info
    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price.toLocaleString('es-AR')}`;
    price.setAttribute('id', 'precioDetProd');

    const descripLarga = document.createElement('p');
    descripLarga.textContent = product.descripLarga;

    const material = document.createElement('p');
    material.textContent = `Material: ${product.material}`;
    material.setAttribute('id', 'materialDetProd');


    const color = document.createElement('p');
    color.textContent = `Color: ${product.color}`;
    color.setAttribute('id', 'colorDetProd');


    const buttonCarrito = document.createElement('button');
    buttonCarrito.textContent = 'Añadir al carrito';
    buttonCarrito.id = 'btn-add-cart';
    // buttonCarrito.classList.add('btn-add-cart');
    buttonCarrito.addEventListener('click', () => {
        // Obtener el carrito actual o array vacío
        const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
        // Verificar si ya existe el producto por id
        const existe = cartProducts.find(p => p.id === product.id);
        let mensaje = '';
        if (!existe) {
            product.cantidad = 1; // Añadir cantidad inicial
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            console.log('Producto agregado al carrito');
            mensaje = `${product.title} ha sido añadido al carrito`;
        } else {
            const index = cartProducts.findIndex(p => p.id === product.id);
            cartProducts[index].cantidad += 1;
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            mensaje = `Se sumó una unidad más de ${product.title} al carrito`;
        }
        // Mostrar modal nativo
        const modal = document.getElementById('modal-cart-feedback');
        const msg = document.getElementById('modal-cart-feedback-msg');
        if (modal && msg) {
            msg.textContent = mensaje;
            modal.showModal();
        }
    });

    const buttonComprar = document.createElement('button');
    buttonComprar.textContent = 'Comprar';
    buttonComprar.setAttribute("onclick", "window.location.href = './graciasPorCompra.html'")
    buttonComprar.setAttribute('id', 'btnCarritoCom');

    infoContainer.appendChild(title);
    infoContainer.appendChild(price);
    infoContainer.appendChild(descripLarga);
    infoContainer.appendChild(material);
    infoContainer.appendChild(color);
    infoContainer.appendChild(buttonCarrito);
    infoContainer.appendChild(buttonComprar);

    detalle.appendChild(imgContainer);
    detalle.appendChild(infoContainer);

    return detalle;
}

///------------------------------------------------------

//IMPRIMIR 

function renderProducts(product) {
    //sirve para la seccion inicio
    if (contProdDet) {

        const detalle = createProductCard(product);
        contProdDet.appendChild(detalle);

        //sirve para seccion de ofertas 
    } else {
        console.warn('No se encontró ningun contenedor de productos');
    }
}

///------------------------------------------------------

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