import { cardTemplate } from '../index.js';

// Функция создания карточки
export function createCard(cardData, deleteCard, likeButton, openPopupImg) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardButtonDelete = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');

	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardTitle.textContent = cardData.name;

	cardButtonDelete.addEventListener('click', deleteCard);
	cardLikeButton.addEventListener('click', likeButton);
	cardImage.addEventListener('click', openPopupImg);

	return cardElement;
}

// Функция удаления карточки
export function deleteCard(evt) {
	return evt.target.closest('.card').remove();
}

// Функция лайка карточки
export function likeCard(evt) {
	evt.target.classList.toggle('card__like-button_is-active');
};