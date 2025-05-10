import "./pages/index.css"; // добавьте импорт главного файла стилей 
import { createCard, likeCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { getInitialCards, getUserData, editProfile, addNewCard, loadNewAvatar } from "./components/api.js";
import { clearValidation, enableValidation } from "./components/validation.js";

export const placesList = document.querySelector(".places__list");

let userId = null;
const modalTypeImage = document.querySelector(".popup_type_image");
const btnImageClose = document.querySelector(".popup_type_image .popup__close");

const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
 };

enableValidation(validationConfig);

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

function editModalInfo() {
   modalInputName.value = profileTitle.textContent;
   modalInputJob.value = profileDescription.textContent;
 };

function renameProfileFormSubmit(evt) {
  const btnSubmit = modalTypeEdit.querySelector(".popup__button");
  evt.preventDefault();
  btnSubmit.textContent = 'Сохранение...';
  
  editProfile({
  name: modalInputName.value,
  about: modalInputJob.value
  })
    .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closeModal(modalTypeEdit);
    })
  .catch((err) => {
    console.log(`Ошибка изменения профиля: ${err}`);
  })
  .finally(() => {
    btnSubmit.textContent = 'Сохранить'; //почему так??
  })
};

btnEdit.addEventListener("click", function() {
  editModalInfo();
  clearValidation(modalTypeEdit, validationConfig);
  openModal(modalTypeEdit);
});

btnEditClose.addEventListener("click", function() {
   closeModal(modalTypeEdit);
});

modalTypeEdit.addEventListener("submit", renameProfileFormSubmit);

 // Форма добавления новой карточки

const modalTypeNewCard = document.querySelector(".popup_type_new-card"); 
const btnAdd = document.querySelector(".profile__add-button"); 
const btnNewCardClose = document.querySelector(".popup_type_new-card .popup__close");
const formNewPlace = document.forms.new_place;
const formPlaceName = formNewPlace.elements.place_name;
const formLink = formNewPlace.elements.link;

btnAdd.addEventListener("click", function() {
  clearValidation(formNewPlace, validationConfig);
   openModal(modalTypeNewCard);
  });

btnNewCardClose.addEventListener("click", function() {
   closeModal(modalTypeNewCard);
  });

formNewPlace.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const btnSubmit = formNewPlace.querySelector(".popup__button");
  btnSubmit.textContent = "Сохранение...";

  addNewCard({
    name: formPlaceName.value, link:formLink.value
    })
    .then((newCard) => {
      const cardElement = createCard(newCard, deleteCard, likeCard, openImage, userId);
      placesList.prepend(cardElement);
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
      closeModal(modalTypeNewCard);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении новой карточки: ${err}`);
    })
    .finally(() => {
      btnSubmit.textContent = "Сохранить";
    })
});

// Форма изменения аватара

const modalTypeAvatarChange = document.querySelector(".popup_type_avatar-change");
const btnChangeAvatar = document.querySelector(".profile__avatar-change");
const btnAvatarChangeClose = document.querySelector(".popup_type_avatar-change .popup__close");
const formChangeAvatar = document.forms.change_avatar;
const inputAvatar = formChangeAvatar.querySelector(".popup__input_type_avatar");
const profileImage = document.querySelector(".profile__image");

btnChangeAvatar.addEventListener("click", function() {
  clearValidation(formChangeAvatar, validationConfig);
  formChangeAvatar.reset();
  openModal(modalTypeAvatarChange);
});

btnAvatarChangeClose.addEventListener("click", function() {
  closeModal(modalTypeAvatarChange);
});

formChangeAvatar.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const btnSubmit = formChangeAvatar.querySelector(".popup__button");
  btnSubmit.textContent = "Сохранение...";

  loadNewAvatar({
      avatar: inputAvatar.value
    }) 
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(modalTypeAvatarChange);
      formChangeAvatar.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      btnSubmit.textContent = "Сохранить";
    })
});

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cards.forEach((card) => {
      placesList.append(createCard(card, deleteCard, likeCard, openImage, userId));
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })