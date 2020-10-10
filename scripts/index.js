/* Переменные */
const popup = document.getElementById('popup');
const popupOpener = document.getElementById('openPopup');
const popupImg = document.getElementById('popupImg');
const page = document.querySelector('.page');
const contactForm = document.querySelector('.contact__form');
const submitMessage = document.querySelector('.contact__submit-message');


/* Общие функции */
function openPopup() {
    if (!popup.classList.contains('popup_opened')) {
        popup.classList.add('popup_opened');
        popupImg.src = popupOpener.src;
        popupImg.alt = popupOpener.alt;
    }
}

function closePopup(evt) {
    if (evt.target === popup) {
        popup.classList.remove('popup_opened');
    }
}

const cards = document.querySelectorAll('.cards__item');
const imgCards = document.querySelectorAll('.img-cards__item');
const filter = document.querySelector('.articles__dropdown');

filter.onchange = function() {
    filterCards(imgCards);
    filterCards(cards);
}

function filterCards(list) {
    for (let item of list) {
      if (item.dataset.tags === filter.value || filter.value === '') {
        item.style.opacity = '1';
        item.style.filter = 'grayscale(0)';
      } else {
        item.style.opacity = '.3';
        item.style.filter = 'grayscale(100%)';
      }
    }
  };

function handleContactSubmit(evt) {
    evt.preventDefault();
    contactForm.reset();
    resetButton(allSelectorClasses);
    submitMessage.textContent = 'Спасибо за Ваше письмо!';
};

const resetButton = function (allClasses) {
    const submitButtonElement = contactForm.querySelector(allClasses.submitButtonSelector);
    submitButtonElement.classList.add(allClasses.inactiveButtonClass);
    submitButtonElement.disabled = true;
};


/* Валидация формы */
const allSelectorClasses = {
  formSelector: '.contact__form',
  inputSelector: '.contact__input',
  submitButtonSelector: '.contact__button',
  inactiveButtonClass: 'contact__button_disabled',
  inputErrorClass: 'contact__input_data_error',
  errorClass: 'contact__error_visible'
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
    contactForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    setEventListeners(contactForm, allClasses);
    resetButton(allClasses);
};
  
enableValidation(allSelectorClasses);


/* Слушатели событий */
popupOpener.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);
contactForm.addEventListener('submit', handleContactSubmit);
contactForm.addEventListener('click', function () {
    submitMessage.textContent = '';
});
