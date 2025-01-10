const CONFIG = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '6fe6d9ae-5e51-48dc-9564-eb9b80b948d9',
    'Content-Type': 'application/json',
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
};

const checkImageUrl = (url) => {
  return fetch(url, {
    method: 'HEAD',
  }).then(({ ok, headers, status }) => {
    if (ok) {
      if (headers.get('Content-Type').includes('image')) {
        return Promise.resolve();
      }

      return Promise.reject('Ошибка: URL ссылается на не изображение');
    }

    return Promise.reject(`Ошибка: ${status}`);
  });
};

const getInitialCards = () => {
  return fetch(`${CONFIG.baseUrl}/cards`, { headers: CONFIG.headers }).then(
    handleResponse
  );
};

const createCard = ({ name, link }) => {
  return checkImageUrl(link)
    .then(() =>
      fetch(`${CONFIG.baseUrl}/cards`, {
        headers: CONFIG.headers,
        method: 'POST',
        body: JSON.stringify({
          name,
          link,
        }),
      }).then(handleResponse)
    )
    .catch((error) => Promise.reject(error));
};

const deleteCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
    headers: CONFIG.headers,
    method: 'DELETE',
  }).then(handleResponse);
};

const likeCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    headers: CONFIG.headers,
    method: 'PUT',
  }).then(handleResponse);
};

const unLikeCard = (cardId) => {
  return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
    headers: CONFIG.headers,
    method: 'DELETE',
  }).then(handleResponse);
};

const getUserInfo = () => {
  return fetch(`${CONFIG.baseUrl}/users/me`, { headers: CONFIG.headers }).then(
    handleResponse
  );
};

const updateUserInfo = ({ name, description }) => {
  return fetch(`${CONFIG.baseUrl}/users/me`, {
    headers: CONFIG.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about: description,
    }),
  }).then(handleResponse);
};

const updateUserAvatar = (url) => {
  return checkImageUrl(url)
    .then(() =>
      fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
        headers: CONFIG.headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: url,
        }),
      }).then(handleResponse)
    )
    .catch((error) => Promise.reject(error));
};

export {
  getInitialCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
};