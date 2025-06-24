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
      id: item.id,
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

//ELIMINAR PRODUCTOS


// prueba de modal nativo (dialog)
function showNativeDeleteModal() {
  return new Promise((resolve) => {
    const dialog = document.getElementById('modal-confirm-delete');
    if (!dialog) return resolve(false);
    dialog.returnValue = '';
    dialog.showModal();

    function onClose() {
      resolve(dialog.returnValue === 'yes');
      dialog.removeEventListener('close', onClose);
    }
    dialog.addEventListener('close', onClose);
  });
}

function showDeleteFeedbackModal(mensaje) {
  const modal = document.getElementById('modal-delete-feedback');
  const msg = document.getElementById('modal-delete-feedback-msg');
  if (modal && msg) {
    msg.textContent = mensaje;
    modal.showModal();
  }
}

const deleteProduct = async (productId, rowElement) => {
  const confirmDelete = await showNativeDeleteModal();
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      showDeleteFeedbackModal("Producto eliminado con éxito.");
      rowElement.remove(); 
    } else {
      showDeleteFeedbackModal("Hubo un error al eliminar el producto.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    showDeleteFeedbackModal("Error de red o servidor al intentar eliminar.");
  }
};


///------------------------------------------------------


const contenedorProdAdmin = document.querySelector(".ProductosAdminTable");

function createProductTable(product) {

  const filaItems = document.createElement("tr");
  filaItems.classList.add("filaProdAdmin");
  const titleItem = document.createElement("td");
  titleItem.textContent = product.title;
  titleItem.classList.add("tituloProd");

  const priceItem = document.createElement("td");
  priceItem.textContent = `$${product.price.toLocaleString('es-AR')}`;
  priceItem.classList.add("precioProd");

  // const imgItem = document.createElement("td");
  // imgItem.src = product.thumbnail;
  // imgItem.classList.add("imgProd");

  const btnEditItem = document.createElement("button");
  btnEditItem.textContent = "Editar";
  btnEditItem.classList.add("btnEditProd");
  btnEditItem.addEventListener('click', () => {
    window.location.href = `../admin/editProductos.html?id=${product.id}`;
  })

  const btnDeteleItem = document.createElement("button");
  btnDeteleItem.textContent = "Eliminar";
  btnDeteleItem.classList.add("btnDeleteProd");
  btnDeteleItem.addEventListener('click', () => {
    deleteProduct(product.id, filaItems);
  });
  // btnDeteleItem.addEventListener('click', () => {
  //       window.location.href = `../admin/deleteProductos.html?id=${product.id}`;
  //   })




  const accionesItem = document.createElement("td");
  accionesItem.classList.add("accionesProd");
  accionesItem.appendChild(btnEditItem);
  accionesItem.appendChild(btnDeteleItem);

  filaItems.appendChild(titleItem);
  filaItems.appendChild(priceItem);
  filaItems.appendChild(accionesItem);

  return filaItems;
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
