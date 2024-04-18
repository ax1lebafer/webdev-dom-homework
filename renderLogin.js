import { loginUser, setToken } from "./api.js";
import { setUser } from "./main.js";
import { renderApp } from "./renderApp.js";

export function renderLogin({ persons }) {
  const containerElement = document.querySelector(".container");

  containerElement.innerHTML = `
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
  </div>`;

  const loginButtonElement = document.querySelector(".login-button");
  const loginInputElement = document.querySelector(".login-input");
  const passwordInputElement = document.querySelector(".password-input");

  loginButtonElement.addEventListener("click", () => {
    if (loginInputElement.value.trim() === "") {
      alert("Введите логин");
      return;
    }

    if (passwordInputElement.value.trim() === "") {
      alert("Введите пароль");
      return;
    }

    loginUser({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        setUser(responseData.user);
        setToken(responseData.user.token);
        renderApp({ persons });
      })
      .catch((error) => {
        if (error.message === "Нет авторизации") {
          alert("Не верный логин или пароль");
        }
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуй позже");
          return;
        }
        if (error.message === "Failed to fetch") {
          alert("Кажется что-то пошло не так, попробуйте позже");
        }

        alert(error);
      });
  });
}
