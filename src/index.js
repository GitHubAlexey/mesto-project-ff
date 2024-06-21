import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { createCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getCards, updateProfileInfo, addNewCard, updateProfileImageLink, deleteCardFromServer } from './components/api.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.querySelector('div.popup_type_edit .popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const formAddCard = document.querySelector('div.popup_type_new-card .popup__form');
const cardTitleInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formAddCard.querySelector('.popup__input_type_url');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileImageButton = document.querySelector('.profile__image-button');

const formProfileImageUpdate = document.querySelector('div.popup_profile-image_update .popup__form');
const popupProfileImageUpdate = document.querySelector('.popup_profile-image_update');
const profileImageUrlInput = formProfileImageUpdate.querySelector('.popup__input_type_profile-image-url');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');

const popupCardDeleteConfirm = document.querySelector('.popup_card-delete-confirm');
const formCardDeleteConfirm = document.querySelector('div.popup_card-delete-confirm .popup__form');
let card = {};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Слушатель событий на открытие модального окна 'Редактировать профиль'
profileEditButton.addEventListener('click', () => {
	openModal(popupTypeEdit);
	nameInput.value = userName.textContent;
	jobInput.value = userDescription.textContent;
	clearValidation(formEditProfile, validationConfig);
});

// Слушатель событий на открытие модального окна 'Новое место'
profileAddButton.addEventListener('click', () => {
	openModal(popupTypeNewCard);
	clearValidation(formEditProfile, validationConfig);
});

// Слушатель событий на открытие модального окна 'Обновить аватар'
profileImageButton.addEventListener('click', () => {
	openModal(popupProfileImageUpdate);
	clearValidation(formProfileImageUpdate, validationConfig);
});

// Слушатель событий на закрытие модальных окон по нажатию на overlay
popups.forEach((e) => {
	e.addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('popup_is-opened')) {
			closeModal(e);
		}
	});
});

// Слушатель событий на закрытие модального окна по крестику
popupCloseButtons.forEach((e) => {
	e.addEventListener('click', (evt) => {
		if (evt.target.closest('.popup_is-opened')) {
			const closeButton = e.closest('.popup_is-opened');
			closeModal(closeButton);
		}
	});
});

// Функция заполнения информации о себе
function editProfile(evt) {
	evt.preventDefault();
	saveProcess(true, evt.target.querySelector('.save'), evt.target.querySelector('.saving'));
	const name = nameInput.value;
	const job = jobInput.value;
	updateProfileInfo(name, job)
		.then(() => {
			userName.textContent = name;
			userDescription.textContent = job;
			closeModal(popupTypeEdit);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			saveProcess(false, evt.target.querySelector('.save'), evt.target.querySelector('.saving'));
		});
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', editProfile);

// Функция на открытие модального окна фотографии
function openPopupImg(evt) {
	openModal(popupTypeImage);
	popupImage.src = evt.target.src;
	popupImage.alt = evt.target.alt;
	popupImageTitle.textContent = evt.target.alt;
}

// Функция открытия модального окна подтверждения удаления карточки
function deleteCardPopup(evt) {
	openModal(popupCardDeleteConfirm);
	card = evt.target.closest('.card');
}

// Функция удаления карточки с подтверждением
function deleteCard(evt) {
	evt.preventDefault();
	deleteCardFromServer(card.id)
		.then(() => {
			card.remove();
			closeModal(popupCardDeleteConfirm);
		})
		.catch((err) => {
			console.log(err);
		});
}
formCardDeleteConfirm.addEventListener('submit', deleteCard);

// Функция добавления своей карточки на страницу
function addCard(evt) {
	evt.preventDefault();
	saveProcess(true, evt.target.querySelector('.save'), evt.target.querySelector('.saving'));
	addNewCard(cardTitleInput.value, cardLinkInput.value)
		.then((result) => {
			const cardOwnerId = result.owner._id;
			cardsContainer.prepend(createCard(result, deleteCardPopup, likeCard, openPopupImg, cardOwnerId));
			closeModal(popupTypeNewCard);
			formAddCard.reset();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			saveProcess(false, evt.target.querySelector('.save'), evt.target.querySelector('.saving'));
		});
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddCard.addEventListener('submit', addCard);

// Вызов функции валидации попапов
enableValidation(validationConfig);

// Заполняем информацию о пользователе данными из сети, выводим карточки из сети на страницу
Promise.all([getUserData(), getCards()])
	.then((res) => {
		userName.textContent = res[0].name;
		userDescription.textContent = res[0].about;
		profileImage.setAttribute('style', `background-image: url(${res[0].avatar});`);
		const myId = res[0]._id;
		res[1].forEach((element) => {
			cardsContainer.append(createCard(element, deleteCardPopup, likeCard, openPopupImg, myId));
		});
	})
	.catch((err) => {
		console.log(err);
	});

// Функция обновления аватара на странице
function updateProfileImage(evt) {
	evt.preventDefault();
	saveProcess(true, evt.target.querySelector('.save'), evt.target.querySelector('.saving'));
	updateProfileImageLink(profileImageUrlInput.value)
		.then((result) => {
			profileImage.setAttribute('style', `background-image: url(${result.avatar});`);
			closeModal(popupProfileImageUpdate);
			formProfileImageUpdate.reset();
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			saveProcess(false, evt.target.querySelector('.save'), evt.target.querySelector('.saving'));
		});
}
formProfileImageUpdate.addEventListener('submit', updateProfileImage);

// Функция показа процесса сохранения при нажатии на кнопку 'Сохранить' в модальных окнах
function saveProcess(isSaving, buttonTextDefaul, buttonTextSavingProcess) {
	if (isSaving === true) {
		buttonTextDefaul.classList.add('saving__process_hidden');
		buttonTextSavingProcess.classList.remove('saving__process_hidden');
	} else if (isSaving === false) {
		buttonTextDefaul.classList.remove('saving__process_hidden');
		buttonTextSavingProcess.classList.add('saving__process_hidden');
	}
}