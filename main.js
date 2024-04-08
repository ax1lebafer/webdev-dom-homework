import { getComments, postComment } from "./api.js";
import {
  showListLoaderGet,
  hideListLoaderGet,
  showListLoaderPost,
  hideListLoaderPost,
} from "./loaders.js";
import {
  initReplyToComment,
  initDeleteLastComentListener,
} from "./initFunctions.js";
import { renderComments } from "./renderComments.js";

// Объявляем глобальные константы для всего проекта
const inputName = document.querySelector(".add-form-name");
export const inputText = document.querySelector(".add-form-text");
const addButtonElement = document.querySelector(".add-form-button");
const addFormElement = document.querySelector(".add-form");

// Храним информацию о пользователях в массиве
export let persons = [];

let isLoading = false;

// Подключаю БД с API
const getCommentsInfo = () => {
  if (!isLoading) {
    showListLoaderGet();
  }

  getComments()
    .then((responseData) => {
      // Преобразую в нужный мне формат данные с API
      const appComments = responseData.comments.map((comment) => {
        const apiDate = comment.date;
        const formattedDate = new Date(apiDate).format();

        return {
          name: comment.author.name,
          comment: comment.text,
          date: formattedDate,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });

      persons = appComments;
      renderComments({ persons, initReplyToCommentWithoutParams });
      initDeleteLastComentListener({ persons, renderComments });
    })
    .then(() => {
      hideListLoaderGet();
      isLoading = true;
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      } else {
        alert(error);
      }
    });
};

getCommentsInfo();

// Функция для добавления данных о пользователе в БД API
const postCommentInfo = () => {
  return postComment({
    inputText: inputText.value.vulnerabilityPrevention(),
    inputName: inputName.value.vulnerabilityPrevention(),
  })
    .then(() => {
      inputName.value = "";
      inputText.value = "";
      return getCommentsInfo();
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      } else {
        alert(error);
      }
    });
};

export function initReplyToCommentWithoutParams() {
  initReplyToComment({ persons, inputText });
}

initReplyToCommentWithoutParams();

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

  if (inputName.value.isEmpty() || inputText.value.isEmpty()) {
    inputText.value = "";
    inputName.value = "";
    inputName.classList.add("error");
    inputText.classList.add("error");
    return;
  }

  addFormElement.style.display = "none";
  showListLoaderPost();

  postCommentInfo().then(() => {
    addFormElement.style.display = "flex";
    hideListLoaderPost();
  });
});

// То же самое, что и выше, только для добавления коментария по нажатию "Enter"
inputText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // Проверяем, была ли нажата клавиша Enter

    inputName.classList.remove("error");
    inputText.classList.remove("error");

    if (
      inputName.value.isEmpty() ||
      inputText.value.isEmpty() ||
      inputText.value === "\n"
    ) {
      inputText.value = "";
      inputName.value = "";
      inputName.classList.add("error");
      inputText.classList.add("error");
      return;
    }

    addFormElement.style.display = "none";
    showListLoaderPost();

    postCommentInfo().then(() => {
      addFormElement.style.display = "flex";
      hideListLoaderPost();
    });

    // Вызываем рендер функцию для отрисовки нового коментария
    renderComments({ persons, initReplyToCommentWithoutParams });
  }
});
