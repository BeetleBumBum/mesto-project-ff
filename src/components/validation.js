const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(formElement, validationConfig); //нужно ли то, что в скобках?
  });
 };

 const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
 }; 

 // Функция, которая проверяет валидность поля

 const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

   if (!inputElement.validity.valid) {
     showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
   } else {
     hideInputError(formElement, inputElement, validationConfig);
   }
 };

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
 }; 

// Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
 
 // Функция, которая удаляет класс с ошибкой
 
 const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
   errorElement.classList.remove(validationConfig.errorClass);
   errorElement.textContent = "";
   inputElement.setCustomValidity("");
 }; 

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const btnElement = formElement.querySelector(validationConfig.submitButtonSelector)
     toggleButtonState(inputList, btnElement, validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
     hideInputError(formElement, inputElement, validationConfig);
   });
   toggleButtonState(inputList, btnElement, validationConfig.inactiveButtonClass);
 };

 const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   })
 };
 
export { clearValidation, enableValidation };