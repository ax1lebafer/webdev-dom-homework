import { initAddCommentListeners } from './initFunctions.js';
import { user } from './main.js';
import { renderLogin } from './renderLogin.js';

export function renderForm({ persons }) {
  const formElement = document.querySelector('.form');

  formElement.innerHTML = user
    ? `<div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
      value="${user.name}"
      readonly
      disabled
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
    </div>`
    : `<div class="auth-form">Чтобы оставить комментарий, <button id="auth-button" type="button">авторизуйтесь.</button>
    </div>`;

  const buttonElement = document.querySelector('#auth-button');

  if (buttonElement) {
    buttonElement.addEventListener('click', () => {
      window.scrollTo(0, 0);
      renderLogin({ persons });
    });
  }

  if (user) {
    initAddCommentListeners({ persons });
  }
}
