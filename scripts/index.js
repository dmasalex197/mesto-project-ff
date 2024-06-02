// @todo: Темплейт карточки
const cardTemplate = document.getElementById("card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const addButton = content.querySelector(".profile__add-button");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard(element) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;
  return cardElement;
}
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

addButton.addEventListener("click", function (evt) {
  initialCards.forEach((element) => {
    card = addCard(element);
    placesList.append(card);
  });
});
