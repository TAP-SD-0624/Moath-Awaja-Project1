// favorite.js

// Function to initialize favorite button
function initializeFavoriteButton() {
    const favButton = document.querySelector('.addToFavoriteBtn');
    const favHeart = document.querySelector('.favHeart');
    const topicId = favButton.dataset.id;
    const topicTitle = favButton.dataset.title;
    const topicImage = favButton.dataset.image;
    const topicRating = favButton.dataset.rating;

    // Check if the item is already in favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let isFavorite = favorites.some(fav => fav.id === topicId);

    if (isFavorite) {
        favButton.textContent = 'Remove from Favorites';
        favHeart.setAttribute('name', 'heart');
        favHeart.style.color = 'var(--heart-color)';
    }

    // Toggle favorite status
    favButton.addEventListener('click', function () {
        favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        isFavorite = favorites.some(fav => fav.id === topicId);

        if (isFavorite) {
            // Remove from favorites
            favorites = favorites.filter(fav => fav.id !== topicId);
            favButton.textContent = 'Add to Favorites';
            favHeart.setAttribute('name', 'heart-outline');
            favHeart.style.color = 'white';
        } else {
            // Add to favorites
            favorites.push({ id: topicId, title: topicTitle, image: topicImage, rating: topicRating });
            favButton.textContent = 'Remove from Favorites';
            favHeart.setAttribute('name', 'heart');
            favHeart.style.color = 'var(--heart-color)';
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

// Export the function so it can be imported in other files
export { initializeFavoriteButton };
