// Функция для лайков комментариев
export function initLikeCommentListeners({ persons, renderComments }) {
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
export function initReplyToComment({ persons, inputText }) {
  const commentsBodyElements = document.querySelectorAll(".comment");
  commentsBodyElements.forEach((comment, index) => {
    comment.addEventListener("click", () => {
      inputText.value = `QUOTE_BEGIN ${persons[index].name}: \n ${persons[index].comment} QUOTE_END \n`;
    });
  });
}

// Удаление последнего коментария посредством удаления последнего элемента из массива
export function initDeleteLastComentListener({ persons, renderComments }) {
  const deleteButtonElement = document.querySelector(".delete-form-button");

  deleteButtonElement.addEventListener("click", () => {
    persons.pop();

    renderComments({ persons });
  });
}
