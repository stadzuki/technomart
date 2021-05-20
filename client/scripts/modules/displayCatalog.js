const catalogList = document.querySelector('.catalog-list');
const catalogFragment = document.createDocumentFragment();


const renderCatalog = (arr) => {
    arr.forEach((item) => {
        const catalogItem = createCatalogItem(item);
        catalogFragment.appendChild(catalogItem);
    })
    catalogList.appendChild(catalogFragment);
};


function createItemFlag(flag) {
    if(flag == 'promo') {
        flag = '<div class="flag flag-promo"><span class="visually-hidden">Акция</span></div>';
    } else if(flag == 'new') {
        flag = '<div class="flag flag-new"><span class="visually-hidden">Новинка</span></div>';
    } else {
        flag = '';
    }

    return flag
}

function createCatalogItem(obj) {
    const {brand, url, type, flag, price, discount} = obj;

    const flagTemplate = createItemFlag(flag);

    const li = document.createElement('li');
    li.classList.add('catalog-item');

    const template = `
        ${flagTemplate}
        <div class="actions">
            <a class="buy" href="#">Купить</a>
            <a class="bookmark" href="#">В закладки</a>
        </div>
        <div class="image">
            <img src="${url}" width="218" height="168" alt="${type}${brand}">
        </div>
        <h3 class="item-title">${type} ${brand}</h3>
        <span class="discount">${discount} Р.</span>
        <a class="button price" href="#">${price} Р.</a>`

    li.innerHTML = template;

    return li
}

export {renderCatalog, createCatalogItem}