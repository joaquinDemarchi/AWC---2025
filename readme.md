# APLICACION WEB CLIENTE
### ISTEA 

Profesor : Manuel Fondovila

##### Mi proyecto es una pagina de venta de productos. Consta de una pagina principal en la cual se exponen los productos destacados como asi tambien un banner que promociona algunos de los productos de la pagina. Tambien contine secciones de Contacto y Nosotros en los cuales el usuario podra conocer un poco mas acerca de la empresa y/o comunicarse con ella. Y por ultimo, tendra un apartado especifico para que el usuariuo pueda visualizar de manera mas rapida y comoda aquelllas "Ofertas impérdibles" de la web. 


### CREDENCIALES - ADMINITRADOR 

Correo: admin@gmail.com

Contraseña: admin 

# Presentación del Proyecto: Tienda Online

Este proyecto consiste en el desarrollo de una tienda online moderna, responsiva y funcional, creada con **HTML**, **CSS** y **JavaScript**. El objetivo principal es ofrecer una experiencia de usuario atractiva y eficiente tanto para clientes como para administradores, permitiendo la gestión y visualización de productos, el manejo de un carrito de compras y la administración de inventario, todo integrado con una base de datos en la nube (**Airtable**).

---

## Características principales

### Catálogo de productos
Los productos se obtienen dinámicamente desde **Airtable** y se muestran en tarjetas visuales, con imágenes, descripciones, precios y detalles relevantes. El usuario puede navegar por productos destacados, ofertas y realizar búsquedas en tiempo real.

### Detalle de producto
Cada producto cuenta con una página de detalle donde se visualiza información ampliada, materiales, colores y opciones para añadir al carrito o comprar directamente.

### Carrito de compras
El usuario puede agregar productos al carrito, modificar cantidades y finalizar la compra. El estado del carrito se almacena en **localStorage** para mantener la persistencia entre sesiones.

### Administración de productos
Incluye un panel de administración protegido, donde se pueden agregar, editar y eliminar productos de la base de datos. Todas las acciones administrativas muestran confirmaciones y mensajes de éxito/error mediante **modales nativos**, mejorando la experiencia y evitando alertas intrusivas.

### Login y autenticación básica
El sistema cuenta con una página de login. Si el usuario ingresa como “ADMIN”, accede a la sección de administración; de lo contrario, es redirigido a la tienda principal.

### Componentes reutilizables
El **header** y el **footer** se cargan dinámicamente en todas las páginas, asegurando coherencia visual y facilitando el mantenimiento.

### Diseño responsivo
El sitio se adapta a dispositivos móviles, tablets y escritorio, ajustando tamaños de fuentes, tarjetas y menús para una experiencia óptima en cualquier pantalla.

### Efectos visuales y feedback
Se utilizan efectos visuales en botones, animaciones al agregar productos al carrito y modales nativos para confirmaciones y mensajes, brindando una interacción moderna y profesional.

---

## Estructura del proyecto

### HTML
Páginas principales:

- `index.html`
- `productos.html`
- `detalleProducto.html`
- `carrito.html`
- `login.html`

Secciones administrativas:

- `agrProductos.html`
- `listEditProductos.html`
- `editProductos.html`

### CSS
Un archivo centralizado: `styles.css`  
Define la paleta de colores, estilos de componentes, media queries y estilos específicos para modales y formularios.

### JavaScript
Scripts modulares para cada funcionalidad:

- `app.js`
- `productos.js`
- `detalleProductos.js`
- `carrito.js`, etc.

Scripts de administración para agregar, editar y eliminar productos, integrados con **Airtable**.  
Uso de **modales nativos** para feedback y confirmaciones.

### Integración con Airtable
Toda la gestión de productos (listado, alta, edición y baja) se realiza mediante la **API de Airtable**, facilitando la administración y escalabilidad del inventario.

---

## Experiencia de usuario

El usuario puede navegar fácilmente por el catálogo, buscar productos, ver detalles, agregar al carrito y finalizar la compra. Los administradores pueden gestionar el inventario de manera intuitiva y segura, con confirmaciones visuales y sin recargar la página.

---

Este proyecto es una **base sólida** para una tienda online real, fácilmente ampliable con nuevas funcionalidades como pasarelas de pago, autenticación avanzada o reportes de ventas. Su estructura modular y buenas prácticas de desarrollo lo hacen ideal para **aprendizaje**, **presentación profesional** o como **punto de partida para proyectos comerciales**.
