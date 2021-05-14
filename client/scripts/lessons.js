const MAX_PRODUCT_PRICE = 25000;
const MIN_PRODUCT_PRICE = 5000;

const brands = ['BOSCH', 'ИНТЕРСКОЛ', 'MAKITA', 'DEWALT', 'HITACHI'],
    titles = ['Шуруповерт', 'Перфоратор', 'Дрель'],
    flags = ['', 'new', 'promo'];

const catalog = [];

for(let i = 0; i < 18; i++) {
    const getBrand = brands[getRandNum(brands.length)],
        getTitle = titles[getRandNum(titles.length)],
        getFlag = flags[getRandNum(flags.length)],
        getPrice = getRandNum(MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE),
        getDiscount = 15*(1/100)*getPrice+getPrice,
        getElectric = getRandNum(1);

    const obj = {
        brand: getBrand,
        title: getTitle,
        flag: getFlag,
        price: getPrice,
        discount: getDiscount,
        isElectric: getElectric
    };

    catalog.push(obj);
}

function getRandNum(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

console.log(catalog);