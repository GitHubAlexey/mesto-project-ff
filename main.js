(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-13/",headers:{authorization:"a8147353-f540-41b1-bcc6-34270127dd5c","Content-Type":"application/json"}};function o(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var c=document.querySelector("#card-template").content;function a(e,t,n,r,o){var a=c.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),s=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-count"),p=e.owner._id;return a.id=e._id,i.src=e.link,i.alt=e.name,u.textContent=e.name,d.textContent=e.likes.length,o===p?s.addEventListener("click",t):s.remove(),e.likes.some((function(e){return e._id===o}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",n),i.addEventListener("click",r),a}function i(e){var t;e.target.classList.contains("card__like-button_is-active")?e.target.classList.contains("card__like-button_is-active")&&function(e){return fetch("".concat(r.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(o)}(e.target.closest(".card").id).then((function(t){e.target.classList.remove("card__like-button_is-active"),e.target.nextElementSibling.textContent=t.likes.length})).catch((function(e){console.log(e)})):(t=e.target.closest(".card").id,fetch("".concat(r.baseUrl,"cards/likes/").concat(t),{method:"PUT",headers:r.headers}).then(o)).then((function(t){e.target.classList.add("card__like-button_is-active"),e.target.nextElementSibling.textContent=t.likes.length})).catch((function(e){console.log(e)}))}function u(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function l(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);r.disabled=!0,r.classList.add(t.inactiveButtonClass),n.forEach((function(n){u(e,n,t)}))}var d=document.querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),_=document.querySelector(".popup_type_edit"),f=document.querySelector("div.popup_type_edit .popup__form"),v=f.querySelector(".popup__input_type_name"),m=f.querySelector(".popup__input_type_description"),y=document.querySelector("div.popup_type_new-card .popup__form"),h=y.querySelector(".popup__input_type_card-name"),S=y.querySelector(".popup__input_type_url"),g=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),b=document.querySelectorAll(".popup"),L=document.querySelectorAll(".popup__close"),E=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),x=document.querySelector(".profile__image-button"),A=document.querySelector("div.popup_profile-image_update .popup__form"),U=document.querySelector(".popup_profile-image_update"),w=A.querySelector(".popup__input_type_profile-image-url"),B=document.querySelector(".popup_type_image"),D=document.querySelector(".popup__image"),T=document.querySelector(".popup__caption"),P=document.querySelector(".popup_card-delete-confirm"),N=document.querySelector("div.popup_card-delete-confirm .popup__form"),O={},j={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function J(t){e(B),D.src=t.target.src,D.alt=t.target.alt,T.textContent=t.target.alt}function M(t){e(P),O=t.target.closest(".card")}function H(e,t,n){!0===e?(t.classList.add("saving__process_hidden"),n.classList.remove("saving__process_hidden")):!1===e&&(t.classList.remove("saving__process_hidden"),n.classList.add("saving__process_hidden"))}p.addEventListener("click",(function(){e(_),v.value=E.textContent,m.value=k.textContent,l(f,j)})),g.addEventListener("click",(function(){e(q),l(f,j)})),x.addEventListener("click",(function(){e(U),l(A,j)})),b.forEach((function(e){e.addEventListener("click",(function(n){n.target.classList.contains("popup_is-opened")&&t(e)}))})),L.forEach((function(e){e.addEventListener("click",(function(n){n.target.closest(".popup_is-opened")&&t(e.closest(".popup_is-opened"))}))})),f.addEventListener("submit",(function(e){e.preventDefault(),H(!0,e.target.querySelector(".save"),e.target.querySelector(".saving"));var n=v.value,c=m.value;(function(e,t){return fetch("".concat(r.baseUrl,"users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:e,about:t})}).then(o)})(n,c).then((function(){E.textContent=n,k.textContent=c,t(_)})).catch((function(e){console.log(e)})).finally((function(){H(!1,e.target.querySelector(".save"),e.target.querySelector(".saving"))}))})),N.addEventListener("submit",(function(e){var n;e.preventDefault(),(n=O.id,fetch("".concat(r.baseUrl,"cards/").concat(n),{method:"DELETE",headers:r.headers}).then(o)).then((function(){O.remove(),t(P)})).catch((function(e){console.log(e)}))})),y.addEventListener("submit",(function(e){var n,c;e.preventDefault(),H(!0,e.target.querySelector(".save"),e.target.querySelector(".saving")),(n=h.value,c=S.value,fetch("".concat(r.baseUrl,"cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:n,link:c})}).then(o)).then((function(e){var n=e.owner._id;d.prepend(a(e,M,i,J,n)),t(q),y.reset()})).catch((function(e){console.log(e)})).finally((function(){H(!1,e.target.querySelector(".save"),e.target.querySelector(".saving"))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.customErrorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(j),Promise.all([fetch("".concat(r.baseUrl,"users/me"),{headers:r.headers}).then(o),fetch("".concat(r.baseUrl,"cards"),{headers:r.headers}).then(o)]).then((function(e){E.textContent=e[0].name,k.textContent=e[0].about,C.setAttribute("style","background-image: url(".concat(e[0].avatar,");"));var t=e[0]._id;e[1].forEach((function(e){d.append(a(e,M,i,J,t))}))})).catch((function(e){console.log(e)})),A.addEventListener("submit",(function(e){var n;e.preventDefault(),H(!0,e.target.querySelector(".save"),e.target.querySelector(".saving")),(n=w.value,fetch("".concat(r.baseUrl,"users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(o)).then((function(e){C.setAttribute("style","background-image: url(".concat(e.avatar,");")),t(U),A.reset()})).catch((function(e){console.log(e)})).finally((function(){H(!1,e.target.querySelector(".save"),e.target.querySelector(".saving"))}))}))})();