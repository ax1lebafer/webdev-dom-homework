import { showListLoaderPost, hideListLoaderPost } from "./loaders.js";
import { postCommentInfo, user } from "./main.js";
import { renderComments } from "./renderComments.js";

// Функция добавления комментрий
export function initAddCommentListeners({ persons }) {
  const inputName = document.querySelector(".add-form-name");
  const inputText = document.querySelector(".add-form-text");
  const addButtonElement = document.querySelector(".add-form-button");
  const addFormElement = document.querySelector(".add-form");

  // initLikeCommentListeners({ persons, renderComments, postCommentInfo });
  // initReplyToComment({ persons, inputText });

  // Кнопка "Написать" будет недоступна прям в момент посещения сайта, так как поля пустые
  // в дальнейшем кнопка разблокируется, если заполнить поля каким-либо текстом
  if (addButtonElement) {
    addButtonElement.disabled = true;
  }

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
      renderComments({ persons, postCommentInfo, user });
    }
  });
}

// Функция для лайков комментариев
export function initLikeCommentListeners({ persons }) {
  const likeCommentButtonsElements = document.querySelectorAll(".like-button");

  for (const likeCommentButtonElement of likeCommentButtonsElements) {
    const index = likeCommentButtonElement.dataset.index;
    let likesCounts = likeCommentButtonElement.dataset.likeCounts;

    likeCommentButtonElement.addEventListener("click", (event) => {
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

      renderComments({ persons });
    });
  }
}

// Ответ на комментарий
export function initReplyToComment({ persons }) {
  const inputText = document.querySelector(".add-form-text");

  const commentsBodyElements = document.querySelectorAll(".comment");
  commentsBodyElements.forEach((comment, index) => {
    comment.addEventListener("click", () => {
      inputText.value = `QUOTE_BEGIN ${persons[index].name}: \n ${persons[index].comment} QUOTE_END \n`;
    });
  });
}

// Удаление последнего коментария посредством удаления последнего элемента из массива
export function initDeleteLastComentListener({
  persons,
  renderComments,
  postCommentInfo,
}) {
  const deleteButtonElement = document.querySelector(".delete-form-button");

  deleteButtonElement.addEventListener("click", () => {
    persons.pop();

    renderComments({ persons, postCommentInfo, user });
  });
}
