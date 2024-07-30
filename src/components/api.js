import { apiConfig } from "./config.js";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}

const getUser = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then(checkResponse);
};

const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then(checkResponse);
};

const getUserAndCards = () => {
  return Promise.all([getUser(), getCards()]);
};

const updateUser = (newName, newDescription) => {
  return fetch(
    `${apiConfig.baseUrl}/users/me`,
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
  return fetch(`${apiConfig.baseUrl}/cards`, {
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
    `${apiConfig.baseUrl}/cards/${cardId}`,
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
    `${apiConfig.baseUrl}/cards/likes/${cardId}`,
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
    `${apiConfig.baseUrl}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: apiConfig.token,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

const updateAvatarImage = (newAvatarImageUrl) => {
  return fetch(
    `${apiConfig.baseUrl}/users/me/avatar`,
    {
      method: "PATCH",
      headers: {
        authorization: apiConfig.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatarImageUrl,
      }),
    }
  ).then(checkResponse);
};

export {
  getUserAndCards,
  updateUser,
  createNewCard,
  deleteMyCard,
  addLikeApi,
  deleteLikeApi,
  updateAvatarImage,
};
