import * as ddd from "./prototypes.js";
import {
  initLikeCommentListeners,
  initReplyToComment,
} from "./initFunctions.js";
import { showListLoaderPost, hideListLoaderPost } from "./loaders.js";

// Рендер комментариев
export function renderComments({ persons, postCommentInfo }) {
  const appElement = document.querySelector(".app");

  const commentsHtml = persons
    .map((person, index) => {
      return `<li class="comment">
          <div class="comment-header">
            <div>${person.name}</div>
            <div>${person.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${person.comment.understandQuote()}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${person.likes}</span>
              <button data-index="${index}" data-like-counts="${
        person.likes
      }" class="like-button ${
        persons[index].isLiked ? "-active-like" : ""
      }"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  const appHtml = `
    <ul class="comments">${commentsHtml}</ul>
    <div class="add-form">
      <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
        <button class="add-form-button delete-form-button">
          Удалить последний комментарий
        </button>
      </div>
    </div>`;

  appElement.innerHTML = appHtml;

  const inputName = document.querySelector(".add-form-name");
  const inputText = document.querySelector(".add-form-text");
  const addButtonElement = document.querySelector(".add-form-button");
  const addFormElement = document.querySelector(".add-form");

  initLikeCommentListeners({ persons, renderComments, postCommentInfo });
  initReplyToComment({ persons, inputText });

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

    postCommentInfo({ inputText, inputName }).then(() => {
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

      postCommentInfo({ inputText, inputName }).then(() => {
        addFormElement.style.display = "flex";
        hideListLoaderPost();
      });

      // Вызываем рендер функцию для отрисовки нового коментария
      renderComments({ persons, postCommentInfo });
    }
  });
}
