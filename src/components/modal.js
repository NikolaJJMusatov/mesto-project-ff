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
    closePopup(document.querySelector(".popup_is-opened"));
  };
};

export function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};