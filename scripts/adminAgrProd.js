//CONEXION CON AIRTABLE

const airtableConfig = {
    API_TOKEN: 'pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc',
    BASE_ID: 'appjgwL9EfmDSYv7l',
    TABLE_NAME: 'Table 1',
    get API_URL() {
        return `https://api.airtable.com/v0/${this.BASE_ID}/${this.TABLE_NAME}`;
    }
};



// AIR TABLE: PARA AGREGAR PRODUCTOS


const showAddModal = (mensaje) => {
    const modal = document.getElementById('modal-add-feedback');
    const msg = document.getElementById('modal-add-feedback-msg');
    if (modal && msg) {
        msg.textContent = mensaje;
        modal.showModal();
    }
};

const addToAirtable = async (product) => {
    const itemAirtable = {
        fields: product
    };

    try {
        const response = await fetch(airtableConfig.API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${airtableConfig.API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemAirtable)
        });
        if (response.ok) {
            showAddModal('El producto ha sido agregado a la base de datos.');
        } else {
            showAddModal('Hubo un error al agregar el producto.');
        }
        return response;
    } catch (error) {
        showAddModal('Error de red o servidor al intentar agregar el producto.');
        return null;
    }
}


///------------------------------------------------------

//ARR DONDE SE GUARDAN LOS PRODUCTOS DEL CARRITO

const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

//AIR TABLE: PARA LISTAR PRODUCTOS 
//PROFE


const getProducts = async () => {

    const response = await fetch(airtableConfig.API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${airtableConfig.API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log('data', data);

    const productsMaped = data.records.map(item => {
        return {
            id: item.fields.id,
            title: item.fields.title,
            description: item.fields.description,
            thumbnail: item.fields.thumbnail,
            price: item.fields.price
        };
    })
    console.log(productsMaped);
    renderProducts(productsMaped);
}


getProducts();

///------------------------------------------------------

//CREAR Y LLENAR CARDS

//localiza la etiqut que contendra los preductos
const contenedorProductos = document.querySelector('.product-container');
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
    img.setAttribute("onclick", "window.location.href = './detalleProducto.html?id=" + product.id + "'");

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

    //boton compra con carrito
    const button = document.createElement('button');
    button.textContent = 'Añadir al carrito';
    // button.setAttribute("onclick","window.location.href = './detalleProducto.html'")
    button.addEventListener('click', () => {
        const existe = cartProducts.find(p => p.title === product.title);
        if (!existe) {
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            //actualiza el LS 
            console.log('Producto agregado al carrito');
        }
    });

    //Añade todos los elementos CREADOS a la tarjeta
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    // card.appendChild(button);


    return card;
}

///------------------------------------------------------

//IMPRIMIR TARJETAS

// Verifica si los contenedores existen antes de usarlos
function renderProducts(list) {
    //sirve para la seccion inicio
    if (contenedorProductos) {
        list.forEach(product => {
            const card = createProductCard(product);
            contenedorProductos.appendChild(card);
        });
        //sirve para seccion de ofertas 
    } else if (contenedorOfertas) {

        list.forEach(product => {
            console.log(product.discountPercentage);

            if (product.discountPercentage > 15) {
                const card = createProductCard(product);
                contenedorOfertas.appendChild(card);
            }
        })
    } else {
        console.warn('No se encontró ningun contenedor de productos');
    }
}


///------------------------------------------------------

//AGREGAR PRODUCTOS DESDE EL FORMULARIO

document.getElementById('formAgrProduct').addEventListener('submit', function(e) {
    e.preventDefault();
    const newProduct = {
        title: document.getElementById('input-title').value,
        description: document.getElementById('input-description').value,
        thumbnail: document.getElementById('input-thumbnail').value,
        price: Number(document.getElementById('input-price').value)
    };
    addToAirtable(newProduct);

    getProducts(); 
    document.getElementById('formAgrProduct').reset();
});

///------------------------------------------------------

//CARGAR COMPONENTES

// Función para cargar componentes HEADER y FOOTER en todas las paginas.
async function loadComponent(componentName, elementId) {
    try {
        const response = await fetch(`../componentes/${componentName}.html`);
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