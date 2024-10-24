// carrito.js

let carrito = []; // Mantiene el estado

export function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}

export function removerDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1); // Elimina el producto del carrito
        actualizarCarrito(); // Actualiza el DOM después de la eliminación
    }
}

export function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = ''; // Limpia la lista antes de agregar los productos
    carrito.forEach((item, index) => {
        listaCarrito.innerHTML += `<li>${item.nombre} - $${item.precio.toFixed(2)} <button onclick="removerDelCarrito(${index})">Eliminar</button></li>`;
    });
}
