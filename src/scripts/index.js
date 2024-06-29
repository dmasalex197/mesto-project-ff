import '../pages/index.css';
import {sunset, mountains, tuscany, italy, lake, city, initialCards} from './cards.js'

// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(element, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element, deleteCard);
  placesList.append(card);
});
