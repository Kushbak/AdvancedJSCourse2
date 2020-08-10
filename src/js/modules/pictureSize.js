const pictureSize = (selectors) => {
    const blocks = document.querySelectorAll(selectors);

    const showImg = (block) => {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
            item.style.display = 'none';
        })
    }

    const hideImg = (block) => {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
            item.style.display = 'block';
        })
    }

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        })
        block.addEventListener('mouseout', () => {
            hideImg(block);
        })
    })
}

export default pictureSize;