const footTodoButton = document.querySelector('#js-todoButton'), 
    qt = document.querySelector('#js-qt'),
    inputTodo = document.querySelector('.js-inputTodo'),
    askTodo = document.querySelector('#js-askTodo');

let currentFootTodolist = [];

// Сохранение списка заданий
function HandleinputTodo(e) {
    e.preventDefault();
    askTodo.classList.add('hiding');
    const data = {
        data : inputTodo.value,
        value : false
    }
    inputTodo.value = ''; 
    if(data.data !== '') {
        currentFootTodolist.push(data);
        localStorage.setItem('currentFootData', JSON.stringify(currentFootTodolist));
    }
    // Отрисовка
    paintingList(currentFootTodolist);
}

// Отрисовка списка
function paintingList(Data) {
    let todolist = document.querySelector('#js-todolist');
    todolist.querySelectorAll('*').forEach( n => n.remove());
    
    Data.forEach(function(data) {
        const checkbox = document.createElement('input')
        const datali = document.createElement('li'); 
        const button = document.createElement('button');
        
        checkbox.type ="checkbox";
        if (data.value === true) {
            datali.className = "checkClicked";
            checkbox.checked = true;
        } else {
            datali.className = "";
            checkbox.checked = false;
        }
        button.innerText = 'x'
        datali.innerText = data.data;
        todolist.appendChild(datali);
        datali.prepend(checkbox);
        datali.appendChild(button);

        button.addEventListener('click', function handelClickEvent() {
            button.parentNode.remove();
            currentFootTodolist = currentFootTodolist.filter( function (data) {
                return data.data !== button.parentNode.textContent.slice(0,-1);
            })
            if(currentFootTodolist.length === 0){
                askTodo.classList.remove('hiding'); 
                inputTodo.classList.add('hiding');
            }
                
            localStorage.setItem('currentFootData', JSON.stringify(currentFootTodolist));
        })

        checkbox.addEventListener('click', function handleCheckbox() {
            if (checkbox.parentNode.className === "") {
                checkbox.parentNode.className = "checkClicked"; 
                currentFootTodolist.forEach(function (data) {
                    if(data.data === checkbox.nextSibling.data)
                        data.value = true;
                })
            } else {
                checkbox.parentNode.className = ""; 
                currentFootTodolist.forEach(function (data) {
                    if(data.data === checkbox.nextSibling.data)
                        data.value = false;
                })
            }
           
            localStorage.setItem('currentFootData', JSON.stringify(currentFootTodolist));
        })
    }) 
    todolist.classList.remove('hiding');
}

function handelfootTodoButton() {
    const currentFootData = localStorage.getItem('currentFootData');
    const closeFootTodoButton = document.querySelector('.js-closeFootTodoButton');
    const footTodolist = document.querySelector('.js-footTodolist');
    const askTodoButton = askTodo.querySelector('button');
    
    // Если есть задания    
    if(currentFootData !== null && currentFootData.length !== 2) {
        // Скрываем кнопку с просьбой ввести задание
        askTodo.classList.add('hiding');

        // Отображаем список заданий и поле ввода
        footTodolist.classList.remove('hiding'); 
        inputTodo.classList.remove('hiding');
        
        // Обертка списка
        let todolist = document.querySelector('#js-todolist');
        todolist.querySelectorAll('*').forEach( n => n.remove());

        // Получение содержимого списка заданий
        const currentlistData = JSON.parse(localStorage.getItem('currentFootData')); 
        currentFootTodolist = currentlistData;

        // Отрисовка
        paintingList(currentlistData);
        todolist.classList.remove('hiding');
        
        // Нажатие кнопки отправки
        inputTodo.parentElement.addEventListener('submit', HandleinputTodo );

        // Закрытие вкладки с заданиями
        closeFootTodoButton.addEventListener('click', function HandlecloseFootTodoButton(e) {
            e.preventDefault();
            inputTodo.value = '';
            inputTodo.classList.add('hiding');
            footTodolist.classList.add('hiding');      
        })

    } else {
        // Список заданий
        footTodolist.classList.remove('hiding'); 

        // Отображение поля ввода и реакция на ввод
        inputTodo.parentElement.addEventListener('submit', HandleinputTodo);
        
        // Отображаем кнопку с просьбой ввести задание
        askTodoButton.addEventListener('click', function HandleAsktodoButton(e) {
            e.preventDefault();
            inputTodo.classList.remove('hiding');
        })

        // Закрытие вкладки с заданиями
        closeFootTodoButton.addEventListener('click', function HandlecloseFootTodoButton(e) {
            e.preventDefault();
            inputTodo.value = '';
            inputTodo.classList.add('hiding');
            footTodolist.classList.add('hiding');      
        })
    }
}

// Переход по нажатию на вопросы
function handelsettings() {
    window.location.href ='https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0';
}

// Формирование поведения при нажатии на список заданий
function init() {
    footTodoButton.addEventListener('click', handelfootTodoButton);
    qt.addEventListener('click', handelsettings);
}

init();