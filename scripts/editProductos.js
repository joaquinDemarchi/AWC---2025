const API_TOKEN =
  "pat1zbngnWnO44ote.0cb2e3270022c524de4ea273621ddf0c09bd9855d72871213a3744771827e4bc";
const BASE_ID = "appjgwL9EfmDSYv7l";
const TABLE_NAME = "Table 1";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
        
let productId = null
// Cargar producto al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log("id de producto: " + productId)

    
    if(productId) {
        fetch(`${API_URL}/${productId}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
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
            }
        })
        .catch(error => console.error('Error cargando producto:', error));
    }
});

function updateSubmit(event){
    event.preventDefault();
    
    // Obtener ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if(!productId) {
        alert('No se especificó ID de producto');
        return;
    }

    // Validar campos requeridos
    const title = document.querySelector('#product-title').value.trim();
    const price = parseFloat(document.querySelector('#product-price').value);
    const description = document.querySelector('#product-description').value.trim();
    const thumbnail = document.querySelector('#product-thumbnail').value.trim();

    if(!title || isNaN(price)) {
        alert('Título y precio son campos requeridos. El precio debe ser numérico.');
        return;
    }

    const product = {
        title: title,
        price: price,
        description: description,
        thumbnail: thumbnail
    };

    const itemAirtable = {
        fields: product
    };

    fetch(`${API_URL}/${productId}`, {
        method: 'PATCH',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    })
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            console.error('Error detallado:', data);
            alert(`Error al actualizar (${data.error.type}): ${data.error.message}`);
        } else {
            alert('Producto actualizado correctamente');
            window.location.href = '../admin/listEditProductos.html'; // Redirigir a la lista de productos
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el producto');
    });
}
