const base1 = './asset/morning/',
    base2 = './asset/day/',
    base3 = './asset/evening/',
    base4 = './asset/night/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const body = document.querySelector('body'),
    prev = document.querySelector('#js-image-prev'),
    next = document.querySelector('#js-image-next');
let i = -1;

// Отображение картинки
function viewBgImage(src) {  
    const img = new Image();
    img.src = src;
    img.onload = () => {      
        body.style.backgroundImage = `url(${src})`;
    }; 
}

// Получение картинки (раз в час)
function getImage() {
    i++;
    const index = i % images.length,
        hour = (new Date).getHours(),
        currBase = (hour >= 0 && hour < 6) ? base4 :
                (hour >= 6 && hour < 12) ? base1 : 
                (hour >= 12 && hour < 18) ? base2 : base3,
        imageSrc = currBase + images[index];
    viewBgImage(imageSrc);
} 

// Смена картинки (вперед)
function getNext() {
    i++;
    const index = (i < 0 ? images.length + i % images.length : i % images.length),
        hour = (new Date).getHours(),
        currBase = (hour >= 0 && hour < 6) ? base4 :
                (hour >= 6 && hour < 12) ? base1 : 
                (hour >= 12 && hour < 18) ? base2 : base3,
        imageSrc = currBase + images[index];
    viewBgImage(imageSrc);
    next.disabled = true;
    setTimeout(function() { next.disabled = false }, 1000);
}

// Смена картинки (назад)
function getPrev() {
    i--;
    const index = (i < 0 ? images.length + i % images.length : i % images.length),
        hour = (new Date).getHours(),
        currBase = (hour >= 0 && hour < 6) ? base4 :
                (hour >= 6 && hour < 12) ? base1 : 
                (hour >= 12 && hour < 18) ? base2 : base3,
        imageSrc = currBase + images[index];
    viewBgImage(imageSrc);
    prev.disabled = true;
    setTimeout(function() { prev.disabled = false }, 1000);
}

// Установка изображения и задание периодичности обновления (раз в час)
function init() {
    getImage();
    setInterval(getImage, 3600000);
    next.addEventListener('click', getNext);
    prev.addEventListener('click', getPrev);
}

init();
