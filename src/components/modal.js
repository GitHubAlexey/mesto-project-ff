// Функция открытия модального окна
export function openModal(modalElement) {
	modalElement.classList.add('popup_is-animated');
	// setTimeout для того, чтобы модальные окна открывались плавно сразу, при первом клике
	setTimeout(() => {
		modalElement.classList.add('popup_is-opened');
		document.addEventListener('keydown', closePopupEsc);
	}, 0)
};

// Функция закрытия модального окна по крестику
export function closeModal(modalElement) {
	modalElement.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', closePopupEsc);
};

// Функция закрытия модального окна по клавише Esc
function closePopupEsc(evt) {
	if (evt.key === 'Escape') {
		const openPopup = document.querySelector('.popup_is-opened');
		closeModal(openPopup);
	};
};