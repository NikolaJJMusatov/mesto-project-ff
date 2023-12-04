import './pages/index.css';
import { initialCards, createCard, deleteCard, toLike, toPreview } from './components/cards.js';
import { formElement, formNewPlace, handleFormSubmit, handleFormSubmitNewPlace} from './components/modal.js';

//создание карточек
export const placesContainer = document.querySelector(".places__list");

initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard, toLike, toPreview);
  placesContainer.append(newCard);
});

//обработчик событий форм

formElement.addEventListener('submit', handleFormSubmit); 
formNewPlace.addEventListener('submit', handleFormSubmitNewPlace);


