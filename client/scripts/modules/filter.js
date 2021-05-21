export default function () {
    const MAX_RANGE_WIDTH = 180;
    const SCROLL_WIDTH = 20; 
    const SCROLL_BORDER = 20;

    const scrollMin = document.querySelector('.skroll_min');
    const scrollMax = document.querySelector('.skroll_max');
    
    scrollMin.style.transform = 'translateX(0px)';
    scrollMax.style.transform = 'translateX(0px)';

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

        let posLeftScroll = +getTranslate(scrollMin);
        let posRightScroll = +getTranslate(scrollMax);
        
        // if((posRightScroll - posLeftScroll) == 20) {
        // }
        let border = 180 - (posLeftScroll + posRightScroll);
        if(border <= 20)
            return console.log('stop')

        if(lastMovingPos < movingPos) { // to right
            console.log('right');
        }
        
        if(lastMovingPos > movingPos) { // to left
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

    function getTranslate(elem) {
        return elem.style.transform.match(/\d+/).join()
    }

    // function getBorderDistance(target) {//получение элемента на странице
    //     // console.log(getTranslate(target))
    //     // console.log('getBorderDistance', getTranslate(target))
    //     return getTranslate(target);
    // }
}