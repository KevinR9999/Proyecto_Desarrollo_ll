import { agregarAlCarrito, removerDelCarrito } from './carrito';

beforeEach(() => {
    document.body.innerHTML = `
        <ul id="lista-carrito"></ul>
    `;
});

test('debería agregar un producto al carrito', () => {
    agregarAlCarrito({ nombre: 'DETERGENTE LÍQUIDO ROPA CLÁSICA TANTE', precio: 14 });
    const listaCarrito = document.getElementById('lista-carrito');
    expect(listaCarrito.innerHTML).toContain('DETERGENTE LÍQUIDO ROPA CLÁSICA TANTE'); // Verifica que el producto se haya agregado
});

test('debería remover un producto del carrito', () => {
    agregarAlCarrito({ nombre: 'Producto 1', precio: 10 }); // Agrega un producto
    removerDelCarrito(0); // Elimina el primer producto
    const listaCarrito = document.getElementById('lista-carrito');
    expect(listaCarrito.innerHTML).not.toContain('DETERGENTE LÍQUIDO ROPA CLÁSICA TANTE'); // Verifica que el producto ya no esté
});
