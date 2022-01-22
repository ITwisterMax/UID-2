const nameInputForm = document.querySelector('.js-name'),
    input = nameInputForm.querySelector('input'),
    greetingUser = document.querySelector('.js-user'),
    todoForm = document.querySelector('.js-todo');


// Сохранение имени пользователя
function saveUser(user) {
    localStorage.setItem('currentUser', user);
}

// Нажатие кнопки отправки
function handleNameInputFormSubmit(e) {
    e.preventDefault();
    if (input.value === '') {
        alert("Ошибка! Имя пусто.");
        return;
    }
    painting(input.value);
    saveUser(input.value);
}

// Нажатие кнопки отправки при введении нового пользователя
function handleUserSubmit(e) {
    e.preventDefault();
    const inputUserName = document.querySelector('.inputUserName');
    const user = localStorage.getItem('currentUser');
    const userValue =  inputUserName.value.replace(/(^\s*)|(\s*$)/g, "") ;
    if( userValue === '') {
        createUser(user);
    } else {
        createUser(userValue);
        saveUser(userValue);
    }
    inputUserName.remove();
}

// Нажатие на поле ввода имени пользователя
function handleuserClick() {
    const userName = greetingUser.querySelector('.userName');
    createNewUserName();
    userName.remove();
}

// Добавление формы с главной целью на сегодня
function createTodoForm() {
    todoForm.classList.remove('hiding');
}

// Вывод приветствия
function createGreeting() {
    const greeting = document.createElement('span');
    const hour = (new Date).getHours();
    greeting.innerHTML = `${(hour >= 0 && hour < 6) ? `Доброй ночи` :
    (hour >= 6 && hour < 12) ? `Доброе утро` : 
    (hour >= 12 && hour < 18) ? `Добрый день` :
    (hour >= 18 && hour < 24) ? `Добрый вечер` : '' }, `;
    greetingUser.prepend(greeting);
}

// Создание нового имени пользователя
function createNewUserName() {
    const greeting = greetingUser.querySelector('span');
    const form = document.createElement('form');
    const inputUserName = document.createElement('input');
    inputUserName.value = '';

    form.className ="inline";
    inputUserName.className = 'inputUserName';
    greeting.appendChild(form);
    form.appendChild(inputUserName);
    form.addEventListener('submit', handleUserSubmit)
}

// Добавление имени пользователя
function createUser(user) {
    const userName = document.createElement('strong');
    userName.innerHTML = `${user}`
    userName.className = 'userName';  

    greetingUser.appendChild(userName);
    userName.addEventListener('click', handleuserClick)
}

// Удаление формы с просьбой ввести имя
function deleteNameInputForm() {
    nameInputForm.className = 'hiding';
}

// Отображение приветствия и имени пользователя
function painting(user) {
    deleteNameInputForm();
    createGreeting();
    createUser(user);
    createTodoForm();
}

// Достаем имя пользователя из локального хранилища
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    if ( user !== null ) {
        painting(user);
    }
}

// Получение имени пользователя и установка события отправки имени
function init() {
    getCurrentUser();
    nameInputForm.addEventListener('submit', handleNameInputFormSubmit);
}

init();