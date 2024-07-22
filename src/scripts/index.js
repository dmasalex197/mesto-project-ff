import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "../components/modal.js";
import { createCard, deleteCard, addLike } from "../components/card.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
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
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  const card = createCard(element, deleteCard, addLike, openImagePopup);
  placesList.append(card);
});

// @todo: Создание новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  const newCardElement = createCard(newCard, deleteCard, addLike);
  placesList.append(newCardElement);
  closePopup(popupNewCard);
  newCardForm.reset();
}

// @todo: Функция редактирования и сохранения данных о пользователе
function editPopupFormProfile(evt) {
  evt.preventDefault();
  const nameValue = popupFormEditName.value;
  const jobValue = popupFormEditDescription.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closePopup(popupEditTitle);
}

formEditProfile.addEventListener("submit", editPopupFormProfile);
newCardForm.addEventListener("submit", addNewCard);

function openImagePopup(imageLink, caption) {
  popupImageElement.src = imageLink;
  popupImageElement.alt = caption;
  popupImageCaption.textContent = caption;
  openPopup(popupImage);
}

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      const modal = document.querySelector(".popup_is-opened");
      closePopup(modal);
    }
  });
});

profileEditModal.addEventListener("click", () => {
  popupFormEditName.value = profileTitle.textContent;
  popupFormEditDescription.value = profileDescription.textContent;
  openPopup(popupEditTitle);
});

newPlaseModal.addEventListener("click", () => {
  openPopup(popupNewCard);
});

// const form = document.querySelector(".popup__form");
// const formInput = form.querySelector(".popup__input");
// const formError = form.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();
