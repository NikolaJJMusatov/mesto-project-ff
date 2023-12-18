import './index.css';
import { initialCards } from '../components/cards.js';
import { createCard, deleteCard, toLike } from '../components/card.js';
import { openPopup, closePopup, closePopupOverlay } from '../components/modal.js';
import { useClass, enableValidation, clearValidation } from '../components/validation.js';

const placesContainer = document.querySelector(".places__list");
export const popUps = document.querySelectorAll(".popup");
const allButtonsClosePopup = document.querySelectorAll(".popup__close");
const popupProfile = document.querySelector(".popup_type_edit");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const buttonOpenPopupAddNewCard = document.querySelector(".profile__add-button");
//Переменные превью фото
const popupFullImage = document.querySelector(".popup_type_image");
const imgPopupFullImage = document.querySelector(".popup__image");
const namePopupFullImage = document.querySelector(".popup__caption");
//Переменные редактирования профиля
const formProfile = document.forms["edit-profile"];
const fieldNameFormProfile = formProfile.elements["name"];
const fieldJobFormProfile = formProfile.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
//Переменные добавления карточки места
const formAddNewCard = document.forms["new-place"];
const fieldNameFormAddNewCard = formAddNewCard.elements["place-name"];
const fieldLinkFormAddNewCard = formAddNewCard.elements["link"];

//создание карточек
initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard, toLike, toPreviewImage);
  placesContainer.append(newCard);
});

//Функция редактирования профиля
function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = fieldNameFormProfile.value;
  profileJob.textContent = fieldJobFormProfile.value;
  closePopup(popupProfile);
};

//Функция добавления карточки места
function addNewCard(evt) {
  evt.preventDefault();
  const newCardFromForm = createCard({ name: fieldNameFormAddNewCard.value, link: fieldLinkFormAddNewCard.value }, deleteCard, toLike, toPreviewImage);
  placesContainer.prepend(newCardFromForm);
  formAddNewCard.reset();
  closePopup(popupAddNewCard);
};

//функция превью фото
function toPreviewImage(name, link) {
  imgPopupFullImage.src = link;
  imgPopupFullImage.alt = name;
  namePopupFullImage.textContent = name;
  openPopup(popupFullImage);
};

//обработчик событий форм
formProfile.addEventListener('submit', editProfile);
formAddNewCard.addEventListener('submit', addNewCard);

//обработчики редактирования профиля и добавления карточки
buttonOpenPopupProfile.addEventListener('click', function() {
  fieldNameFormProfile.value = profileName.textContent;
  fieldJobFormProfile.value = profileJob.textContent;
  openPopup(popupProfile);
  clearValidation(formProfile, useClass);
});

buttonOpenPopupAddNewCard.addEventListener('click', function() {
  fieldNameFormAddNewCard.value = '';
  fieldLinkFormAddNewCard.value = '';
  openPopup(popupAddNewCard);
  clearValidation(formAddNewCard, useClass);
});

//обработчики клика закрытия модальных окон
allButtonsClosePopup.forEach((button) => {
  const popupButton = button.closest(".popup");
  button.addEventListener('click', () => { closePopup(popupButton); });
});

popUps.forEach((item) => {
  item.addEventListener ('click', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopupOverlay(item);
    }
  })
})

//включение проверки валидности всем формам
enableValidation(useClass);