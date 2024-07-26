import { deleteMyCard } from "./api.js";

function createCard(userId, card, deleteCard, handleLike, openImagePopup) {
  const templateCards = document.querySelector("#card-template").content;
  const cardElement = templateCards.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  if (userId === card.owner._id) {
    deleteButton.addEventListener("click", () =>
      deleteCard(cardElement, card._id)
    );
  } else {
    deleteButton.remove();
  }
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    openImagePopup(card.link, card.name);
  });
  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });
  return cardElement;
}

const deleteCard = (cardElement, cardId) => {
  deleteMyCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Произошла ошибка, попробуйте позже: ${err}`);
    });
};

function addLike(button) {
  button.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, addLike };
