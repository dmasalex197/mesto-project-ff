import "../pages/index.css";
import {
  sunset,
  mountains,
  tuscany,
  italy,
  lake,
  city,
  initialCards,
} from "./cards.js";
import { openPopup, closePopup } from "../components/modal.js";
import { createCard } from "../components/card.js";

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const popups = document.querySelectorAll(".popup__content");
const newPlaseModal = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditTitle = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupFormEditName = document.querySelector(".popup__input_type_name");
const popupFormEditDescription = document.querySelector(
  ".popup__input_type_description"
);
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const placeNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = newCardForm.querySelector(".popup__input_type_url");

// @todo: Функция добавления like
function handleLike(button) {
  button.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove();
};

// @todo: Обработчик события submit для формы создания новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const link = linkInput.value;
  const newCard = {
    name: placeName,
    link: link,
  };
  const newCardElement = createCard(newCard, deleteCard, handleLike);
  placesList.prepend(newCardElement);
  closePopup(popupNewCard);
  newCardForm.reset();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = createCard(element, deleteCard, handleLike);
  placesList.append(card);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      const modal = document.querySelector(".popup_is-opened");
      closePopup(modal);
    }
  });
});

// @todo: Функция редактирования и сохранения данных о пользователе
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = popupFormEditName.value;
  const jobValue = popupFormEditDescription.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closePopup(popupEditTitle);
}

profileEditModal.addEventListener("click", () => {
  popupFormEditName.value = profileTitle.textContent;
  popupFormEditDescription.value = profileDescription.textContent;
  openPopup(popupEditTitle);
});

newPlaseModal.addEventListener("click", () => {
  openPopup(popupNewCard);
});
newCardForm.addEventListener("submit", handleNewCardSubmit);
formEditProfile.addEventListener("submit", handleFormSubmit);
