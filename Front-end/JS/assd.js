let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total');
    const contadorProductos = document.getElementById('contador-productos');

    listaCarrito.innerHTML = '';
    carrito.forEach((item, index) => {
        listaCarrito.innerHTML += `<li>${item.nombre} - $${item.precio.toFixed(3)} <button onclick="removerDelCarrito(${index})"><i class="fas fa-trash-alt"></i></button></li>`;
    });

    totalCarrito.innerText = total.toFixed(3);
    contadorProductos.innerText = carrito.length;
}

function removerDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function toggleCarrito() {
    const carritoDropdown = document.getElementById('carrito-dropdown');
    carritoDropdown.classList.toggle('visible'); // Agrega o quita la clase 'visible'
}

function generarFacturaPDF() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Obtener datos del cliente
    const nombreCliente = document.getElementById('nombre-cliente').value || "Sin nombre";
    const direccionCliente = document.getElementById('direccion-cliente').value || "Sin dirección";

    // Generar ID único para la factura
    const idFactura = `#${Math.floor(Math.random() * 100000)}`; // Genera un ID aleatorio
    const fecha = new Date().toLocaleDateString(); // Obtener la fecha actual

    // Estilos
    const titleFontSize = 22;
    const headerFontSize = 18;
    const bodyFontSize = 12;

    // Título de la factura
    doc.setFontSize(titleFontSize);
    doc.setFont('helvetica', 'bold');
    doc.text('Factura de Compra', 20, 20);
    
    // Información del cliente
    doc.setFontSize(headerFontSize);
    doc.text('Detalles del Cliente:', 20, 40);
    doc.setFontSize(bodyFontSize);
    doc.text(`Nombre: ${nombreCliente}`, 20, 50); 
    doc.text(`Dirección: ${direccionCliente}`, 20, 55); 
    doc.text(`ID Factura: ${idFactura}`, 20, 60); // ID de la factura
    doc.text(`Fecha: ${fecha}`, 20, 65); // Fecha de la factura

    // Espacio entre la información del cliente y la tabla
    doc.text('', 20, 70);

    // Cabecera de la tabla
    doc.setFontSize(headerFontSize);
    doc.setFillColor(0, 102, 204); // Color de fondo
    doc.rect(20, 75, 170, 10, 'F'); // Dibuja el fondo azul para la cabecera
    doc.setTextColor(255); // Color del texto en blanco
    doc.text('Producto', 25, 80);
    doc.text('Precio', 145, 80);
    
    // Restablecer el color de texto
    doc.setTextColor(0); // Color de texto negro

    // Cuerpo de la tabla
    doc.setFontSize(bodyFontSize);
    carrito.forEach((item, index) => {
        doc.text(item.nombre, 25, 90 + index * 10);
        doc.text(`$${item.precio.toFixed(2)}`, 145, 90 + index * 10);
    });

    // Total
    const totalYPosition = 90 + carrito.length * 10;
    doc.setFontSize(headerFontSize);
    doc.text(`Total: $${total.toFixed(2)}`, 20, totalYPosition + 10);

    // Descargar el PDF
    doc.save(`factura-${idFactura}.pdf`);
}

function realizarCompra() {
    console.log("Función realizarCompra se está ejecutando");

    // Obtener los datos del cliente
    const nombreCliente = document.getElementById("nombre-cliente").value;
    const direccionCliente = document.getElementById("direccion-cliente").value;
    const total = document.getElementById("total").innerText;

    // Verifica si los campos están llenos antes de proceder
    if (!nombreCliente || !direccionCliente) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Obtener los productos del carrito de manera eficiente
    const listaCarrito = document.getElementById("lista-carrito").children;
    let productos = Array.from(listaCarrito).map(item => item.innerText).join("\n");

    // Crear el mensaje para WhatsApp
    const mensaje = `Nombre del Cliente: ${nombreCliente}\n` +
                    `Dirección del Cliente: ${direccionCliente}\n` +
                    `Productos:\n${productos}\n` +
                    `Total: $${total}`;

    // Codificar el mensaje para la URL
    const mensajeEncoded = encodeURIComponent(mensaje);

    // Número de WhatsApp (en formato internacional)
    const numeroTelefono = "573137663929";  // Cambia este número por tu número de WhatsApp

    // Crear la URL de WhatsApp con el número de teléfono y el mensaje
    const whatsappURL = `https://wa.me/573137663929?text=Hola%2C%20estoy%20interesado%20en%20tus%20productos.${mensajeEncoded}`;

    // Enviar datos al archivo PHP para guardar en la base de datos
    const data = {
        nombre_cliente: nombreCliente,
        direccion_cliente: direccionCliente,
        productos: productos,
        total: total
    };

    fetch('compra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Ver la respuesta del servidor
        // Abrir WhatsApp después de guardar en la base de datos
        window.open(whatsappURL, '_blank');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

/*codigo para subir a git*/

function cancelarCompra() {
    // Vaciar la lista del carrito
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    // Restablecer el total a 0
    const total = document.getElementById('total');
    total.textContent = '0.00';

    // Restablecer el contador de productos a 0
    const contadorProductos = document.getElementById('contador-productos');
    contadorProductos.textContent = '0';

    // Limpiar los campos de nombre y dirección del cliente
    document.getElementById('nombre-cliente').value = '';
    document.getElementById('direccion-cliente').value = '';

    alert('Compra cancelada y carrito vaciado.');
}
