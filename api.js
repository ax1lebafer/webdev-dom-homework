import { vulnerabilityPrevention } from "./vulnerabilityPrevention.js";

// Получение комментариев с API
export const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/raul-karabalin/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже");
    }

    return response.json();
  });
};

// Публикация комментария в API
export const postComment = ({ inputText, inputName }) => {
  return fetch("https://wedev-api.sky.pro/api/v1/raul-karabalin/comments", {
    method: "POST",
    body: JSON.stringify({
      text: vulnerabilityPrevention(inputText),
      name: vulnerabilityPrevention(inputName),
      forceError: true,
    }),
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
};
