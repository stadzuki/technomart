export default function () {
    const MAX_RANGE_WIDTH = 180; 

    /* Вычеслять растояние между двумя скролами, а двигать бар только margin и тем временем высчитывать его ширину между двумя скролами */

    const scrollMin = document.querySelector('.skroll_min');
    const scrollMax = document.querySelector('.skroll_max');
    const rangeBar = document.querySelector('.range__bar');    

    scrollMin.style.transform = 'translateX(0px)';
    scrollMax.style.transform = 'translateX(0px)';
    rangeBar.style.width = `${MAX_RANGE_WIDTH}px`;

    let scrollPos;
    let scrollMinPos = 0;
    let scrollMaxPos = 0;

    let lastMovingPos = 0;
    let lastScrollMinPos = 0;
    let lastScrollMaxPos = 0;

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
        let sibling;
        
        const movingPos = e.clientX - scrollPos;
        const border = MAX_RANGE_WIDTH - (posLeftScroll + -1 * (posRightScroll));

        if(target.matches('.skroll_min')) {
            sibling = target.nextElementSibling;
            lastMovingPos = lastScrollMinPos;
        } else if(target.matches('.skroll_max')) {
            sibling = target.previousElementSibling;
            lastMovingPos = lastScrollMaxPos;
        }

        if(lastMovingPos > movingPos) { // to left
            if(target.matches('.skroll_max') && border <= 20) {
                return 1;
            } else if(target.matches('.skroll_max')) {
                let calculateBarValue = MAX_RANGE_WIDTH - (-1 * movingPos);
                rangeBar.style.width = `${calculateBarValue}px`;
            }
            
            if(target.matches('.skroll_min') && posLeftScroll <= 0) {
                return 1;
            } else if(target.matches('.skroll_min')) {
                let calculateBarValue = MAX_RANGE_WIDTH + (-1 * movingPos);
                rangeBar.style.width = `${calculateBarValue}px`;
                rangeBar.style.marginLeft = `${posLeftScroll + 2}px`;
            }

            console.log('left')
        }
        
        if(lastMovingPos < movingPos) { // to right
            if(target.matches('.skroll_min') && border <= 20) {
                return 1;
            } else if(target.matches('.skroll_min')) {
                let calculateBarValue = MAX_RANGE_WIDTH + (-1 * movingPos);
                rangeBar.style.width = `${calculateBarValue}px`;
                rangeBar.style.marginLeft = `${posLeftScroll + 3}px`;
            }
            
            if(target.matches('.skroll_max') && posRightScroll >= 0) {
                return 1;
            } else if(target.matches('.skroll_max')) {
                let calculateBarValue = MAX_RANGE_WIDTH - (-1 * movingPos);
                rangeBar.style.width = `${calculateBarValue}px`;
            }

            console.log('right')
        }

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