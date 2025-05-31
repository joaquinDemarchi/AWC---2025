//CONEXION CON AIRTABLE

const API_TOKEN =
  "pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc";
const BASE_ID = "appjgwL9EfmDSYv7l";
const TABLE_NAME = "Table 1";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const contenedorProductos = document.querySelector(".product-container");
const contenedorOfertas = document.querySelector(".ofertas-container");

//CARGAR PRODCTOS

const products = [];

const searchInput = document.querySelector(".search-input");

const getProducts = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("data", data);

  const productsMaped = data.records.map((item) => {
    return {
      title: item.fields.title,
      description: item.fields.description,
      thumbnail: item.fields.thumbnail,
      price: item.fields.price,
    };
  });
  console.log(productsMaped);

  //FILTRO DE PRODUCTOS

  function filterProducts(text) {
    const filteredProducts = productsMaped.filter((product) => {
      console.log(
        "prod friltrado" +
          product.title.toLowerCase().includes(text.toLowerCase())
      );
      return product.title.toLowerCase().includes(text.toLowerCase());

      //&& (product.deliveryFree === deliveryFreeCheckBox.checked || !deliveryFreeCheckBox.checked);
    });

    contenedorProductos.innerHTML = "";
    renderProducts(filteredProducts);
  }

  searchInput.addEventListener("input", (e) => {
    filterProducts(e.target.value);
  });

  //rededriza por defecto los productos
  if (contenedorProductos) {
    renderProducts(productsMaped);
  } else {
    console.warn("No se encontró el contenedor de productos");
  }
};

getProducts();

///------------------------------------------------------

//CREAR Y LLENAR CARDS

//localiza la etiqut que contendra los preductos

function createProductCard(product) {
  //crea CARD produto
  const card = document.createElement("article");
  card.classList.add("producto");

  //va creando los elementos de la tarjeta:

  //imagen
  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;
  img.setAttribute(
    "onclick",
    "window.location.href = './detalleProducto.html'"
  );

  //titulo
  const title = document.createElement("h3");
  title.textContent = product.title;

  //descrip
  const description = document.createElement("p");
  description.textContent =
    "Aqui va la descripcion del producto. Debe tener un numero de caracteres determminado";

  //precio
  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  price.classList.add("precioProd");

  //boton compra
  const button = document.createElement("button");
  button.textContent = "Comprar";
  button.setAttribute(
    "onclick",
    "window.location.href = './detalleProducto.html'"
  );

  //Añade todos los elementos CREADOS a la tarjeta
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  //card.appendChild(button);

  return card;
}

// Verifica si los contenedores existen antes de usarlos
function renderProducts(list) {
  //sirve para la seccion inicio
  if (contenedorProductos) {
    list.forEach((product) => {
      const card = createProductCard(product);
      contenedorProductos.appendChild(card);
    });
    //sirve para seccion de ofertas
  } else if (contenedorOfertas) {
    list.forEach((product) => {
      console.log(product.discountPercentage);

      if (product.discountPercentage > 15) {
        const card = createProductCard(product);
        contenedorOfertas.appendChild(card);
      }
    });
  } else {
    console.warn("No se encontró ningun contenedor de productos");
  }
}
