const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13/',
	headers: {
		authorization: 'a8147353-f540-41b1-bcc6-34270127dd5c',
		'Content-Type': 'application/json'
	}
};

// Проверка ответа вынесена в отдельную функцию
function checkRequestStatus(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция GET-запроса о данных пользователя
export function getUserData() {
	return fetch(`${config.baseUrl}users/me`, {
		headers: config.headers
	})
	.then(checkRequestStatus)
}

// Функция GET-запроса карточек с сервера
export function getCards() {
	return fetch(`${config.baseUrl}cards`, {
		headers: config.headers
	})
	.then(checkRequestStatus)
}

// Функция отправки новых данных профиля на сервер
export function updateProfileInfo(userName, userAbout) {
	return fetch(`${config.baseUrl}users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: userName,
			about: userAbout
		})
	})
	.then(checkRequestStatus)
}

// Функция добавления новой карточки на сервер
export function addNewCard(cardTitle, cardLink) {
	return fetch(`${config.baseUrl}cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name: cardTitle,
			link: cardLink
		})
	})
	.then(checkRequestStatus)
}

// Функция удаления карточки с сервера
export function deleteCardFromServer(cardId) {
	return fetch(`${config.baseUrl}cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers
	})
	.then(checkRequestStatus)
}

// Функция постановки лайка
export function putLikeCard(cardId) {
	return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers
	})
	.then(checkRequestStatus)
}

// Функция удаления лайка
export function deleteLikeCard(cardId) {
	return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers
	})
	.then(checkRequestStatus)
}

// Функция обновления ссылки на аватар (отправка новой ссылки на изображение на сервер)
export function updateProfileImageLink(profileImageLink) {
	return fetch(`${config.baseUrl}users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: profileImageLink
		})
	})
	.then(checkRequestStatus)
}