import { cardTemplate } from '../index.js';
import { deleteCardFromServer, putLikeCard, deleteLikeCard } from './api.js'

import { openModal, closeModal } from './modal.js';
const popupCardDeleteConfirm = document.querySelector('.popup_card-delete-confirm');
const formCardDeleteConfirm = document.querySelector('div.popup_card-delete-confirm .popup__form');

// Функция создания карточки
export function createCard(cardData, deleteCard, likeButton, openPopupImg, myId) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardButtonDelete = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');
	const cardLikeCount = cardElement.querySelector('.card__like-count');
	const cardOwnerId = cardData.owner._id;
	cardElement.id = cardData._id;

	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardTitle.textContent = cardData.name;
	cardLikeCount.textContent = cardData.likes.length;

//	Убираем кнопку удаления карточки, если карточка создана другим пользователем
// Удаляем карточку при нажатии на кнопку удаления
	if (myId === cardOwnerId) {
		cardButtonDelete.addEventListener('click', deleteCard);
	} else {
		cardButtonDelete.remove();
	}

// Добавление/удаление лайка
	if (cardData.likes.some((e) => e._id === myId)) {
		cardLikeButton.classList.add('card__like-button_is-active');
	}
	cardLikeButton.addEventListener('click', likeButton);
	
// Слушатель на открытие попапа картинки
	cardImage.addEventListener('click', openPopupImg);

	return cardElement;
}

// Функция удаления карточки с подтверждением
export function deleteCard(evt) {
	openModal(popupCardDeleteConfirm);
	const cardId = evt.target.closest('.card').id
	const card = evt.target.closest('.card')
	formCardDeleteConfirm.addEventListener('submit', () => {
		deleteCardFromServer(cardId)
		.then(() => {
			card.remove();
			closeModal(popupCardDeleteConfirm);
		})
		.catch((err) => {
			console.log(err);
		});
	});
}

// Функция лайка карточки
export function likeCard(evt) {
	if (!evt.target.classList.contains('card__like-button_is-active')) {
		putLikeCard(evt.target.closest('.card').id)
			.then((result) => {
				evt.target.classList.add('card__like-button_is-active');
				evt.target.nextElementSibling.textContent = result.likes.length;
			})
			.catch((err) => {
				console.log(err);
			});
	} else if (evt.target.classList.contains('card__like-button_is-active')) {
		deleteLikeCard(evt.target.closest('.card').id)
			.then((result) => {
				evt.target.classList.remove('card__like-button_is-active');
				evt.target.nextElementSibling.textContent = result.likes.length
			})
			.catch((err) => {
			console.log(err);
		});
	}
}