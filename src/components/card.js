import { deleteMyCard, putLikeCard, removeLikeCard } from './api.js';

const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(card, deleteCard, likeCard, openImg, userId) {
  
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const btnLike = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likesQuantity = cardElement.querySelector(".card__like-quantity");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  likesQuantity.textContent = card.likes.length;

  if (card.likes.some(user => user._id === userId)) {
    btnLike.classList.add("card__like-button_is-active");
  }

  if (card.owner._id === userId) {
    deleteButton.addEventListener("click", function() {
      deleteCard(card._id, cardElement);
    })
  } else {
    deleteButton.remove();
  }

  btnLike.addEventListener("click", function(evt) {
    likeCard(evt, card, likesQuantity);
  });
  cardElement.querySelector(".card__image").addEventListener("click", () => 
    openImg(card.name, card.link)
  );
  return cardElement;
};

// функция лайка карточки

function likeCard(evt, card, likesQuantity) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
// Чтобы было меньше дублирования:
  const likeMethod = isLiked ? removeLikeCard : putLikeCard;
  likeMethod(card._id) 
    .then((updatedCard) => { 
      evt.target.classList.toggle("card__like-button_is-active"); 
      likesQuantity.textContent = updatedCard.likes.length; 
    })
    .catch(err => console.log(`Ошибка при снятии лайка: ${err}`));

// функция удаления карточки

function deleteCard(cardId, cardElement) {
  deleteMyCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`ошибка удаления карточки: ${err}`);
    })
}

export { createCard, likeCard, deleteCard };