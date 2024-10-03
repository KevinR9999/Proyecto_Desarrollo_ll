const cartItems = [];
const cartContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir comportamiento predeterminado
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    cartItems.push({ name, price });
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1); // Eliminar el elemento del array en el índice dado
    updateCart();
}

function updateCart() {
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toLocaleString()}</span>
            <button class="remove-button" data-index="${index}">Eliminar</button>
        `;
        cartContainer.appendChild(cartItemElement);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toLocaleString();

    // Añadir eventos de click a los botones de eliminación
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = button.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

function sendToWhatsApp() {
    const itemsText = cartItems.map(item => `${item.name}: $${item.price.toLocaleString()}`).join('\n');
    const totalPrice = totalPriceElement.textContent;
    const message = `Hola me interesaria adquirir los siguientes productos:\n\n${itemsText}\n\nTotal: $${totalPrice}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=573137663929&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
