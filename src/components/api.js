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

const getUserAndCards = () => {
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

export { getUserAndCards, updateUser };
