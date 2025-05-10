const config = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-37', 
  headers: {
    authorization: 'ccf89432-6237-4ba7-8c4c-8f98f8f53a78',
    'Content-Type': 'application/json'
  }
}

// загрузка карточек с сервера

const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

// загрузка информации о пользователе

const getUserData = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

// редактирование профиля

const editProfile = (info) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(info)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}  

// добавление новой карточки

const addNewCard = (info) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(info)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

// удаление карточки

const deleteMyCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

// постановка и снятие лайка

const putLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const removeLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }) 
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

// обновление аватара

const loadNewAvatar = (info) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(info)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export { getInitialCards, getUserData, editProfile, addNewCard, deleteMyCard, putLikeCard, removeLikeCard, loadNewAvatar };