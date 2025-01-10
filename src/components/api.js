const config = {
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
    })
    .then(({ ok, headers, status }) => {
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
    return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(handleResponse);
  };
  
  const createCard = ({ name, link }) => {
    return checkImageUrl(link)
      .then(() =>
        fetch(`${config.baseUrl}/cards`, {
          headers: config.headers,
          method: 'POST',
          body: JSON.stringify({
            name,
            link,
          }),
        })
        .then(handleResponse)
      )
      .catch((error) => Promise.reject(error));
  };
  
  const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      headers: config.headers,
      method: 'DELETE',
    })
    .then(handleResponse);
  };
  
  const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      headers: config.headers,
      method: 'PUT',
    })
    .then(handleResponse);
  };
  
  const unLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      headers: config.headers,
      method: 'DELETE',
    })
    .then(handleResponse);
  };
  
  const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(handleResponse);
  };
  
  const updateUserInfo = ({ name, description }) => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about: description,
      }),
    })
    .then(handleResponse);
  };
  
  const updateUserAvatar = (url) => {
    return checkImageUrl(url)
      .then(() =>
        fetch(`${config.baseUrl}/users/me/avatar`, {
          headers: config.headers,
          method: 'PATCH',
          body: JSON.stringify({
            avatar: url,
          }),
        })
        .then(handleResponse)
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