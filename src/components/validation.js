//функция показа ошибки ввода
function showError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

//функция скрытия ошибки ввода
function hideError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, obj) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, obj);
  }
  else {
    hideError(formElement, inputElement, obj);
  }
};

function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        toggleButtonState(inputList, buttonElement, obj);
        checkInputValidity(formElement, inputElement, obj);
      });
    });
};

//функция валидности всем формам
export function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit',  (evt) => {
      evt.preventDefault();
    });
     setEventListeners(formElement, obj);
  });
};

//функция проверки валидности полей ввода
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//функция блокировки кнопки "сохранить"
function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(obj.inactiveButtonClass);
  } 
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
};

//функция очистки ошибок ввода полей
export function clearValidation(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, obj);
  });
  toggleButtonState(inputList, buttonElement, obj);
};