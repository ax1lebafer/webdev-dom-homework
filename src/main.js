import { getComments, postComment } from './api.js';
import {
  showListLoaderGet,
  hideListLoaderGet,
  hideListLoaderPost,
} from './loaders.js';
import { renderApp } from './renderApp.js';
import { renderComments } from './renderComments.js';
import { vulnerabilityPrevention } from './prototypes.js';
import { format } from 'date-fns';

// Храним информацию о пользователях в массиве
let persons = [];

export let user = null;

export function setUser(newUser) {
  user = newUser;
}

let isLoading = false;

// Подключаю БД с API
export const getCommentsInfo = () => {
  if (!isLoading) {
    showListLoaderGet();
  }

  const addFormElement = document.querySelector('.add-form');

  getComments()
    .then((responseData) => {
      // Преобразую в нужный мне формат данные с API
      const appComments = responseData.comments.map((comment) => {
        const apiDate = comment.date;
        const formattedDate = format(new Date(apiDate), 'yyyy-MM-dd hh.mm.ss');

        return {
          name: comment.author.name,
          comment: comment.text,
          date: formattedDate,
          likes: comment.likes,
          isLiked: comment.isLiked,
        };
      });

      persons = appComments;
      renderComments({ persons });
    })
    .then(() => {
      hideListLoaderGet();
      isLoading = true;
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      } else {
        alert(error);
      }
    })
    .finally(() => {
      if (addFormElement) {
        addFormElement.style.display = 'flex';
      }
      hideListLoaderPost();
    });
};

// Функция для добавления данных о пользователе в БД API
export const postCommentInfo = ({ inputText, inputName }) => {
  const addFormElement = document.querySelector('.add-form');

  return postComment({
    inputText: vulnerabilityPrevention(inputText.value),
    inputName: vulnerabilityPrevention(inputName.value),
    persons,
  })
    .then(() => {
      inputText.value = '';
      return getCommentsInfo();
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      } else {
        alert(error);
      }
    })
    .finally(() => {
      if (addFormElement) {
        addFormElement.style.display = 'flex';
      }
      hideListLoaderPost();
    });
};

renderApp({ persons });
