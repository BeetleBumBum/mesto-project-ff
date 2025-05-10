const config = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-37', 
  headers: {
    authorization: 'ccf89432-6237-4ba7-8c4c-8f98f8f53a78',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

// загрузка карточек с сервера

const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
  .then(handleResponse);
}

// загрузка информации о пользователе

const getUserData = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse);
}

// редактирование профиля

const editProfile = (info) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(info)
  })
  .then(handleResponse);
}  

// добавление новой карточки

const addNewCard = (info) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(info)
  })
  .then(handleResponse);
}

// удаление карточки

const deleteMyCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }) 
  .then(handleResponse);
}

// постановка и снятие лайка

const putLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }) 
  .then(handleResponse);
}

const removeLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }) 
  .then(handleResponse);
}

// обновление аватара

const loadNewAvatar = (info) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(info)
  })
  .then(handleResponse);
}

export { getInitialCards, getUserData, editProfile, addNewCard, deleteMyCard, putLikeCard, removeLikeCard, loadNewAvatar };