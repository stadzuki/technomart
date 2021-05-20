const MAX_PRODUCT_PRICE = 25000;
const MIN_PRODUCT_PRICE = 5000;
const PROCENT_DISCOUNT = 15;
const ITEM_COUNT_INIT = 6;

const brands = ['BOSCH', 'ИНТЕРСКОЛ', 'MAKITA', 'DEWALT', 'HITACHI'];
const types = ['Шуруповерт', 'Перфоратор', 'Дрель'];
const flags = ['', 'new', 'promo'];
const urls = [
    './assets/img/catalog/bosch-2000.jpg',
    './assets/img/catalog/bosch-3000.jpg',
    './assets/img/catalog/bosch-6000.jpg',
    './assets/img/catalog/bosch-9000.jpg',
    './assets/img/catalog/bosch-ixo-v.jpg',
    './assets/img/catalog/makita-td-110.jpg'
];

const catalog = [];

for(let i = 0; i < ITEM_COUNT_INIT; i++) {
    const price = Math.round(getRandNum(MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE));
    const discount = PROCENT_DISCOUNT*(1/100)*price+price;
    
    const obj = {
        id: Date.now() + i,
        brand: brands[getRandNum(brands.length)],
        url: urls[getRandNum(urls.length)],
        type: types[getRandNum(types.length)],
        flag: flags[getRandNum(flags.length)],
        price: price,
        discount: discount,
        isElectric: getRandNum(2)
    };
    
    catalog.push(obj)
}

function getRandNum(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

export {catalog}