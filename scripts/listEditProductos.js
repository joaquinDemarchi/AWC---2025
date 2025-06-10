//CONEXION CON AIRTABLE

const API_TOKEN =
  "pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc";
const BASE_ID = "appjgwL9EfmDSYv7l";
const TABLE_NAME = "Table 1";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


//CARGAR PRODCTOS

const getProducts = async () => {

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
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

const contenedorProdAdmin = document.querySelector(".ProductosAdmin");

//localiza la etiqut que contendra los preductos

const tabla = document.createElement("table");
  tabla.classList.add("tablaProdAdmin");


  const caption = document.createElement("caption");
  caption.classList.add("tablaTitulo"); 
  caption.textContent = "Productos de la tabla";


  const tituColumnas = document.createElement("thead");
  tituColumnas.textContent = product.title;
  const filaTituCol = document.createElement("tr")

  tituColumnas.appendChild(filaTituCol);

  const columnaTitulo = document.createElement("th");
  columnaTitulo.textContent = "Titulo";   
  filaTituCol.appendChild(columnaTitulo);

  const columnaPrecio = document.createElement("th");
  columnaPrecio.textContent = "Precio";
  filaTituCol.appendChild(columnaPrecio);
  
  const columnaImagen = document.createElement("th");
  columnaImagen.textContent = "Imagen";
  filaTituCol.appendChild(columnaImagen);
  
  // const columnaDescrip = document.createElement("th");
  // columnaDescrip.textContent = "Descripcion";
  // filaTituCol.appendChild(columnaDescrip);

  const filaItems = document.createElement("tr");
  filaItems.textContent = "Acciones";
  tabla.appendChild(filaItems);

function createProductTable(product) {

  const titleItem = document.createElement("td");
  titleItem.textContent = product.title; 
  filaItems.appendChild(titleItem);

  const priceItem = document.createElement("td");
  priceItem.textContent = `$${product.price}`;
  priceItem.classList.add("precioProd");
  filaItems.appendChild(priceItem);

  const imgItem = document.createElement("td");
  imgItem.src = product.thumbnail;
  filaItems.appendChild(imgItem);

  const btnEditItem = document.createElement("button");
  btnEditItem.textContent = "Editar";
  button.setAttribute(
    "onclick",
    "window.location.href = './editProductos.html'"
  );
  filaItems.appendChild(btnEditItem);



  return tabla;
}

// Verifica si los contenedores existen antes de usarlos
function renderProducts(listProducts) {
  //sirve para la seccion inicio
  if (contenedorProdAdmin) {
    listProducts.forEach((product) => {
      const row = createProductTable(product);
      contenedorProdAdmin.appendChild(row);
    });
    //sirve para seccion de ofertas
  } else {
    console.warn("No se encontró ningun contenedor de productos");
  }
}
