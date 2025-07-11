//CONEXION CON AIRTABLE

const airtableConfig = {
  API_TOKEN: "pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc",
  BASE_ID: "appjgwL9EfmDSYv7l",
  TABLE_NAME: "Table 1",
  get API_URL() {
    return `https://api.airtable.com/v0/${this.BASE_ID}/${this.TABLE_NAME}`;
  }
};

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

///------------------------------------------------------

///CARGAR PRODUCTO AL INICIAR LA PÁGINA


// Cargar producto al iniciar la página
document.addEventListener('DOMContentLoaded', () => {

    console.log("id de producto: " + productId)

    if(productId) {
        fetch(`${airtableConfig.API_URL}/${productId}`, {
            headers: {
                'Authorization': `Bearer ${airtableConfig.API_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error) {
                console.log('Producto cargado:', data);
                document.querySelector('#product-title').value = data.fields.title || '';
                document.querySelector('#product-price').value = data.fields.price || '';
                document.querySelector('#product-description').value = data.fields.description || '';
                document.querySelector('#product-thumbnail').value = data.fields.thumbnail || '';
                document.querySelector('#product-material').value = data.fields.material || '';
                document.querySelector('#product-color').value = data.fields.color || '';
                document.querySelector('#product-dest').value = data.fields.prodDestacado || '';
                document.querySelector('#product-descripLarga').value = data.fields.descripLarga || '';
            }
        })
        .catch(error => console.error('Error cargando producto:', error));
    }
});

///------------------------------------------------------

///MODAL DE CONFIRMACIÓN

function showEditModal(mensaje, callback) {
    const modal = document.getElementById('modal-edit-feedback');
    const msg = document.getElementById('modal-edit-feedback-msg');
    if (modal && msg) {
        msg.textContent = mensaje;
        modal.showModal();
        modal.addEventListener('close', function handler() {
            modal.removeEventListener('close', handler);
            if (typeof callback === 'function') callback();
        });
    }
}

function updateSubmit(event){
    event.preventDefault();
    
    if(!productId) {
        showEditModal('No se especificó ID de producto');
        return;
    }

    const title = document.querySelector('#product-title').value.trim();
    const price = parseFloat(document.querySelector('#product-price').value);
    const description = document.querySelector('#product-description').value.trim();
    const thumbnail = document.querySelector('#product-thumbnail').value.trim();
    const material = document.querySelector('#product-material').value.trim();
    const color = document.querySelector('#product-color').value.trim(); 
    const prodDestacado = document.querySelector('#product-dest').value.trim(); 
    const descripLarga = document.querySelector('#product-descripLarga').value.trim();  
    
    // Validar campos requeridos

    if(!title || isNaN(price)) {
        showEditModal('Título y precio son campos requeridos. El precio debe ser numérico.');
        return;
    }

    const product = {
        title: title,
        price: price,
        description: description,
        thumbnail: thumbnail,
        material: material,
        color: color,
        prodDestacado: prodDestacado,
        descripLarga: descripLarga
    };

    //BODY DEL PRODUCTO
    const itemAirtable = {
        fields: product
    };

    fetch(`${airtableConfig.API_URL}/${productId}`, {
        method: 'PATCH',
        headers:{
            'Authorization': `Bearer ${airtableConfig.API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    })
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            console.error('Error detallado:', data);
            showEditModal(`Error al actualizar (${data.error.type}): ${data.error.message}`);
        } else {
            showEditModal('Producto actualizado correctamente', () => {
                window.location.href = '../admin/listEditProductos.html';
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showEditModal('Error al actualizar el producto');
    });
}
