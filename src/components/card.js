const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(card, deleteCard, likeCard, openImg) {
  
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const btnLike = cardElement.querySelector(".card__like-button")
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
     deleteCard(cardElement);
  });

  btnLike.addEventListener("click", likeCard);
  cardElement.querySelector(".card__image").addEventListener("click", () => 
    openImg(card.name, card.link)
  );
  return cardElement;
};

// функция лайка карточки

function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  };

// функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
};

export { createCard, likeCard, deleteCard };