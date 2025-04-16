const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function addCard(card, deleteCard, likeCard, openImg) {
  
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
     deleteCard(cardElement);
  });

  cardElement.addEventListener("click", likeCard);
  cardElement.querySelector(".card__image").addEventListener("click", openImg);

  return cardElement;
};

// функция лайка карточки

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }};

// функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
};

export { addCard, likeCard, deleteCard };