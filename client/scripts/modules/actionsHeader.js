import {catalog} from './createCatalog.js';

export default function init() {
    const itemsList = [];

    catalog.forEach(item => {
        const obj = {
            title: item.type,
            id: item.id
        }

        itemsList.push(obj);
    })

    const writeUsModal = document.querySelector('.modal-write');
    const writeUsForm = writeUsModal.querySelector('form');

    const orderNavigation = document.querySelector('.order-navigation');
    const searchField = orderNavigation.querySelector('form.main-search');

    searchField.addEventListener('input', onSearchInput)

    document.querySelector('.contacts-button').onclick = () => {
        writeUsModal.style.display = 'flex'

        writeUsModal.addEventListener('submit', onSendBtnClick)
        writeUsModal.addEventListener('click', onModalClick)

    };

    function onSearchInput(e) {
        const {target} = e;

        const  searchedItem = target.value;

        if(searchedItem.length <= 0) return true;

        itemsList.forEach(item => {
            let searchResult = item.title.toLowerCase().search(searchedItem.toLowerCase())
            if(searchResult !== -1) {
                return console.log(`Найден товар, название: ${item.title} ид ${item.id}`)
            }
        })
        
    }

    function checkValid(elements) {
        let result = true;

        for(let item of elements) {
            if(item.name == 'name') {
                result = item.value.search(/^[а-яА-Я]{2,32} [а-яА-Я]{2,32}$/)
                if(result === -1) {
                    return result = 'Имя и фамиля указаны неверно! Например: Иван Иванов.'
                }
                return true;
            }

            if(item.name == 'email') {
                result = item.value.search(/^[a-zA-Z0-9\-\_\.]{4,32}@[a-zA-Z]{3,12}.[a-zA-Z]{2,6}$/)
                if(result === -1) {
                    return result = 'Почтовый ящик указан неверно! Например: example@gmail.com.'
                }
                return true;
            }

            if(item.name == 'letter') {
                result = item.value.search(/^[\wа-яА-Я]{6,500}$/)
                if(result === -1) {
                    return result = 'Обращение соедржит запрещенные символы, либо превышает максимальную длинну!'
                }
                return true;
            }
        }

        return result;
    }

    function onSendBtnClick(e) {
        e.preventDefault()
        const {target} = e;

        let isValid = checkValid(writeUsForm.elements);
        if(isValid === true) {
            //Request
            console.log('Данные отправлены');
            writeUsForm.style.display = 'none';
            removeEventListener('submit', onSendBtnClick);
        } else {
            console.log(isValid);
        }
    }

    function onModalClick(e) {
        e.preventDefault()
        const {target} = e;

        if(target.matches('button.modal-close')) {
            writeUsForm.style.display = 'none';
            removeEventListener('submit', onSendBtnClick)
        }
    }
}