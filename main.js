// Объявляем глобальные константы для всего проекта
const commentsBox = document.querySelector(".comments");
const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");
const addButtonElement = document.querySelector(".add-form-button");
const deleteButtonElement = document.querySelector(".delete-form-button");
const addFormElement = document.querySelector('.add-form');

// Функция для получения текущей даты
const getCurrentDate = () => {
    const currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // тут я добавляю к месяцу 1, так как отсчет начинается с 0
    let year = currentDate.getFullYear().toString().slice(2);
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    // Добавляем вперед нули, чтобы выглядело красиво
    if (date <= 9) {
        date = "0" + date;
    }

    if (month <= 9) {
        month = "0" + month;
    }

    if (hour <= 9) {
        hour = "0" + hour;
    }

    if (minutes <= 9) {
        minutes = "0" + minutes;
    }

    return `${date}.${month}.${year} ${hour}:${minutes}`;
}

// Храним информацию о пользователях в массиве
let persons = [];

// Функция добавляет лоадер загрузки комментариев
const showListLoaderGet = () => {
    const listLoader = document.querySelector('.list-loader-get');
    listLoader.classList.remove('hidden');
}

// Функция удаляет лоадер загрузки комментариев
const hideListLoaderGet = () => {
    const listLoader = document.querySelector('.list-loader-get');
    listLoader.classList.add('hidden');
}

// Функция добавляет лоадер отправки комментария
const showListLoaderPost = () => {
    const listLoader = document.querySelector('.list-loader-post');
    listLoader.classList.remove('hidden');
}

// Функция удаляет лоадер отправки комментария
const hideListLoaderPost = () => {
    const listLoader = document.querySelector('.list-loader-post');
    listLoader.classList.add('hidden');
}

let isLoading = false;

// Подключаю БД с API
const getCommentsInfo = () => {
    if (!isLoading) {
        showListLoaderGet();
    }

    return fetch('https://wedev-api.sky.pro/api/v1/raul-karabalin/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже');
            }

            return response.json();
        })
        .then((responseData) => {

            // Преобразую в нужный мне формат данные с API
            const appComments = responseData.comments.map((comment) => {

                // Преобразую дату в нужный мне вид
                const formatDate = (apiDate) => {
                    const date = new Date(apiDate);
                    const options = {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    }
                    return date.toLocaleString('ru', options).replace(',', '');
                }

                const apiDate = comment.date;
                const formattedDate = formatDate(apiDate);

                return {
                    name: comment.author.name,
                    comment: comment.text,
                    date: formattedDate,
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                }
            })

            persons = appComments;
            renderComments();
        })
        .then(() => {
            hideListLoaderGet();
            isLoading = true;
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            } else {
                alert(error);
            }
        })
}

getCommentsInfo();

// Функция для предовращения уязвимости
const vulnerabilityPrevention = (string) => {
    return string
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
}

// Функция для добавления данных о пользователе в БД API
const postCommentInfo = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/raul-karabalin/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: vulnerabilityPrevention(inputText.value),
            name: vulnerabilityPrevention(inputName.value),
            forceError: true,
        })
    })
        .then((response) => {
            console.log(`${response.status} ошибка сервера`);

            if (response.status === 400) {
                throw new Error('Имя и комментарий должны быть не короче 3 символов');
            }

            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже');
            }

            return response.json();
        })
        .then((responseData) => {
            inputName.value = "";
            inputText.value = "";
            return getCommentsInfo();
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            } else {
                alert(error);
            }
        })
}

// Создаем функцию лайка на каждом коментарии
const initLikeCommentListeners = () => {
    const likeCommentButtonsElements = document.querySelectorAll('.like-button');

    for (const likeCommentButtonElement of likeCommentButtonsElements) {

        const index = likeCommentButtonElement.dataset.index;
        let likesCounts = likeCommentButtonElement.dataset.likeCounts;

        likeCommentButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!persons[index].isLiked) {
                likesCounts++;
                persons[index].likes = likesCounts;
                persons[index].isLiked = true;
            } else {
                likesCounts--;
                persons[index].likes = likesCounts;
                persons[index].isLiked = false;
            }

            renderComments();
        })
    }
}

