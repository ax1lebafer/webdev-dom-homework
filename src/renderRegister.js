import { registerUser, setToken } from './api.js';
import { setUser } from './main.js';
// import * as ddd from './prototypes.js';
import { vulnerabilityPrevention } from './prototypes.js';
import { renderApp } from './renderApp.js';
import { renderLogin } from './renderLogin.js';

export function renderRegister({ persons }) {
  const containerElement = document.querySelector('.container');

  containerElement.innerHTML = `<div class="login-form">
  <p class="login-heading"><b>Форма регистрации</b></p>
  <div class="login-wrapper">
    <input class="name-input" type="text" placeholder="Введите имя" />
    <input class="login-input" type="text" placeholder="Введите логин" />
    <div class="password-wrapper">
      <input
        class="password-input"
        type="password"
        placeholder="Введите пароль"
      />
      <span class="show-password-btn" id="showPasswordBtn"
        >&#128065;</span
      >
    </div>
  </div>
  <button class="register-button">Зарегистрироваться</button>
  <div class="register-wrapper">
    <a class="login-link" href="#">Войти</a>
  </div>`;

  const nameInputElement = document.querySelector('.name-input');
  const loginInputElement = document.querySelector('.login-input');
  const passwordInputElement = document.querySelector('.password-input');
  const registerButtonElement = document.querySelector('.register-button');
  const loginLinkElement = document.querySelector('.login-link');
  const showPasswordBtn = document.getElementById('showPasswordBtn');

  showPasswordBtn.addEventListener('click', function () {
    if (passwordInputElement.type === 'password') {
      passwordInputElement.type = 'text';
      showPasswordBtn.textContent = '🙈';
    } else {
      passwordInputElement.type = 'password';
      showPasswordBtn.textContent = '👁️';
    }
  });

  registerButtonElement.addEventListener('click', () => {
    if (nameInputElement.value.trim() === '') {
      alert('Введите имя');
      return;
    }

    if (loginInputElement.value.trim() === '') {
      alert('Введите логин');
      return;
    }

    if (passwordInputElement.value.trim() === '') {
      alert('Введите пароль');
      return;
    }

    registerUser({
      login: vulnerabilityPrevention(loginInputElement.value),
      password: vulnerabilityPrevention(passwordInputElement.value),
      name: vulnerabilityPrevention(nameInputElement.value),
    })
      .then((responseData) => {
        setToken(responseData.user.token);
        setUser(responseData.user);
        renderApp({ persons });
      })
      .catch((error) => {
        if (error.message === 'Такой пользователь уже существует') {
          alert('Такой пользователь уже существует');
        }
      });
  });

  loginLinkElement.addEventListener('click', () => {
    renderLogin({ persons });
  });
}
