// функция открытия модального окна

function openModal(modal) {
   modal.classList.add("popup_is-opened");
   document.addEventListener("keydown", closeModalEsc);
   modal.addEventListener("click", closeModalOverlay);
 };

// функции закрытия модального окна 

function closeModal(modal) {
   modal.classList.remove("popup_is-opened");
   document.removeEventListener("keydown", closeModalEsc);
   modal.removeEventListener("click", closeModalOverlay);
};

function closeModalEsc(evt) {
  if (evt.key === "Escape" ) {
  const modalOpened = document.querySelector(".popup_is-opened");
  closeModal(modalOpened);
  };
};

function closeModalOverlay(evt) {
  const modalOpened = document.querySelector(".popup_is-opened");
  if (evt.target === modalOpened) {
    closeModal(modalOpened);
  };
};

export { openModal, closeModal };






