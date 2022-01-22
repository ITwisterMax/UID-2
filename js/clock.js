const clock = document.querySelector(".js-clock"),
    date = document.querySelector(".js-date");

// Получение дня недели
function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return days[date];
}

// Получение месяца
function getMonthName(month) {
    let names = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    return names[month];
}

// Получение и вывод времени
function getTime() {
    let currentTime = new Date(),
        currentDate = currentTime.getDay(),
        currentDay = currentTime.getDate(),
        currentMonth = currentTime.getMonth(),
        currentHour = currentTime.getHours(),
        currentMinutes = currentTime.getMinutes(),
        currentSeconds = currentTime.getSeconds();

    // Вывод даты
    date.innerHTML = `${getWeekDay(currentDate)}, ${currentDay} ${getMonthName(currentMonth)}`;
    
    // Вывод времени
    clock.innerHTML = `${(currentHour < 10) ? `0${currentHour}` : currentHour }:${
        (currentMinutes < 10) ? `0${currentMinutes}` : currentMinutes }:${
        (currentSeconds < 10) ? `0${currentSeconds}` : currentSeconds }`;
}

// Установка времени и задание периодичности обновления (раз в секунду)
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();