import "./pages/index.css"; // добавьте импорт главного файла стилей 
import {initialCards} from "./components/cards.js";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

export const placesList = document.querySelector(".places__list");

// Вывести карточки на страницу

function loadCards(cards) {
   cards.forEach((card) => {
      placesList.append(createCard(card, deleteCard, likeCard, openImage));
   })
};

loadCards(initialCards);

// открытие и закрытие фотографий

const modalTypeImage = document.querySelector(".popup_type_image");
const btnImageClose = document.querySelector(".popup_type_image .popup__close");

export function openImage(name, link) {
   const modalImage = document.querySelector(".popup__image");
   const modalImageText = document.querySelector(".popup__caption");
   modalImage.src = link;
   modalImage.alt = name;
   modalImageText.textContent = name;
   openModal(modalTypeImage);
};

btnImageClose.addEventListener("click", function() {
   closeModal(modalTypeImage);
  });

// попап редактирования профиля

const modalInputName = document.querySelector(".popup__input_type_name");
const modalInputJob = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");
const modalTypeEdit = document.querySelector(".popup_type_edit");
const btnEdit = document.querySelector(".profile__edit-button");
const btnEditClose = document.querySelector(".popup_type_edit .popup__close");
const formElement = document.querySelector(".popup__form");

function editModalInfo() {
   modalInputName.value = profileTitle.textContent;
   modalInputJob.value = profileDescription.textContent;
 };

function renameProfileFormSubmit(evt) {
   evt.preventDefault();
   profileTitle.textContent = modalInputName.value;
   profileDescription.textContent = modalInputJob.value;
   closeModal(modalTypeEdit);
};

btnEdit.addEventListener("click", function() {
   openModal(modalTypeEdit);
   editModalInfo();
});

btnEditClose.addEventListener("click", function() {
   closeModal(modalTypeEdit);
});

formElement.addEventListener("submit", renameProfileFormSubmit);

 // Форма добавления новой карточки

const modalTypeNewCard = document.querySelector(".popup_type_new-card"); 
const btnAdd = document.querySelector(".profile__add-button"); 
const btnNewCardClose = document.querySelector(".popup_type_new-card .popup__close");
const formNewPlace = document.forms.new_place;
const formPlaceName = new_place.elements.place_name;
const formLink = new_place.elements.link;

btnAdd.addEventListener("click", function() {
   openModal(modalTypeNewCard);
  });

btnNewCardClose.addEventListener("click", function() {
   closeModal(modalTypeNewCard);
  });

formNewPlace.addEventListener("submit", function(evt) {
   evt.preventDefault();
   const card = {name:formPlaceName.value, link:formLink.value};
   const newCard = createCard(card, deleteCard, likeCard, openImage);
   placesList.prepend(newCard);
   formNewPlace.reset();
   closeModal(modalTypeNewCard);
})
