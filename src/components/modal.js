// функция открытия модального окна

function openModal(modal) {
   modal.classList.add("popup_is-opened");
   document.addEventListener("keydown", closeModalEsc);
   document.addEventListener("click", closeModalOverlay);
 };

// функции закрытия модального окна 

function closeModal(modal) {
   modal.classList.remove("popup_is-opened");
   document.removeEventListener("keydown", closeModalEsc);
   document.removeEventListener("click", closeModalOverlay);
};

function closeModalEsc(evt) {
   const modalOpened = document.querySelector(".popup_is-opened");
   if (evt.key === "Escape" ) {
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






