const quote = document.querySelector('.js-quote');

// Получение цитаты
async function getQuote() {  
    const url = `http://fucking-great-advice.ru/api/random`,
            res = await fetch(url),
            data = await res.json(); 
    quote.textContent = data.text;
}

// Поиск цитаты при запуске и смена при нажатии на нее
document.addEventListener('DOMContentLoaded', getQuote);
quote.addEventListener('click', getQuote);
