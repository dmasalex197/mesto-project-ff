import { deleteMyCard, addLikeApi, deleteLikeApi } from "./api.js";

function createCard(userId, card, deleteCard, handleLike, openImagePopup) {
  const templateCards = document.querySelector("#card-template").content;
  const cardElement = templateCards.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardElemntLikes = cardElement.querySelector(".card__like-number");

  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElemntLikes.textContent = card.likes.length;

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

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    handleLike(likeButton, card._id, cardElemntLikes);
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

function addLike(button, cardId, cardLikes) {
  const likeMethod = button.classList.contains("card__like-button_is-active")
    ? deleteLikeApi
    : addLikeApi;
  likeMethod(cardId)
    .then((data) => {
      button.classList.remove("card__like-button_is-active");
      cardLikes.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(`Произошла ошибка, попробуйте позже: ${err}`);
    });
}

export { createCard, deleteCard, addLike };
