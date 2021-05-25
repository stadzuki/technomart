export default function () {
    const MAX_RANGE_WIDTH = 180; 
    const MAX_DISTANCE_TO_SCROLL = 35;
    const MIN_ITEM_PRICE = 5000;
    const MAX_ITEM_PRICE = 25000;

    /* Вычеслять растояние между двумя скролами, а двигать бар только margin и тем временем высчитывать его ширину между двумя скролами */

    const scrollMin = document.querySelector('.skroll_min');
    const scrollMax = document.querySelector('.skroll_max');
    const rangeBar = document.querySelector('.range__bar');  
    const minPriceField = document.getElementById('min-price');
    const maxPriceField = document.getElementById('max-price');

    minPriceField.value = MIN_ITEM_PRICE;
    maxPriceField.value = MAX_ITEM_PRICE;
    
    scrollMin.style.transform = 'translateX(0px)';
    scrollMax.style.transform = 'translateX(0px)';
    rangeBar.style.width = `${MAX_RANGE_WIDTH}px`;
    
    let scrollPos;
    let scrollMinPos = 0;
    let scrollMaxPos = 0;
    
    let lastMovingPos = 0;
    let lastScrollMinPos = 0;
    let lastScrollMaxPos = 0;
    
    let minPriceValue = minPriceField.value;
    let maxPriceValue = maxPriceField.value;

    let counterLeft = 0;
    let counterRight = 0;
    
    const calcStepPrice = Math.round((+minPriceField.value + +maxPriceField.value) / MAX_RANGE_WIDTH);
    
    scrollMin.addEventListener('mousedown', onScrollMouseDown);
    scrollMax.addEventListener('mousedown', onScrollMouseDown);

    function onScrollMouseDown(e) {
        const {target} = e;
        
        if(target.matches('.skroll_min')) {
            scrollMinPos == 0 ? scrollMinPos = e.clientX : scrollMinPos;
            scrollPos = scrollMinPos;
        } else if(target.matches('.skroll_max')) {
            scrollMaxPos == 0 ? scrollMaxPos = e.clientX : scrollMaxPos;
            scrollPos = scrollMaxPos;
        }

        target.addEventListener('mousemove', onScrollMouseMove)
        target.addEventListener('mouseup', onScrollMouseUp);
        target.addEventListener('mouseout', onScrollMouseUp)
    }

    function onScrollMouseMove(e) {
        const {target} = e;
        
        let posRightScroll = +getScrollPos(scrollMax);
        let posLeftScroll = +getScrollPos(scrollMin);
        
        const movingPos = e.clientX - scrollPos;
        let limit = MAX_RANGE_WIDTH - (posLeftScroll + -1 * (posRightScroll));

        if(target.matches('.skroll_min')) {
            lastMovingPos = lastScrollMinPos;
        } else if(target.matches('.skroll_max')) {
            lastMovingPos = lastScrollMaxPos;
        }

        if(lastMovingPos > movingPos) { // to left
            counterLeft++;

            if(target.matches('.skroll_max') && limit <= MAX_DISTANCE_TO_SCROLL) {
                return limit = MAX_DISTANCE_TO_SCROLL;
            }
            
            if(target.matches('.skroll_min') && posLeftScroll <= 0) {
                return 1;
            } else {
                rangeBar.style.marginLeft = `${posLeftScroll}px`;
            }

            console.log('дошло', counterLeft);
            minPriceValue = +minPriceValue - 250;
            minPriceField.value = minPriceValue;
        }
        
        if(lastMovingPos < movingPos) { // to right   
            counterRight++;
            
            if(target.matches('.skroll_max') && posRightScroll >= 0) {
                return 1;
            } 

            if(target.matches('.skroll_min') && limit <= MAX_DISTANCE_TO_SCROLL) {
                return 1;
            } else {
                rangeBar.style.marginLeft = `${posLeftScroll + 2}px`;
            }            

            console.log('дошло', counterRight);
            minPriceValue = +minPriceValue + 250;
            minPriceField.value = minPriceValue;
        }

        rangeBar.style.width = `${limit}px`;
        target.style.transform = `translateX(${movingPos}px)`;

        target.matches('.skroll_min')
            ? lastScrollMinPos = movingPos
            : lastScrollMaxPos = movingPos;
    }

    function onScrollMouseUp(e) {
        const {target} = e;

        target.removeEventListener('mousemove', onScrollMouseMove)
        target.removeEventListener('mouseup', onScrollMouseUp)
        target.removeEventListener('mouseout', onScrollMouseUp)
    }

    function getScrollPos(elem) {
        return elem.style.transform.match(/\-?\d+/).join()
    }

}