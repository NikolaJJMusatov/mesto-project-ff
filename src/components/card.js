const placeTemplate = document.querySelector("#card-template").content;

//функция создание карточки
export function createCard(i, funcDel, funcLike, funcPrev) {
  const placeElement = placeTemplate
  .querySelector(".places__item")
  .cloneNode(true);
  placeElement.querySelector(".card__title").textContent = i.name;
  placeElement.querySelector(".card__image").src = i.link;
  placeElement.querySelector(".card__image").alt = i.name;
  placeElement.querySelector(".card__delete-button").addEventListener('click', funcDel);
  placeElement.querySelector(".card__like-button").addEventListener('click', funcLike);
  placeElement.querySelector(".card__image").addEventListener('click', ()=> funcPrev(i.name, i.link));
  return placeElement;
};

//Функция удаления карточки
export function deleteCard(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
};

//Функция лайка карточки места
export function toLike(evt) {
    if (evt.target.classList.contains('card__like-button')) {
     evt.target.classList.toggle('card__like-button_is-active');
  }
};