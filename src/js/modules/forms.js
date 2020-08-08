// import checkForNum from './checkForNum'

const forms = (state) => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input'); 
    const uploads = document.querySelectorAll('[name="upload"]'); 

    // checkForNum('input[name="user_phone"]')

    const message = {
        loading: 'Загрузка...',
        success: 'Успешно отправлено',
        error: 'Что-то пошло не так',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    }

    const postData = async (url, data) => { 
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
        uploads.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран'
        })
    }

    uploads.forEach(item => {
        item.addEventListener('input', () => {
            let arr = item.files[0].name.split('.');
            let dots = arr[0].length > 5 ? '...' : '.';
            const name = arr[0] + dots + arr[1];
            item.previousElementSibling.textContent = name
        })
    })

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.className = 'status';
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none'
            }, 400)

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);


            let path = {
                designer: 'assets/server.php',
                questions: 'assets/question.php'
            }
            const formData = new FormData(item);

            if(item.getAttribute('data-calc') === 'end'){
                for(let key in state){
                    formData.append(key, state[key])
                }
            }

            let api;
            item.closest('popup-design') ? api = path.designer : api = path.questions  
            
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok); 
                    textMessage.innerHTML = message.success
                })
                .catch(err => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.innerHTML = message.error
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInDown');
                    }, 5000)
                })
        })
    })

};

export default forms;