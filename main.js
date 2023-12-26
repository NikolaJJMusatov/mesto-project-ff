(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{o:()=>_,x:()=>m});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-3",headers:{authorization:"206e963e-b78c-4d94-9aab-7b923d70b209","Content-Type":"application/json"}};function n(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}var r=document.querySelector("#card-template").content;function o(e,t,n,o){var c=r.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__likes");return c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__image").src=e.link,c.querySelector(".card__image").alt=e.name,a.textContent=e.likes?e.likes.length:0,c.querySelector(".card__like-button").addEventListener("click",(function(t){return n(t,e._id,a)})),c.querySelector(".card__image").addEventListener("click",(function(){return o(e.name,e.link)})),e.owner._id!==m?c.querySelector(".card__delete-button").remove():c.querySelector(".card__delete-button").addEventListener("click",(function(n){return t(n,e._id)})),c}function c(e,r){(function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(n).catch((function(e){console.log(e)}))})(r).then((function(){e.target.closest(".places__item").remove()}))}function a(e,r,o){(function(e,r){var o=r?"DELETE":"PUT";return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:o,headers:t.headers}).then(n).catch((function(e){console.log(e)}))})(r,e.target.classList.contains("card__like-button_is-active")).then((function(t){e.target.classList.toggle("card__like-button_is-active"),o.textContent=t.likes.length}))}function i(e){e.classList.toggle("popup_is-opened"),document.addEventListener("keydown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){"Escape"===e.key&&_.forEach((function(e){e.classList.contains("popup_is-opened")&&u(e)}))}function s(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(n,r,t)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m,v,y=document.querySelector(".places__list"),_=document.querySelectorAll(".popup"),h=document.querySelectorAll(".popup__close"),b=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_new-avatar"),q=document.querySelector(".profile__image"),E=document.querySelector(".popup_type_new-card"),C=document.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_image"),k=document.querySelector(".popup__image"),x=document.querySelector(".popup__caption"),A=document.forms["edit-profile"],w=A.elements.name,O=A.elements.description,j=A.querySelector(".button"),T=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),P=document.forms["new-avatar"],B=P.elements["new-avatar-link"],D=P.querySelector(".button"),M=document.querySelector(".profile__image-avatar"),N=document.forms["new-place"],I=N.elements["place-name"],J=N.elements.link,H=N.querySelector(".button"),V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function z(e,t){k.src=t,k.alt=e,x.textContent=e,i(L)}A.addEventListener("submit",(function(e){var r,o;e.preventDefault(),j.textContent="Сохранение...",(r=w.value,o=O.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then(n).catch((function(e){console.log(e)}))).then((function(e){T.textContent=e.name,U.textContent=e.about,M.src=e.avatar,u(b)})).finally((function(){j.textContent="Сохранить"}))})),P.addEventListener("submit",(function(e){var r;e.preventDefault(),D.textContent="Сохранение...",(r=B.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then(n).catch((function(e){console.log(e)}))).then((function(e){M.src=e.avatar,P.reset(),u(g)})).finally((function(){D.textContent="Сохранить"}))})),N.addEventListener("submit",(function(e){var r,i;e.preventDefault(),H.textContent="Сохранение...",(r=I.value,i=J.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:i})}).then(n).catch((function(e){console.log(e)}))).then((function(e){var t=o(e,c,a,z);y.prepend(t),N.reset(),u(E)})).finally((function(){H.textContent="Создать"}))})),S.addEventListener("click",(function(){w.value=T.textContent,O.value=U.textContent,i(b),f(A,V)})),C.addEventListener("click",(function(){I.value="",J.value="",i(E),f(N,V)})),q.addEventListener("click",(function(){B.value="",i(g),f(P,V)})),h.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){u(t)}))})),_.forEach((function(e){e.addEventListener("click",(function(t){t.currentTarget===t.target&&function(e){e.target===e.currentTarget&&_.forEach((function(e){e.classList.contains("popup_is-opened")&&u(e)}))}(e)}))})),v=V,Array.from(document.querySelectorAll(v.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){d(n,r,t),function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t)}))}))}(e,v)})),Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(n).catch((function(e){console.log(e)})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(n).catch((function(e){console.log(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=r[0],u=r[1];m=i._id,T.textContent=i.name,U.textContent=i.about,M.src=i.avatar,u.forEach((function(e){var t=o(e,c,a,z);y.append(t)}))}))})();