const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 1650){
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else{
            upElem.classList.remove('fadeIn');
            upElem.classList.add('fadeOut');
        }
    })

    // scrolling with requstAnimationFrame

    let links = document.querySelectorAll('[href^="#"]');
    let speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            let widthTop = document.documentElement.scrollTop;
            let hash = this.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;

            requestAnimationFrame(step);

            function step(time){
                if(start === null){
                    start = time
                }

                let progress = time - start;
                let r = toBlock < 0 
                    ? Math.max(widthTop - progress/speed, widthTop + toBlock)
                    : Math.min(widthTop + progress/speed, widthTop + toBlock)

                document.documentElement.scrollTo(0, r);

                if(r != widthTop + toBlock){
                    requestAnimationFrame(step)
                } else{
                    location.hash = hash 
                }
            }
        })
    })




    // scrolling with pure JS 

    // const documentElem = document.documentElement;
    // const body = document.body;
    
    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(e) {
    //         let scrollTop = Math.round(documentElem.scrollTop || body.scrollTop);

    //         if(this.hash !== ''){
    //             e.preventDefault();
    //             let hashElem = document.querySelector(this.hash);
    //             let hashElemTop = 0;
            
    //             while(hashElem.offsetParent){
    //                 hashElemTop += hashElem.offsetTop;
    //                 hashElem = hashElem.offsetParent;
    //             }

    //             hashElemTop = Math.round(hashElemTop);
    //             smoothScroll(scrollTop, hashElemTop, this.hash);
    //         }
    //     })
    // }

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1;
    //     let speed;
    //     let prevScrollTop; 

    //     if(to > from){
    //         speed = 30;
    //     } else{
    //         speed = -30;
    //     }

    //     let move = setInterval(function() {
    //         let scrollTop = Math.round(documentElem.scrollTop || body.scrollTop);

    //         if(
    //             prevScrollTop === scrollTop
    //             || (to > from && scrollTop >= top)
    //             || (to < from && scrollTop <= top)
    //         ){
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else{
    //             documentElem.scrollTop += speed;
    //             body.scrollTop += speed;
    //             prevScrollTop = scrollTop
    //         }
    //     }, timeInterval);
    // }
    // calcScroll();

}

export default scrolling;