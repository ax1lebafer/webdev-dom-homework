// Функция добавляет лоадер загрузки комментариев
export const showListLoaderGet = () => {
  const listLoader = document.querySelector(".list-loader-get");
  if(listLoader.classList.contains('hidden')) {
    listLoader.classList.remove("hidden");
  }
};

// Функция удаляет лоадер загрузки комментариев
export const hideListLoaderGet = () => {
  const listLoader = document.querySelector(".list-loader-get");
  listLoader.classList.add("hidden");
};

// Функция добавляет лоадер отправки комментария
export const showListLoaderPost = () => {
  const listLoader = document.querySelector(".list-loader-post");
  listLoader.classList.remove("hidden");
};

// Функция удаляет лоадер отправки комментария
export const hideListLoaderPost = () => {
  const listLoader = document.querySelector(".list-loader-post");
  listLoader.classList.add("hidden");
};
