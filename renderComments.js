import * as ddd from "./prototypes.js";
import {
  initLikeCommentListeners,
  initReplyToComment
} from "./initFunctions.js";

// Рендер комментариев
const commentsBox = document.querySelector(".comments");

export function renderComments({ persons, inputText }) {
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

  commentsBox.innerHTML = commentsHtml;

  initLikeCommentListeners({ persons, renderComments, inputText });
  initReplyToComment({ persons, inputText });
}
