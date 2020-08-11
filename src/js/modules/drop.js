const drop = () => {
    const inputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        inputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        })
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.background = 'rgba(0, 0, 0, 0.7)';
    };

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = item.closest('.calc_form') ? '#fff' : '#ededed';
    };

    ['dragenter', 'dragover'].forEach(eventName => {
        inputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        })
    });

    ['dragleave', 'drop'].forEach(eventName => {
        inputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        })
    });

    inputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files; 

            let arr = input.files[0].name.split('.');
            let dots = arr[0].length > 5 ? '...' : '.';
            const name = arr[0] + dots + arr[1];
            input.previousElementSibling.textContent = name
        })
    })
};

export default drop;