// Удаление последнего коментария посредством удаления последнего элемента из массива
const initDeleteLastComentListener = () => {
    deleteButtonElement.addEventListener('click', () => {
        persons.pop();

        renderComments();
    })
}

// Ответ на комментарий
const initReplyToComment = () => {
    const commentsBodyElements = document.querySelectorAll('.comment');
    commentsBodyElements.forEach((comment, index) => {
        comment.addEventListener('click', () => {
            inputText.value = `QUOTE_BEGIN ${persons[index].name}: \n ${persons[index].comment} QUOTE_END \n`;
        })
    })
}

initReplyToComment();

// Создаем рендер функцию, для отрисовки контента из JS
const renderComments = () => {
    const commentsHtml = persons
        .map((person, index) => {
            return `<li class="comment">
        <div class="comment-header">
          <div>${person.name}</div>
          <div>${person.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${person.comment
                    .replaceAll('QUOTE_BEGIN', '<div class="quote">')
                    .replaceAll('QUOTE_END', '</div>')}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${person.likes}</span>
            <button data-index="${index}" data-like-counts="${person.likes}" class="like-button ${persons[index].isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
        })
        .join('');

    commentsBox.innerHTML = commentsHtml;

    initLikeCommentListeners();
    initReplyToComment();
    getCurrentDate();
}

initDeleteLastComentListener();
renderComments();

// Кнопка "Написать" будет недоступна прям в момент посещения сайта, так как поля пустые
// в дальнейшем кнопка разблокируется, если заполнить поля каким-либо текстом
addButtonElement.disabled = true;

// Тут кнопка разблокируется, если в какой либо форме будет текст
inputName.addEventListener("input", () => {
    if (inputName.value.length > 0) {
        return (addButtonElement.disabled = false);
    } else {
        return (addButtonElement.disabled = true);
    }
});

inputText.addEventListener("input", () => {
    if (inputText.value.length > 0) {
        return (addButtonElement.disabled = false);
    } else {
        return (addButtonElement.disabled = true);
    }
});

// Валидация форм. Если какое либо поле будет пустым, placeholder окраситься в красный
// Если валидация пройдена, коментарий добавиться в ленту по нажатию мышкой на кнопку
// После того, как коментарий опубликуется, произойдет очистка полей
addButtonElement.addEventListener("click", () => {

    inputName.classList.remove("error");
    inputText.classList.remove("error");

    if (inputName.value.trim().length === 0 || inputText.value.trim().length === 0) {
        inputText.value = '';
        inputName.value = '';
        inputName.classList.add("error");
        inputText.classList.add("error");
        return;
    }

    addFormElement.style.display = 'none';
    showListLoaderPost();

    postCommentInfo().then(() => {

        addFormElement.style.display = 'flex';
        hideListLoaderPost();
    });

});

// То же самое, что и выше, только для добавления коментария по нажатию "Enter"
inputText.addEventListener("keyup", (event) => {
    if (event.key === "Enter") { // Проверяем, была ли нажата клавиша Enter

        inputName.classList.remove("error");
        inputText.classList.remove("error");

        if (inputName.value.trim().length === 0 || inputText.value.trim().length === 0 || inputText.value === '\n') {
            inputText.value = '';
            inputName.value = '';
            inputName.classList.add("error");
            inputText.classList.add("error");
            return;
        }

        addFormElement.style.display = 'none';
        showListLoaderPost();

        postCommentInfo().then(() => {
            addFormElement.style.display = 'flex';
            hideListLoaderPost();
        });

        // Вызываем рендер функцию для отрисовки нового коментария
        renderComments();
    }
});