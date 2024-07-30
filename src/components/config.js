const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-18",
  token: "850ce0bf-3ff5-4c94-b7b5-b0b088ad7a56",
  idGroup: "wff-cohort-18",
};

export { validationConfig, apiConfig };
