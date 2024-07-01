const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", closePopupEscape);
  popup.addEventListener("mousedown", closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.body.style.overflow = "";
  document.addEventListener("keydown", closePopupEscape);
}

function closePopupEscape(evt) {
  if (evt.code === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closePopup(modal);
  }
}

function closePopupOverlay(event) {
  if (event.target.classList.contains("popup")) {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function openImagePopup(imageLink, caption) {
  popupImageElement.src = imageLink;
  popupImageElement.alt = caption;
  popupImageCaption.textContent = caption;
  openPopup(popupImage);
}

export { openPopup, closePopup, openImagePopup };
