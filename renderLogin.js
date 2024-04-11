import { loginUser, setToken } from "./api.js";

export function renderLogin({ getCommentsInfo }) {
  const appElement = document.querySelector(".app");

  const loginHtml = `<div class="container">
  <div class="login-form">
    <p class="login-heading"><b>Форма входа</b></p>
    <div class="login-wrapper">
      <input class="login-input" type="text" placeholder="Введите логин" />
      <input
        class="password-input"
        type="text"
        placeholder="Введите пароль"
      />
    </div>
    <button class="login-button">Войти</button>
    <div class="register-wrapper">
      <a class="register-link" href="#">Зарегистрироваться</a>
    </div>
  </div>
</div>`;

  appElement.innerHTML = loginHtml;

  const loginInputElement = document.querySelector(".login-input");
  const passwordInputElement = document.querySelector(".password-input");
  const loginButtonElement = document.querySelector(".login-button");

  loginButtonElement.addEventListener("click", () => {
    loginUser({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        setToken(responseData.user.token);
      })
      .then(() => {
        getCommentsInfo();
      });
  });
}
