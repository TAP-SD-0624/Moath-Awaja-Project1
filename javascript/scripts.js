// Function to create a card
function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => {
        window.location.href = `./public/Topics/topics.html?id=${item.id}`;
    });

    const img = document.createElement('img');
    img.src = `/Logos/${item.image}`;
    img.alt = item.topic;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const h4 = document.createElement('h4');
    h4.textContent = `${item.category} ${item.topic}`;

    const author = document.createElement('p');
    author.textContent = `Author: ${item.name}`;

    const stars = document.createElement('p');
    stars.classList.add('stars');
    stars.innerHTML = generateStars(item.rating);

    cardContent.appendChild(h4);
    cardContent.appendChild(author);
    cardContent.appendChild(stars);
    card.appendChild(img);
    card.appendChild(cardContent);

    return card;
}

// Function to render cards
function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Clear the container
    data.forEach(item => {
        const card = createCard(item);
        container.appendChild(card);
    });
    document.getElementById('topics-count').textContent = `"${data.length}" Web Topics Found`;
}
function displayFavorites() {
    const favContainer = document.getElementById('fav-cards-container');
    favContainer.innerHTML = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favorites.forEach(fav => {
        const card = document.createElement('div');
        card.classList.add('fav-card');

        const img = document.createElement('img');
        img.src = fav.image;
        img.alt = fav.title;

        const title = document.createElement('h2');
        title.textContent = fav.title;

        const rating = document.createElement('p');
        rating.classList.add('stars');
        rating.innerHTML = generateStars(fav.rating);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(rating);

        favContainer.appendChild(card);
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return `${'<ion-icon name="star"></ion-icon>'.repeat(fullStars)}
            ${'<ion-icon name="star-half"></ion-icon>'.repeat(halfStars)}
            ${'<ion-icon name="star-outline"></ion-icon>'.repeat(emptyStars)}`;
}

// Event listener to toggle favorite section
document.getElementById("fav-button").addEventListener('click', function () {
    document.querySelector('.fav').classList.toggle('hidden');
    displayFavorites();
});

// Initial fetch and render
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        window.allData = data;
        renderCards(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Search bar event listener
document.querySelector('.search-bar').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredData = window.allData.filter(item =>
        (item.topic && item.topic.toLowerCase().includes(query)) ||
        (item.category && item.category.toLowerCase().includes(query)) ||
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
    );
    renderCards(filteredData);
});
