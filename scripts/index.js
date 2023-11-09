// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesContainer = document.querySelector(".places__list");
const placeTemplate = document.querySelector("#card-template").content;

function createCard(i, func) {
  const placeElement = placeTemplate
  .querySelector(".places__item")
  .cloneNode(true);
  placeElement.querySelector(".card__title").textContent = i.name;
  placeElement.querySelector(".card__image").src = i.link;
  placeElement.querySelector(".card__image").alt = i.name;
  placeElement.querySelector(".card__delete-button").addEventListener('click', func);
  return placeElement;
};

function deleteCard(evt) {
  const listItem = evt.target.closest(".places__item");
  listItem.remove();
};

initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard);
  placesContainer.append(newCard);
});


