import * as ddd from "./prototypes.js";
import {
  initLikeCommentListeners,
  initReplyToComment,
} from "./initFunctions.js";
import { user } from "./main.js";

// Рендер комментариев
export function renderComments({ persons }) {
  const commentsContainerElement = document.querySelector(".comments");

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

  commentsContainerElement.innerHTML = commentsHtml;

  if (user) {
    initLikeCommentListeners({ persons });
    initReplyToComment({ persons});
  }
}
