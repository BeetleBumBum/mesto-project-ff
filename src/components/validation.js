const formElement = document.querySelector(".popup__form"); //мб нужно просто экспортировать из индекс.джс
const formImput = formElement.querySelector(".popup__input"); //проверить, точно ли никгде такого нет

// const formElement = document.querySelector(".popup__form"); //мб нужно просто экспортировать из индекс.джс
const formInput = formElement.querySelector(".popup__input"); //проверить, точно ли нигде такого нет
const formError = formElement.querySelector(`.${formInput.id}-error`);

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
   // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
 
 // Функция, которая удаляет класс с ошибкой
 const hideInputError = (formElement, inputElement, validationConfig) => {
   // Находим элемент ошибки
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   // Остальной код такой же
   inputElement.classList.remove(validationConfig.inputErrorClass);
   errorElement.classList.remove(validationConfig.errorClass);
   errorElement.textContent = '';
 }; 

 const clearValidation = (formElement, validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
 
  const btnElement = formElement.querySelector(validationConfig.submitButtonSelector)

   // Переберём полученную коллекцию
   formList.forEach((element) => {
     hideInputError(formElement, element, validationConfig.inputErrorClass);
     element.value = '';
   });
   toggleButtonState(formList, btnElement, validationConfig);
 };




 
 // Функция, которая проверяет валидность поля
 const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

   if (!inputElement.validity.valid) {
     // Если поле не проходит валидацию, покажем ошибку
     showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
   } else {
     // Если проходит, скроем
     hideInputError(formElement, inputElement, validationConfig);
   }
 };

 const toggleButtonState = (inputList, buttonElement, validationConfig) => {
   // Если есть хотя бы один невалидный инпут
   if (hasInvalidInput(inputList)) {
     // сделай кнопку неактивной
         buttonElement.disabled = true;
     buttonElement.classList.add(validationConfig.inactiveButtonClass);
   } else {
         // иначе сделай кнопку активной
         buttonElement.disabled = false;
     buttonElement.classList.remove(validationConfig.inactiveButtonClass);
   }
 }; 
 
 const hasInvalidInput = (inputList) => {
   // проходим по этому массиву методом some
   return inputList.some((inputElement) => {
         // Если поле не валидно, колбэк вернёт true
     // Обход массива прекратится и вся функция
     // hasInvalidInput вернёт true
 
     return !inputElement.validity.valid;
   })
 }; 

//  const buttonElement = formElement.querySelector('.popup__button');

 const setEventListeners = (formElement, validationConfig) => {
   // Находим все поля внутри формы,
   // сделаем из них массив методом Array.from
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
   toggleButtonState(inputList, buttonElement, validationConfig);
 
   // Обойдём все элементы полученной коллекции
   inputList.forEach((inputElement) => {
     // каждому полю добавим обработчик события input
     inputElement.addEventListener('input', function () {
       // Внутри колбэка вызовем isValid,
       // передав ей форму и проверяемый элемент
       isValid(formElement, inputElement, validationConfig);
       toggleButtonState(inputList, buttonElement, validationConfig);
     });
     
   });
 }; 

 const enableValidation = (validationConfig) => {
   // Найдём все формы с указанным классом в DOM,
   // сделаем из них массив методом Array.from
   const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
 
   // Переберём полученную коллекцию
   formList.forEach((formElement) => {
     // здесь по другому в практической
     setEventListeners(formElement, validationConfig); //нужно ли то, что в скобках?
   });
 };


 
 // Вызовем функцию
//  enableValidation(); 

 enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
 });