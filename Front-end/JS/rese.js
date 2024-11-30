// Función para determinar el avatar en función del nombre
function getAvatarByName(name) {
    const maleNames = ['juan', 'pedro', 'luis', 'carlos', 'josé', 'kevin', 'edwin', 'samuel'];
    const femaleNames = ['maría', 'ana', 'laura', 'carmen', 'sofía', 'carolina', 'sara', 'paula', 'sandra'];

    const nameLower = name.toLowerCase();

    if (maleNames.includes(nameLower)) {
        return 'https://i.pravatar.cc/50?img=12'; // Avatar masculino
    } else if (femaleNames.includes(nameLower)) {
        return 'https://i.pravatar.cc/50?img=47'; // Avatar femenino
    } else {
        return 'https://i.pravatar.cc/50?img=9'; // Avatar genérico
    }
}

// Manejar el almacenamiento y mostrar las reseñas
const form = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');
let editingIndex = null; // Variable para saber si estamos editando una reseña
let currentInvoiceId = null; // Variable para almacenar dinámicamente el id_fac

// Establecer el id_fac dinámicamente (esto puede venir desde el backend)
function setInvoiceId(id) {
    currentInvoiceId = id;
    console.log('ID de factura establecido:', currentInvoiceId);
}

// Cargar reseñas al inicio
document.addEventListener('DOMContentLoaded', function () {
    loadReviews();

    // Aquí establecemos el id_fac dinámicamente. 
    // Puedes obtener este valor desde el backend al cargar la página o por una API.
    fetch('obtener_factura_actual.php') // Cambia a la ruta que devuelva el id_fac
        .then(response => response.json())
        .then(data => {
            if (data.id_fac) {
                setInvoiceId(data.id_fac);
            } else {
                console.error('No se pudo obtener el id_fac');
            }
        })
        .catch(error => {
            console.error('Error al obtener el id_fac:', error);
        });
});

// Manejar el envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('review').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    if (!currentInvoiceId) {
        alert('No se ha establecido un ID de factura. Intenta recargar la página.');
        return;
    }

    const review = {
        id_fac: currentInvoiceId, // Usar el id_fac actual
        name,
        reviewText,
        rating
    };

    if (editingIndex !== null) {
        // Editar reseña existente
        updateReview(review, editingIndex);
    } else {
        // Guardar una nueva reseña
        saveReview(review);
        addReviewToPage(review);
    }

    form.reset();
    editingIndex = null; // Reiniciar el estado de edición
});

// Guardar reseña en el servidor
function saveReview(review) {
    const data = {
        id_fac: review.id_fac,
        nombre: review.name,
        resena: review.reviewText,
        calificacion: review.rating,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' ') // Formato YYYY-MM-DD HH:MM:SS
    };

    console.log('Enviando datos:', data);

    fetch('guardar_resena.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Reseña guardada') {
                console.log('Reseña guardada con éxito.');
                loadReviews(); // Recargar las reseñas después de guardar
            } else {
                alert('Error al guardar la reseña: ' + (data.error || 'Desconocido'));
            }
        })
        .catch(error => {
            console.error('Error al guardar la reseña:', error);
        });
}

// Cargar reseñas desde el servidor
function loadReviews() {
    fetch('../../Back-end/guardar_resena.php') // Cambia la ruta según sea necesario
        .then(response => response.json())
        .then(data => {
            reviewList.innerHTML = ''; // Limpiar la lista de reseñas
            data.resenas.forEach((review, index) => addReviewToPage(review, index));
        })
        .catch(error => {
            console.error('Error al cargar las reseñas:', error);
        });
}

// Agregar reseña al DOM
function addReviewToPage(review, index) {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    const avatarImg = document.createElement('img');
    avatarImg.src = getAvatarByName(review.nombre);
    avatarImg.alt = 'Avatar';
    avatarImg.classList.add('avatar');

    const reviewContent = document.createElement('div');

    const reviewTitle = document.createElement('h3');
    reviewTitle.textContent = review.nombre;

    // Crear las estrellas visuales
    const stars = document.createElement('div');
    stars.classList.add('stars-display');
    const starCount = review.calificacion;
    for (let i = 0; i < starCount; i++) {
        stars.innerHTML += '&#9733;'; // Estrella dorada
    }
    for (let i = starCount; i < 5; i++) {
        stars.innerHTML += '&#9734;'; // Estrella vacía
    }

    const reviewBody = document.createElement('p');
    reviewBody.textContent = review.resena;

    reviewContent.appendChild(reviewTitle);
    reviewContent.appendChild(stars);
    reviewContent.appendChild(reviewBody);

    reviewItem.appendChild(avatarImg); // Añadir el avatar
    reviewItem.appendChild(reviewContent);

    reviewList.appendChild(reviewItem);
}
