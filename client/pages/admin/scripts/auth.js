document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = document.forms.authForm;

    const login = form.login.value,
        password = form.password.value;
        
    //удалять notif
    const notifParent = document.querySelector('.form-container');  
    for(item of notifParent.children) {
        if(item.classList.contains('notif')) notifParent.removeChild(item)
    }

    if(!login)
        return sendNotif('Ошибка: Вы не указали Логин!')

    if(!password)
        return sendNotif('Ошибка: Вы не указали Пароль!')

    const valid_login = login.search(/^[a-zA-Z0-9\.\_\-]{4,32}$/)
    if(valid_login == -1)
        return sendNotif('Ошибка: Логин содержит недопустимые сиволы!')

    const valid_password = password.search(/^[a-zA-Z0-9\(\)\#\_\-\.\@]{6,32}$/)
    if(valid_password == -1)
        return sendNotif('Ошибка: Пароль содержит недопустимые символы!')

    if(login.length < 4 || login.length > 32)
        return sendNotif('Ошибка: Длинна Логина должна составлять от 4-х до 32-х латинских символов!')

    if(password.length < 4 || password.length > 32)
        return sendNotif('Ошибка: Длинна Пароля должна составлять от 4-х до 32-х латинских символов!')
})

function request(url, method, data = null) {
    
}

function sendNotif(text) {
    const parent = document.querySelector('.form-container');

    const elem = document.createElement('div');
    elem.classList.add('notif');

    const template = `<div class="notif-text">${text}</div>`;
    elem.innerHTML = template

    parent.appendChild(elem);
}