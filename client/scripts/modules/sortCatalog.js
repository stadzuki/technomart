import {createCatalogItem} from './displayCatalog.js'
import {catalog} from './createCatalog.js'

export default function init() {  
    const sortingProduct = document.querySelector('.sorting-product');
    const sortingList = sortingProduct.querySelectorAll('.sorting-list > li > a');
    const primaryCatalog = [...catalog];
    const direction = document.querySelector('.direction');
    
    let sortedCatalog = [...catalog];

    sortingProduct.addEventListener('click', e => {
        e.preventDefault();

        const {target} = e;

        if(target.matches('a.by-price'))
            checkActive(target, 'price');     

        if(target.matches('a.by-type'))
            checkActive(target, 'type')

        if(target.matches('a.by-functional')) {
            checkActive(target, 'functional');
        }

        if(target.matches('a.sorting-up-button > svg > path')
        || target.matches('a.sorting-down-button > svg > path')) 
            directionSort(target)
            
    });


    function directionSort(target) {
        const parent = target.parentNode.parentNode;

        if(parent.classList.contains('indicator-checked'))
            return 1;

        for(let item of direction.children) 
            item.classList.remove('indicator-checked')
        
        parent.classList.add('indicator-checked')

        renderSortedCatalog(sortedCatalog.reverse())
    }

    function checkActive(target, sortType) {
        if(!target.classList.contains('sorting-checked')) {
            target.classList.add('sorting-checked')
            return doSort(sortType);
        }

        target.classList.remove('sorting-checked')
        renderSortedCatalog(sortedCatalog.reverse());
    }

    function renderSortedCatalog(arr) {
        const catalogFragment = document.createDocumentFragment();
        arr.forEach(item => catalogFragment.appendChild(createCatalogItem(item)))

        const catalogList = document.querySelector('.catalog-list');
        catalogList.innerHTML = '';
        catalogList.appendChild(catalogFragment);
    }

    function doSort(type) {
        let sortElem = [...primaryCatalog];
        
        sortElem.sort((a, b) => {
            if(type == 'type') {
                a = a.type;
                b = b.type;
            } else if(type == 'price'){
                a = a.price;
                b = b.price;
            } else if(type == 'functional') {
                a = a.isElectric;
                b = b.isElectric;
            }

            if(a > b)
                return 1;

            if(a < b)
                return -1;

            return 0;
        })
        
        type == 'functional' ? sortElem.reverse() : false;

        sortedCatalog = [...sortElem]
        
        if(direction.children[1].classList.contains('indicator-checked'))
            sortedCatalog.reverse();

        renderSortedCatalog(sortedCatalog);
    }
}
