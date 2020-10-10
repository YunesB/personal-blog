const likeButton = document.getElementById('like');
const likeCounter = document.getElementById('like-counter');
const feedbackForm = document.querySelector('.feedback__form');
const feedbackList = document.querySelector('.feedback__list');
const inputMessage = document.getElementById('text-input');
const nameMessage = document.getElementById('name-input');

function pushLike() {
    if (likeButton.classList.contains('article__like-button_state_active')) {
        likeCounter.textContent--;
    } else {
        likeCounter.textContent++;
    }
    likeButton.classList.toggle('article__like-button_state_active');
};

likeButton.addEventListener('click', pushLike);

function addComment() {
    const cardTemplate = document.querySelector('.feedback__template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardName = cardElement.querySelector('.feedback__name');
    const cardText = cardElement.querySelector('.feedback__text');  
    cardName.textContent = nameMessage.value;
    cardText.textContent = inputMessage.value;
    feedbackList.append(cardElement);
};

function handleFeedbackSubmit(evt) {
    evt.preventDefault();
    addComment()
    feedbackForm.reset();
};

feedbackForm.addEventListener('submit', handleFeedbackSubmit);

const allSelectorClasses = {
  formSelector: '.feedback__form',
  inputSelector: '.feedback__input',
  submitButtonSelector: '.feedback__button',
  inactiveButtonClass: 'feedback__button_disabled',
  inputErrorClass: 'feedback__input_data_error',
  errorClass: 'feedback__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, allClasses) => {
    const inputError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(allClasses.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(allClasses.errorClass);
}
  
const hideInputError = (formElement, inputElement, allClasses) => {
    const inputError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(allClasses.inputErrorClass);
    inputError.classList.remove(allClasses.errorClass);
    inputError.textContent = "";
}
  
 
const checkInputValidity = (formElement, inputElement, allClasses) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
    } else {
      hideInputError(formElement, inputElement, allClasses);
    }
};
  
const setEventListeners = (formElement, allClasses) => {
    const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
    const submitButtonElement = formElement.querySelector(allClasses.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, allClasses);
        toggleButtonState(inputList, submitButtonElement, allClasses);
      });
    });
}; 
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 
  
  
const toggleButtonState = (inputList, submitButtonElement, allClasses) => {
    if (hasInvalidInput(inputList)) {
      submitButtonElement.classList.add(allClasses.inactiveButtonClass);
      submitButtonElement.disabled = true;
    } else {
      submitButtonElement.classList.remove(allClasses.inactiveButtonClass);
      submitButtonElement.disabled = false;
    }
};
 
const enableValidation = (allClasses) => {
    feedbackForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    setEventListeners(feedbackForm, allClasses);
    const submitButtonElement = feedbackForm.querySelector(allClasses.submitButtonSelector);
    submitButtonElement.classList.add(allClasses.inactiveButtonClass);
    submitButtonElement.disabled = true;
};
  

enableValidation(allSelectorClasses);