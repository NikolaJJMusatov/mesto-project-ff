import { userId } from '../pages/index.js';
import { deleteCardUserId, madeLike } from './api.js';

const placeTemplate = document.querySelector("#card-template").content;

//функция создания карточки
export function createCard(i, funcDel, funcLike, funcPrev) {
  const placeElement = placeTemplate
  .querySelector(".places__item")
  .cloneNode(true);
  const sumLikes = placeElement.querySelector(".card__likes");
  placeElement.querySelector(".card__title").textContent = i.name;
  placeElement.querySelector(".card__image").src = i.link;
  placeElement.querySelector(".card__image").alt = i.name;
  sumLikes.textContent = i.likes ? i.likes.length : 0;
  placeElement.querySelector(".card__like-button").addEventListener('click', (evt) => funcLike(evt, i._id, sumLikes));
  placeElement.querySelector(".card__image").addEventListener('click', ()=> funcPrev(i.name, i.link));

  if (i.owner._id !== userId) {
    placeElement.querySelector(".card__delete-button").remove();
  } else {
    placeElement.querySelector(".card__delete-button").addEventListener('click', (evt)=> funcDel(evt, i._id));
  };

  return placeElement;
};

//Функция удаления карточки
export function deleteCard(evt, cardId) {
  deleteCardUserId(cardId)
    .then(() => {
      const listItem = evt.target.closest(".places__item");
      listItem.remove();
    })
};

//Функция лайка карточки места
export function toLike(evt, cardId, sumLikes) {
  const like = evt.target.classList.contains("card__like-button_is-active");

    madeLike(cardId, like)
      .then(data => {
        evt.target.classList.toggle("card__like-button_is-active");
        sumLikes.textContent = data.likes.length;
      })
};