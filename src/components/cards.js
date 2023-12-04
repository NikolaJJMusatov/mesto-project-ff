export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

import { openPopup } from './modal.js';
const placeTemplate = document.querySelector("#card-template").content;

//Создание карточки

export function createCard(i, funcDel, funcLike, funcPrev) {
  const placeElement = placeTemplate
  .querySelector(".places__item")
  .cloneNode(true);
  placeElement.querySelector(".card__title").textContent = i.name;
  placeElement.querySelector(".card__image").src = i.link;
  placeElement.querySelector(".card__image").alt = i.name;
  placeElement.querySelector(".card__delete-button").addEventListener('click', funcDel);
  placeElement.querySelector(".card__like-button").addEventListener('click', funcLike);
  placeElement.querySelector(".card__image").addEventListener('click', funcPrev);
  return placeElement;
};

//Удаление карточки

export function deleteCard(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
};

//Лайк карточки места

export function toLike(evt) {
    if (evt.target.classList.contains('card__like-button')) {
     evt.target.classList.toggle('card__like-button_is-active');
  }
};

//Превью фото

export function toPreview(evt) {
  const fotoZoom = document.querySelector(".popup_type_image");
  document.querySelector(".popup__caption").textContent = evt.target.closest(".places__item").querySelector(".card__title").textContent;
  document.querySelector(".popup__image").src = evt.target.src;
  document.querySelector(".popup__image").alt = evt.target.alt;
  openPopup(fotoZoom);
};



