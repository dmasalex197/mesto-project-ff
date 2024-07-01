import { openImagePopup } from "./modal";

const templateCards = document.querySelector("#card-template").content;
const cardElement = templateCards.querySelector(".card").cloneNode(true);
const deleteButton = cardElement.querySelector(".card__delete-button");
const likeButton = cardElement.querySelector(".card__like-button");

function createCard(card, deleteCard, handleLike) {
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openImagePopup(card.link, card.name);
  });
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });
  return cardElement;
}

export { createCard };
