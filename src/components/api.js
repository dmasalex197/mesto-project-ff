import { apiConfig } from "./config.js";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

const getUser = () => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${apiConfig.idGroup}/users/me`,
    {
      headers: {
        authorization: apiConfig.token,
      },
    }
  ).then(checkResponse);
};

const getCards = () => {
  return fetch(`https://mesto.nomoreparties.co/v1/${apiConfig.idGroup}/cards`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then(checkResponse);
};

const getUserGetCards = () => {
  return Promise.all([getUser(), getCards()]);
};

const updateUser = (newName, newDescription) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${apiConfig.idGroup}/users/me`,
    {
      method: "PATCH",
      headers: {
        authorization: apiConfig.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        about: newDescription,
      }),
    }
  ).then(checkResponse);
};

const createNewCard = (newName, newLink) => {
  return fetch(`https://mesto.nomoreparties.co/v1/${apiConfig.idGroup}/cards`, {
    method: "POST",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      link: newLink,
    }),
  }).then(checkResponse);
};

const deleteMyCard = (cardId) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${apiConfig.idGroup}/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: apiConfig.token,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

const addLikeApi = (cardId) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${apiConfig.idGroup}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: apiConfig.token,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

const deleteLikeApi = (cardId) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${apiConfig.idGroup}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: apiConfig.token,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

export {
  getUserGetCards,
  updateUser,
  createNewCard,
  deleteMyCard,
  addLikeApi,
  deleteLikeApi,
};
