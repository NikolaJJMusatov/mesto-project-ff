/* Токен: 206e963e-b78c-4d94-9aab-7b923d70b209
Идентификатор группы: wff-cohort-3 */

const configFetch = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '206e963e-b78c-4d94-9aab-7b923d70b209',
      'Content-Type': 'application/json'
  }
};

//ответ сервера
function getRes(res) {
  if (res.ok) {
    return res.json();
  } 
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

//получение данных пользователя с сервера
export const getUserInfo = () => {
  return fetch(`${configFetch.baseUrl}/users/me`, {
    headers: configFetch.headers
  })
  .then(getRes)
};

//получение карточек с сервера
export const getInitialCards = () => {
  return fetch(`${configFetch.baseUrl}/cards`, {
    headers: configFetch.headers
  })
  .then(getRes)
};

//редактирование профиля на сервере
export const setUserInfo = (name, about) => {
  return fetch(`${configFetch.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: configFetch.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(getRes)
};

//добавление новой карточки на сервер
export const loadNewCard = (name, link) => {
  return fetch(`${configFetch.baseUrl}/cards`, {
    method: 'POST',
    headers: configFetch.headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(getRes)
};

//удаление карточки с сервера, которую добавил пользователь
export const deleteCardUserId = (cardId) => {
  return fetch(`${configFetch.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configFetch.headers
  })
  .then(getRes)
};

//постановка лайка
export const makeLike = (cardId, like) => {
  let method = like ? 'DELETE' : 'PUT';

  return fetch(`${configFetch.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: configFetch.headers
  })
    .then(getRes)
};

//изменение аватара на сервере
export const setUserAvatar = (avatarLink) => {
  return fetch(`${configFetch.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configFetch.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    })
  })
    .then(getRes)
};