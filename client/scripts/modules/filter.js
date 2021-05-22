export default function () {
    const MAX_RANGE_WIDTH = 180; 

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
        
        console.log('posRightScroll', posRightScroll)
        console.log('posLeftScroll', posLeftScroll)

        const movingPos = e.clientX - scrollPos;
        const border = MAX_RANGE_WIDTH - (posLeftScroll + posRightScroll);

        if(target.matches('.skroll_min')) {
            sibling = target.nextElementSibling;
            lastMovingPos = lastScrollMinPos;
        } else if(target.matches('.skroll_max')) {
            sibling = target.previousElementSibling;
            lastMovingPos = lastScrollMaxPos;
        }

        if(lastMovingPos > movingPos) { // to left
            if(target.matches('.skroll_max') && border <= 20)
                return console.log('stop left')
            
            // Проверка skroll_min на минимальную позицию (береме posLeftScroll и провермяем чтобы он был не меньше 0 иначе скролл влево невозможен)

            console.log('left')
        }
        
        if(lastMovingPos < movingPos) { // to right
            if(target.matches('.skroll_min') && border <= 20)
                return console.log('stop right')
            
            // Проверка skroll_max на максимальную позицию (береме posRightScroll и провермяем чтобы он был не меньше 0 иначе скролл вправо невозможен)

            console.log('right')
        }

        target.style.transform = `translateX(${movingPos}px)`;

        target.matches('.skroll_min') ? lastScrollMinPos = movingPos : lastScrollMaxPos = movingPos;
    }

    function onScrollMouseUp(e) {
        const {target} = e;

        target.removeEventListener('mousemove', onScrollMouseMove)
        target.removeEventListener('mouseup', onScrollMouseUp)
        target.removeEventListener('mouseout', onScrollMouseUp)
    }

    function getScrollPos(elem) {
        return elem.style.transform.match(/\d+/).join()
    }
}