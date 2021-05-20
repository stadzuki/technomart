export default function () {
    const MAX_BORDER_SCROLL = 180;
    const MIN_BORDER_SCROLL = 0;

    const scrollMin = document.querySelector('.skroll_min');
    const scrollMax = document.querySelector('.skroll_max');
    const rangeBlock = document.querySelector('.range__block');
    const rangeBar = document.querySelector('.range__bar');    

    let scrollPos;
    let scrollMinPos = 0;
    let scrollMaxPos = 0;
    let lastMovingPos = 0;

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
        const movingPos = e.clientX - scrollPos;
        
        let sibling;

        if(target.matches('.skroll_min')) {
            sibling = target.nextElementSibling;
        } else if(target.matches('.skroll_max')) {
            sibling = target.previousElementSibling;
        }

        if(lastMovingPos < movingPos) { // to right
            // if(movingPos >= MAX_BORDER_SCROLL)
            //     return 1;

            console.log('right');
        }

        if(lastMovingPos > movingPos) { // to left
            // if(movingPos <= MIN_BORDER_SCROLL)
            //     return 1;

            console.log('left');
        } 
        
        target.style.transform = `translateX(${movingPos}px)`  
        lastMovingPos = movingPos;  
    }

    function onScrollMouseUp(e) {
        const {target} = e;

        target.removeEventListener('mousemove', onScrollMouseMove)
        target.removeEventListener('mouseup', onScrollMouseUp)
        target.removeEventListener('mouseout', onScrollMouseUp)
    }

    function getSiblingDistance(sibling) {
        return sibling.style.transform
    }
}