import { popUps } from '../pages/index.js';

export function openPopup(popup) {
  popup.classList.toggle("popup_is-opened");
  document.addEventListener('keydown', closePopupEsc);
};

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
  if (evt.key === 'Escape' ) {
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