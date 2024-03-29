// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardData, deleteCard) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const cardButtonDelete = cardElement.querySelector('.card__delete-button');

	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardTitle.textContent = cardData.name;

	cardButtonDelete.addEventListener('click', deleteCard);

	return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
	return evt.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
for (let element of initialCards) {
	cardsContainer.append(addCard(element, deleteCard));
}
