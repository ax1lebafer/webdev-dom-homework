// Функция добавляет лоадер загрузки комментариев
export function showListLoaderGet() {
  const listLoader = document.querySelector('.list-loader-get');
  listLoader.classList.remove('hidden');
}

// Функция удаляет лоадер загрузки комментариев
export function hideListLoaderGet() {
  const listLoader = document.querySelector('.list-loader-get');
  listLoader.classList.add('hidden');
}

// Функция добавляет лоадер отправки комментария
export function showListLoaderPost() {
  const listLoader = document.querySelector('.list-loader-post');
  listLoader.classList.remove('hidden');
}

// Функция удаляет лоадер отправки комментария
export function hideListLoaderPost() {
  const listLoader = document.querySelector('.list-loader-post');
  listLoader.classList.add('hidden');
}
