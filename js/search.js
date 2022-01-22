const search = document.querySelector('#js-search');
const searchInput = search.querySelector('input');

// Нажатие на кнопку поиска
search.addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = `https://www.google.by/search?q=${searchInput.value}`;
    searchInput.value = '';
    return false;
});