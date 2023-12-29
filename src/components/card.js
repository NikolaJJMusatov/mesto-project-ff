import { deleteCardUserId, makeLike } from './api.js';

const placeTemplate = document.querySelector("#card-template").content;

//функция создания карточки
export function createCard(cardData, funcDel, funcLike, funcPrev, uId) {
  const placeElement = placeTemplate
  .querySelector(".places__item")
  .cloneNode(true);
  const sumLikes = placeElement.querySelector(".card__likes");
  placeElement.querySelector(".card__title").textContent = cardData.name;
  placeElement.querySelector(".card__image").src = cardData.link;
  placeElement.querySelector(".card__image").alt = cardData.name;
  sumLikes.textContent = cardData.likes.length;
  placeElement.querySelector(".card__like-button").addEventListener('click', (evt) => funcLike(evt, cardData._id, sumLikes));
  placeElement.querySelector(".card__image").addEventListener('click', ()=> funcPrev(cardData.name, cardData.link));

  if (cardData.owner._id !== uId) {
    placeElement.querySelector(".card__delete-button").remove();
  } else {
    placeElement.querySelector(".card__delete-button").addEventListener('click', (evt)=> funcDel(evt, cardData._id));
  };

  cardData.likes.forEach(element => {
    if (element._id == uId) {
      placeElement.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
    }
  });

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

    makeLike(cardId, like)
      .then(data => {
        evt.target.classList.toggle("card__like-button_is-active");
        sumLikes.textContent = data.likes.length;
      })
};