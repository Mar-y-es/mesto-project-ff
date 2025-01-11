/*const CONFIG = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '87b41c2a-cd78-48a1-9843-081cf077e7f5',
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
  return checkImageUrl(link).then(() =>
    fetch(`${CONFIG.baseUrl}/cards`, {
      headers: CONFIG.headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(handleResponse)
  );
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
};*/

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-29",
  headers: {
    authorization: "87b41c2a-cd78-48a1-9843-081cf077e7f5",
    "Content-Type": "application/json",
  },
};

export const getResData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
///Загрузка информации о пользователе с сервера
export const getUserInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => getResData(res));
};
///Загрузка карточек с сервера
export const getInitialCards = async () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => getResData(res));
};
///
export const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};
/////редактирование профайла
export const editProfile = async (userProfileName, userProfileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileName,
      about: userProfileAbout,
    }),
  }).then((res) => getResData(res));
};

////Добавление новой карточки на сервер
export const postNewCard = async (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then((res) => getResData(res));
};
///+ лайк
export const putLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResData(res));
};

///удаление лайка
export const deleteLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResData(res));
};
// удаление карточки
export const deleteMyCard = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResData(res));
};

export const updateNewAvatar = async (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => getResData(res));
};