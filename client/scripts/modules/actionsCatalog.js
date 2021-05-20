import { catalog } from './createCatalog.js'
import { addCart } from './cart.js'
import { addBookmark } from './bookmarks.js';

export default function init() {
    const addBasketModal = document.querySelector('.add-to-basket');
    const catalogList = document.querySelectorAll('.catalog-list');

    catalogList.forEach((item, idx) => item.addEventListener('click', e => {
        e.preventDefault();

        const {target} = e;

        if(target.matches('.actions > .buy')) {
            addCart(catalog[idx])
            addBasketModal.style.display = 'block';
        }

        if(target.matches('.actions > .bookmark'))
            addBookmark(catalog[idx])
    }))

    // addBasketModal.addEventListener('click', modalControls)
}