import './pages/index.css';
import { initialCards } from './components/cards';
import { openModal, closeModal } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card.js';

export const cardTemplate = document.querySelector('#card-template').content;

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.querySelector('div.popup_type_edit .popup__form')
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const formAddCard = document.querySelector('div.popup_type_new-card .popup__form');
const cardTitleInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formAddCard.querySelector('.popup__input_type_url');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');

// @todo: Вывести карточки на страницу
for (let element of initialCards) {
	cardsContainer.append(createCard(element, deleteCard, likeCard, openPopupImg));
}

// Слушатель событий на открытие модального окна 'Редактировать профиль'
profileEditButton.addEventListener('click', () => {
	openModal(popupTypeEdit);
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;
});

// Слушатель событий на открытие модального окна 'Новое место'
profileAddButton.addEventListener('click', () => {
	openModal(popupTypeNewCard);
});

// Слушатель событий на закрытие модальных окон по нажатию на overlay
popups.forEach((e) => {
	e.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup_is-opened')) {
			closeModal(e);
		}
	})
})

// Слушатель событий на закрытие модального окна по крестику
popupCloseButton.forEach((e) => {
	e.addEventListener('click', (evt) => {
		if (evt.target.closest('.popup_is-opened')) {
			const closeButton = e.closest('.popup_is-opened');
			closeModal(closeButton);
		}
	})
})

// Функция заполнения информации о себе
function editProfile(evt) {
	evt.preventDefault();
	const name = nameInput.value;
	const job = jobInput.value;
	profileTitle.textContent = name;
	profileDescription.textContent = job;
	closeModal(popupTypeEdit);
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

// Функция добавления карточки
function addCard(evt) {
	evt.preventDefault();
	const newCardData = {};
	newCardData.name = cardTitleInput.value;
	newCardData.link = cardLinkInput.value;
	cardsContainer.prepend(createCard(newCardData, deleteCard, likeCard, openPopupImg));
	closeModal(popupTypeNewCard);
	formAddCard.reset();
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formAddCard.addEventListener('submit', addCard);