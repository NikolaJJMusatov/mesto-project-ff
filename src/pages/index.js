import './index.css';
import { createCard, deleteCard, toLike } from '../components/card.js';
import { openPopup, closePopup, closePopupOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, getInitialCards, setUserInfo, loadNewCard, setUserAvatar } from '../components/api.js';

const placesContainer = document.querySelector(".places__list");
const popUps = document.querySelectorAll(".popup");
const allButtonsClosePopup = document.querySelectorAll(".popup__close");
const popupProfile = document.querySelector(".popup_type_edit");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const popupEditAvatar = document.querySelector(".popup_type_new-avatar");
const buttonOpenPopupEditAvatar = document.querySelector(".profile__image");
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
const buttonSubmitPopupProfile = formProfile.querySelector(".button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
//Переменные изменения аватара
const formAvatar = document.forms["new-avatar"];
const fieldLinkFormAvatar = formAvatar.elements["new-avatar-link"];
const buttonSubmitPopupEditAvatar = formAvatar.querySelector(".button");
const avatarProfile = document.querySelector(".profile__image-avatar");
//Переменные добавления карточки места
const formAddNewCard = document.forms["new-place"];
const fieldNameFormAddNewCard = formAddNewCard.elements["place-name"];
const fieldLinkFormAddNewCard = formAddNewCard.elements["link"];
const buttonSubmitPopupAddNewCard = formAddNewCard.querySelector(".button");
//Переменная id пользователя
let userId;
//Массив валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

//Функция создания карточек
function renderCards(data) {
  data.forEach((item) => {
    const newCard = createCard(item, deleteCard, toLike, toPreviewImage, userId);
    placesContainer.append(newCard);
  });
};

//Функция редактирования профиля
function editProfile(evt) {
  evt.preventDefault();
  buttonSubmitPopupProfile.textContent = "Сохранение...";
  setUserInfo(fieldNameFormProfile.value, fieldJobFormProfile.value)
    .then(data => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      avatarProfile.src = data.avatar;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitPopupProfile.textContent = "Сохранить";
    })
};

//Функция изменения аватара
function editAvatar(evt) {
  evt.preventDefault();
  buttonSubmitPopupEditAvatar.textContent = "Сохранение..."
  setUserAvatar(fieldLinkFormAvatar.value)
    .then(data => {
      avatarProfile.src = data.avatar;
      formAvatar.reset();
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitPopupEditAvatar.textContent = "Сохранить";
    })
};

//Функция добавления карточки места
function addNewCard(evt) {
  evt.preventDefault();
  buttonSubmitPopupAddNewCard.textContent = "Сохранение...";
  loadNewCard(fieldNameFormAddNewCard.value, fieldLinkFormAddNewCard.value)
    .then(data => {
      const newCard = createCard(data, deleteCard, toLike, toPreviewImage, userId)
      placesContainer.prepend(newCard);
      formAddNewCard.reset();
      closePopup(popupAddNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitPopupAddNewCard.textContent = "Создать";
    })
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
formAvatar.addEventListener('submit', editAvatar);
formAddNewCard.addEventListener('submit', addNewCard);

//обработчик редактирования профиля
buttonOpenPopupProfile.addEventListener('click', function() {
  fieldNameFormProfile.value = profileName.textContent;
  fieldJobFormProfile.value = profileJob.textContent;
  openPopup(popupProfile);
  clearValidation(formProfile, validationConfig);
});

//обработчик добавления карточки
buttonOpenPopupAddNewCard.addEventListener('click', function() {
  fieldNameFormAddNewCard.value = '';
  fieldLinkFormAddNewCard.value = '';
  openPopup(popupAddNewCard);
  clearValidation(formAddNewCard, validationConfig);
});

//обработчик на изменение аватара
buttonOpenPopupEditAvatar.addEventListener('click', function() {
  fieldLinkFormAvatar.value = '';
  openPopup(popupEditAvatar);
  clearValidation(formAvatar, validationConfig);
});

//обработчики клика закрытия модальных окон
allButtonsClosePopup.forEach((button) => {
  const popupButton = button.closest(".popup");
  button.addEventListener('click', () => { closePopup(popupButton); });
});

popUps.forEach((item) => {
  item.addEventListener ('click', closePopupOverlay);
});

//включение проверки валидности всем формам
enableValidation(validationConfig);

//рендер данных профиля и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    avatarProfile.src = userInfo.avatar;
    renderCards(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })