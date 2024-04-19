const commentUrl = "https://wedev-api.sky.pro/api/v2/ax1lebafer3/comments";
const loginUrl = "https://wedev-api.sky.pro/api/user/login";
const registerUrl = "https://wedev-api.sky.pro/api/user";

export let token;

export function setToken(newToken) {
  token = newToken;
}

// Получение комментариев с API
export function getComments() {
  return fetch(commentUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже");
    }

    return response.json();
  });
}

// Публикация комментария в API
export function postComment({ inputText, inputName }) {
  return fetch(commentUrl, {
    method: "POST",
    body: JSON.stringify({
      text: inputText,
      name: inputName,
      forceError: true,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(`${response.status} ошибка сервера`);

    if (response.status === 400) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    }

    if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже");
    }

    return response.json();
  });
}

// Авторизация пользователя
export function loginUser({ login, password }) {
  return fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }

    return response.json();
  });
}

// Регистрация пользователя
export function registerUser({ login, password, name }) {
  return fetch(registerUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер недоступен");
    }

    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }

    return response.json();
  });
}
