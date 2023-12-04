import { createCard, deleteCard, toLike, toPreview } from './cards.js';
import { placesContainer } from '../index.js';

//модальные окна
const profileEdit = document.querySelector(".profile__edit-button");
const profileAdd = document.querySelector(".profile__add-button");

const profileEditModal = document.querySelector(".popup_type_edit");
const newCard = document.querySelector(".popup_type_new-card");

const popUps = document.querySelectorAll(".popup")
const buttonsClose = document.querySelectorAll(".popup__close");

profileEdit.addEventListener('click', function() {
  openPopup(profileEditModal);
});

profileAdd.addEventListener('click', function() {
  openPopup(newCard);
});

export function openPopup(popup) {
  popup.classList.toggle("popup_is-opened");
  popup.classList.toggle("popup_is-animated");
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
};

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
};

export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    popUps.forEach((item) => {
      if (item.classList.contains("popup_is-opened")) {
        closePopup(item);
      };
    });
  };
};

export function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    popUps.forEach((item) => {
      if (item.classList.contains("popup_is-opened")) {
        closePopup(item);
      };
    });
  }
};

buttonsClose.forEach((button) => {
  const popupButton = button.closest(".popup");
  button.addEventListener('click', () => { closePopup(popupButton); });
});

//Форма редактирования профиля

export const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements["name"];
const jobInput = formElement.elements["description"];

export function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditModal);
}

//Форма добавления карточки места

export const formNewPlace = document.forms["new-place"];
const nameNewPlace = formNewPlace.elements["place-name"];
const linkNewPlace = formNewPlace.elements["link"];

export function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  const newCardFromForm = createCard({ name: nameNewPlace.value, link: linkNewPlace.value }, deleteCard, toLike, toPreview);
  placesContainer.prepend(newCardFromForm);
  formNewPlace.reset();
  closePopup(newCard);
}