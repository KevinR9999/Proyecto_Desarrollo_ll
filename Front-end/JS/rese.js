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

document.addEventListener('DOMContentLoaded', loadReviews);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('review').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    const review = {
        name,
        reviewText,
        rating
    };

    if (editingIndex !== null) {
        // Si estamos editando una reseña existente
        updateReview(review, editingIndex);
    } else {
        // Si estamos agregando una nueva reseña
        saveReview(review);
        addReviewToPage(review);
    }

    form.reset();
    editingIndex = null; // Reiniciamos el índice de edición
});

function saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach((review, index) => addReviewToPage(review, index));
}

function addReviewToPage(review, index) {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    const avatarImg = document.createElement('img');
    avatarImg.src = getAvatarByName(review.name);
    avatarImg.alt = 'Avatar';
    avatarImg.classList.add('avatar');

    const reviewContent = document.createElement('div');

    const reviewTitle = document.createElement('h3');
    reviewTitle.textContent = review.name;

    // Crear las estrellas visuales
    const stars = document.createElement('div');
    stars.classList.add('stars-display');
    const starCount = parseInt(review.rating);
    for (let i = 0; i < starCount; i++) {
        stars.innerHTML += '&#9733;'; // Estrella dorada
    }
    for (let i = starCount; i < 5; i++) {
        stars.innerHTML += '&#9734;'; // Estrella vacía
    }

    const reviewBody = document.createElement('p');
    reviewBody.textContent = review.reviewText;

    // Botón de borrar
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.onclick = function() {
        deleteReview(index);
    };

    // Botón de editar
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = function() {
        loadReviewToForm(review, index);
    };

    reviewContent.appendChild(reviewTitle);
    reviewContent.appendChild(stars);
    reviewContent.appendChild(reviewBody);

    reviewItem.appendChild(avatarImg);  // Añadir el avatar
    reviewItem.appendChild(reviewContent);
    reviewItem.appendChild(editBtn);    // Añadir el botón de editar
    reviewItem.appendChild(deleteBtn);  // Añadir el botón de borrar

    reviewList.appendChild(reviewItem);
}

function deleteReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.splice(index, 1); // Elimina la reseña del array
    localStorage.setItem('reviews', JSON.stringify(reviews)); // Actualiza localStorage
    reviewList.innerHTML = ''; // Limpia la lista
    loadReviews(); // Recarga la lista actualizada de reseñas
}

function loadReviewToForm(review, index) {
    document.getElementById('name').value = review.name;
    document.getElementById('review').value = review.reviewText;
    document.querySelector(`input[name="rating"][value="${review.rating}"]`).checked = true;
    editingIndex = index; // Establece el índice de edición
}

function updateReview(updatedReview, index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews[index] = updatedReview; // Actualiza la reseña en el índice correspondiente
    localStorage.setItem('reviews', JSON.stringify(reviews)); // Guarda en localStorage
    reviewList.innerHTML = ''; // Limpia la lista
    loadReviews(); // Recarga las reseñas actualizadas
}
