import "../pages/index.css";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "../components/modal.js";
import { createCard, deleteCard, addLike } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { validationConfig } from "../components/config.js";
import {
  getUserGetCards,
  updateUser,
  createNewCard,
  updateAvatarImage,
} from "../components/api.js";

const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup__content");
const newPlaseModal = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector(".profile__edit-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditTitle = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
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

const popupEditAvatar = document.querySelector(".popup_type_change-avatar");
const changeAvatarForm = document.forms["change-avatar"];
const newAvatarUrl = changeAvatarForm.elements["place-avatar-url"];

// @todo: Вывести карточки на страницу
function startInitialCards(userId, initCards) {
  initCards.forEach((element) => {
    const card = createCard(
      userId,
      element,
      deleteCard,
      addLike,
      openImagePopup
    );
    placesList.append(card);
  });
}

// @todo: Создание новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  createNewCard(placeNameInput.value, linkInput.value)
    .then((data) => {
      const newCard = {
        name: data.name,
        link: data.link,
      };
      const newCardElement = createCard(
        data.owner._id,
        data,
        newCard,
        deleteCard,
        addLike
      );
      placesList.append(newCardElement);
      closePopup(popupNewCard);
      newCardForm.reset();
    })
    .catch((err) => {
      console.log(`Произошла ошибка, попробуйте позже: ${err}`);
    });
}

// @todo: Функция редактирования и сохранения данных о пользователе
function editPopupFormProfile(evt) {
  evt.preventDefault();
  const nameValue = popupFormEditName.value;
  const jobValue = popupFormEditDescription.value;
  updateUser(nameValue, jobValue)
    .then(() => {
      profileTitle.textContent = nameValue;
      profileDescription.textContent = jobValue;
      closePopup(popupEditTitle);
    })
    .catch((err) => {
      console.log(`Произошла ошибка, попробуйте позже: ${err}`);
    });
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
  popup.addEventListener("click", closePopupOverlay);
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
});

profileEditModal.addEventListener("click", () => {
  popupFormEditName.value = profileTitle.textContent;
  popupFormEditDescription.value = profileDescription.textContent;
  clearValidation(popupEditTitle, validationConfig);
  openPopup(popupEditTitle);
});

newPlaseModal.addEventListener("click", () => {
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});

enableValidation(validationConfig);

const setUserProfile = (user) => {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style = `background-image: url(${user.avatar})`;
};

getUserGetCards()
  .then(([user, cards]) => {
    startInitialCards(user._id, cards);
    setUserProfile(user);
  })
  .catch((err) => {
    console.log(`Произошла ошибка, попробуйте позже: ${err}`);
  });

profileImage.addEventListener("click", () => {
  clearValidation(popupEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

popupEditAvatar.addEventListener("click", closePopup);

popupEditAvatar
  .querySelector(".popup__close")
  .addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });

const changeAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  updateAvatarImage(newAvatarUrl.value)
    .then(() => {
      profileImage.style = `background-image: url(${newAvatarUrl.value})`;
      popupEditAvatar.reset();
      closePopup(evt.target.closest(".popup"));
    })
    .catch((err) => {
      console.log(`Произошла ошибка, попробуйте позже: ${err}`);
    });
};

popupEditAvatar.addEventListener("submit", changeAvatarFormSubmit);
