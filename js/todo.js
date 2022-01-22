const todoinput = todoForm.querySelector('input'),
    list = document.querySelector('.js-list');

let datalist = [];

// Сохранение целей на сегодня
function saveDatalist(datalist) {
    localStorage.setItem('currentList', JSON.stringify(datalist));
}

// Нажатие на кнопку сброса
function handleClick(e) {
    const todoQeus = document.querySelector('.todoQeus');
    const todoHead = todoForm.querySelector('.todoHead');
    const parentButton = e.target.parentNode;
    datalist = [];
    localStorage.setItem('currentList', datalist);
    todoQeus.classList.remove('hiding');
    todoinput.classList.remove('hiding');
    todoHead.remove();
    parentButton.remove();
}

// Создание списка целей на сегодня
function createlist(value) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const btn = document.createElement('button');
    span.innerHTML = value;
    btn.innerHTML = '×';
    list.appendChild(li);
    li.appendChild(span);
    li.appendChild(btn);
    btn.addEventListener('click', handleClick);
}

// Добавление заголовка цели на сегодня
function createHead() {
    const todoQeus = document.querySelector('.todoQeus');
    const todoHead = document.createElement('h1');
    todoHead.innerHTML = 'Цель На Сегодня';
    todoHead.className = 'todoHead';
    todoQeus.classList.add('hiding');
    todoinput.classList.add('hiding');
    todoForm.appendChild(todoHead);
}

// Нажатие кнопки отправки
function handleTodoSubmit(e) {
    e.preventDefault();
    if (todoinput.value === '') {
        alert('Ошибка! Поле для ввода цели пусто.');
    } else {
        createlist(todoinput.value);
        const addList = {
            data: todoinput.value
        }
        datalist.push(addList);
        saveDatalist(datalist);
        todoinput.value = '';   
        createHead(); 
        
    }
}

// Отображение списка целей на сегодня
function paintingList(currentList) {
    createHead();
    currentList.forEach(function (data) { createlist(data.data); })
    datalist = currentList;
}

// Получение списка целей на сегодня
function getList() {
    const currentList = localStorage.getItem('currentList');
    if (currentList !== null && currentList !== '') {
        paintingList(JSON.parse(currentList));
    } 
}

// Получение списка целей на сегодня
function init() {
    getList();
    todoForm.addEventListener('submit', handleTodoSubmit)
}

init();