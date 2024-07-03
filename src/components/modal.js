function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", closePopupEscape);
  popup.addEventListener("mousedown", closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", closePopupEscape);
  popup.removeEventListener("mousedown", closePopupOverlay);
}

function closePopupEscape(evt) {
  if (evt.code === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closePopup(modal);
  }
}

function closePopupOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

export { openPopup, closePopup };
