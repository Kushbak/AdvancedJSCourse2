const burger = (menuSelector, burgerSelector) => {
    const menu = document.querySelector(menuSelector);
    const burger = document.querySelector(burgerSelector);

    menu.style.display = 'none';

    if(menu.style.display = 'none' && window.screen.availWidth <= 992){
        menu.style.display = 'block';
    } else{
        menu.style.display = 'none';
    }
};

export default burger;