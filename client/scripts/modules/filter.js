export default function () {
    const scrollMin = document.querySelector('.skroll_min');
    const scrollMax = document.querySelector('.skroll_max');
    const rangeBlock = document.querySelector('.range__block');
    const rangeBar = document.querySelector('.range__bar');

    console.log(scrollMax);

    let moveCoord;


    scrollMin.addEventListener('mousedown', onScrollMouseDown);
    scrollMax.addEventListener('mousedown', onScrollMouseDown);

    function onScrollMouseDown(e) {
        const {target} = e;
        
        moveCoord = e.clientX;

        addEventListener('mouseup', onScrollMouseUp);
        addEventListener('mousemove', onScrollMouseMove)
    }

    function onScrollMouseMove(e) {
        
        const {target} = e;
        
        
        if(target.matches('.skroll_min')) {
            let coord = e.clientX - moveCoord;
            
            if(e.clientX > moveCoord) {
                if(scrollMax.offsetLeft - coord < 25)
                return 1;
                
                target.style.left = `${coord}px`; 
                // target.style.transform = `translateX(${coord}px)`;
            } else {
                if(coord < 0)
                return 1;
                
                target.style.left = `${coord}px`; 
                // target.style.transform = `translateX(${coord}px)`;
            }
        }
        
        if(target.matches('.skroll_max')) {
            let coord = e.clientX - moveCoord;
            if(e.clientX > moveCoord) {
                target.style.transform = `translateX(${coord}px)`;
            } else {
                console.log(-coord - scrollMin.offsetLeft);
                target.style.transform = `translateX(${coord}px)`;
            }
        }
    }

    function onScrollMouseUp(e) {
        const {target} = e;

        removeEventListener('mousemove', onScrollMouseMove)
        removeEventListener('mouseup', onScrollMouseUp)
    }
}