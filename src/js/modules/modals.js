const modals = () => {
    let btnPressed = false;

    const bindModal = (triggerSelector, modalSelector, closeSelector, destroy = false) => {
        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const allModals = document.querySelectorAll('[data-modal]');
        const scrollWidth = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                btnPressed = true;
                if(e.target){
                    e.preventDefault();
                } 
                if(destroy){
                    item.remove()
                }
                allModals.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                })
                modal.style.display = 'block';
                document.body.style.marginRight = `${scrollWidth}px`;
                document.body.style.overflow = 'hidden';
            })
        })

        close.addEventListener('click', () => { 
            allModals.forEach(item => {
                item.style.display = 'none';
            })
            modal.style.display = 'none';
            document.body.style.marginRight = `0px`;
            document.body.style.overflow = ''; 
        })

        modal.addEventListener('click', (e) => {
            if(e.target === modal){
                allModals.forEach(item => {
                    item.style.display = 'none';
                })
                document.body.style.marginRight = `0px`;
                modal.style.display = 'none';
                document.body.style.overflow = '';
               
            }
        })
    }

    const openModalByTime = (selector, time) => {
        setTimeout(() => {
            let display;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== 'none'){
                    display = 'block'
                }
            })

            if(!display){ 
                document.body.querySelector(selector).style.display = 'block'
                document.body.style.overflow = 'hidden'; 
                const scrollWidth = calcScroll();
                document.body.style.marginRight = `${scrollWidth}px`;
            }
        }, time)
    }


    const calcScroll = () => {
        let div = document.createElement('div');

        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflowY = 'scroll'

        document.body.appendChild(div)

        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();

        return scrollWidth
    }


    const openByScroll = (selector) => {
        window.addEventListener('scroll', () => {
            let scrollHeight= Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){
                document.querySelector(selector).click();
            }
        })
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close'); 
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close'); 
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true); 
    // openByScroll('.fixed-gift')
    // openModalByTime('.popup-consultation', 5000)
}

export default modals;