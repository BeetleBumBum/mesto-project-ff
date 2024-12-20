// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(card, deleteCard) {
   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

   cardElement.querySelector('.card__image').src = card.link;
   cardElement.querySelector('.card__image').alt = card.name;
   cardElement.querySelector('.card__title').textContent = card.name;

   const deleteButton = cardElement.querySelector('.card__delete-button');
   deleteButton.addEventListener('click', function () {
      deleteCard(cardElement);
   });
   return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
   cardElement.remove();
};

// @todo: Вывести карточки на страницу
function loadCards(cards) {
   cards.forEach((card) => {
      placesList.append(addCard(card, deleteCard));
   })
};

loadCards(initialCards);