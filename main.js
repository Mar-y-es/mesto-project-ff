(()=>{"use strict";var e=function(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))},t=function(e){return e.target.classList.contains("popup_is-opened")?r(e.target):e.target.closest(".popup__close")?r(e.target.closest(".popup")):void 0},n=function(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",e)},r=function(t){document.removeEventListener("keydown",e),t.classList.remove("popup_is-opened")},o=function(e){var t=e.currentUserId,n=e.template,r=e.data,o=e.onDelete,a=e.onLike,c=e.onImageClick,i=n.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__image");u.addEventListener("click",(function(){return c({cardName:r.name,cardLink:r.link})})),u.src=r.link,u.alt=r.name,i.querySelector(".card__title").textContent=r.name;var s=i.querySelector(".card__like-counter");r.likes.length&&(s.classList.add("card__like-counter_is-active"),s.textContent=r.likes.length);var l=i.querySelector(".card__delete-button");r.owner._id===t&&(l.classList.add("card__delete-button_is-active"),l.addEventListener("click",(function(){o({cardId:r._id,cardElement:i,buttonElement:l})})));var d=i.querySelector(".card__like-button");return r.likes.find((function(e){return e._id===t}))&&d.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){a({cardId:r._id,buttonElement:d,counterElement:s})})),i},a={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"87b41c2a-cd78-48a1-9843-081cf077e7f5","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},i=function(e){return fetch(e,{method:"HEAD"}).then((function(e){var t=e.ok,n=e.headers,r=e.status;return t?n.get("Content-Type").includes("image")?Promise.resolve():Promise.reject("Ошибка: URL ссылается на не изображение"):Promise.reject("Ошибка: ".concat(r))}))},u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},s=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass),n.forEach((function(n){s(e,n,t.inputErrorClass,t.errorClass),n.setCustomValidity("")}))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f=document.querySelector(".popup_type_image"),p=f.querySelector(".popup__caption"),v=f.querySelector(".popup__image"),_=document.querySelector(".places__list"),h=document.querySelector("#card-template").content,y=document.forms["new-place"],b=y.querySelector(".popup__button"),S=y.elements["place-name"],k=y.elements.link,E=document.querySelector(".popup_type_new-card"),L=document.querySelector(".profile__add-button"),g=document.forms["edit-avatar"],C=g.elements.avatar,q=g.querySelector(".popup__button"),x=document.querySelector(".popup_type_edit-avatar"),A=document.querySelector(".profile__image"),U=document.querySelector(".profile__title"),I=document.querySelector(".profile__description"),j=document.forms["edit-profile"],P=j.querySelector(".popup__button"),w=j.elements.name,D=j.elements.description,T=document.querySelector(".popup_type_edit"),O=document.querySelector(".profile__edit-button"),B=document.querySelector(".popup_type_confirm"),N=B.querySelector(".popup__button_confirm"),M=function(e){var t=e.name,n=e.description,r=e.avatar;U.textContent=t,I.textContent=n,A.style.backgroundImage="url(".concat(r,")")},H=function(e){var t=e.buttonElement;e.isSubmitting?(t.disabled=!0,t.textContent="Сохранение..."):(t.disabled=!1,t.textContent="Сохранить")},J=function(e){var t=e.cardId,n=e.buttonElement,r=e.counterElement;n.disabled=!0,n.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{headers:a.headers,method:"DELETE"}).then(c)}(t).then((function(e){var t=e.likes;n.classList.remove("card__like-button_is-active"),t.length?(r.classList.add("card__like-counter_is-active"),r.textContent=t.length):(r.classList.remove("card__like-counter_is-active"),r.textContent="")})).catch((function(e){return console.error(e)})).finally((function(){n.disabled=!1})):function(e){return fetch("".concat(a.baseUrl,"/cards/likes/").concat(e),{headers:a.headers,method:"PUT"}).then(c)}(t).then((function(e){var t=e.likes;n.classList.add("card__like-button_is-active"),r.classList.add("card__like-counter_is-active"),r.textContent=t.length})).catch((function(e){return console.error(e)})).finally((function(){n.disabled=!1}))},V=function(e){var t=e.cardId,o=e.buttonElement;n(B),N.onclick=function(){o.disabled=!0,function(e){return fetch("".concat(a.baseUrl,"/cards/").concat(e),{headers:a.headers,method:"DELETE"}).then(c)}(t).then((function(){o.closest(".card").remove()})).catch((function(e){o.disabled=!1,console.error(e)})).finally((function(){r(B)}))}},z=function(e){var t=e.cardName,r=e.cardLink;v.src=r,v.alt=t,p.textContent=t,n(f)};y.addEventListener("submit",(function(e){var t,n,u;e.preventDefault(),H({buttonElement:b,isSubmitting:!0}),(t={name:S.value,link:k.value},n=t.name,u=t.link,i(u).then((function(){return fetch("".concat(a.baseUrl,"/cards"),{headers:a.headers,method:"POST",body:JSON.stringify({name:n,link:u})}).then(c)})).catch((function(e){return Promise.reject(e)}))).then((function(e){_.prepend(o({currentUserId:e.owner._id,template:h,data:e,onDelete:V,onLike:J,onImageClick:z})),y.reset(),r(E)})).catch((function(e){console.error(e)})).finally((function(){H({buttonElement:b,isSubmitting:!1})}))})),j.addEventListener("submit",(function(e){var t,n,o;e.preventDefault(),H({buttonElement:P,isSubmitting:!0}),(t={name:w.value,description:D.value},n=t.name,o=t.description,fetch("".concat(a.baseUrl,"/users/me"),{headers:a.headers,method:"PATCH",body:JSON.stringify({name:n,about:o})}).then(c)).then((function(e){var t=e.name,n=e.about,o=e.avatar;M({name:t,description:n,avatar:o}),r(T)})).catch((function(e){console.error(e)})).finally((function(){H({buttonElement:P,isSubmitting:!1})}))})),g.addEventListener("submit",(function(e){var t;e.preventDefault(),H({buttonElement:q,isSubmitting:!0}),(t=C.value,i(t).then((function(){return fetch("".concat(a.baseUrl,"/users/me/avatar"),{headers:a.headers,method:"PATCH",body:JSON.stringify({avatar:t})}).then(c)})).catch((function(e){return Promise.reject(e)}))).then((function(e){var t=e.name,n=e.about,o=e.avatar;M({name:t,description:n,avatar:o}),r(x)})).catch((function(e){console.error(e)})).finally((function(){H({buttonElement:q,isSubmitting:!1})}))})),f.addEventListener("click",t),x.addEventListener("click",t),A.addEventListener("click",(function(){g.reset(),d(g,u),n(x)})),E.addEventListener("click",t),L.addEventListener("click",(function(){y.reset(),d(y,u),n(E)})),T.addEventListener("click",t),O.addEventListener("click",(function(){w.value=U.textContent,D.value=I.textContent,d(j,u),n(T)})),B.addEventListener("click",t),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,n,r,o,a){var c=Array.from(e.querySelectorAll(t)),i=e.querySelector(o);l(c,i,a),c.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n,r):function(e,t,n,r,o){var a=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),a.textContent=n,a.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,n,r),l(c,i,a)}))}))}(t,e.inputSelector,e.inputErrorClass,e.errorClass,e.submitButtonSelector,e.inactiveButtonClass)}))}(u),Promise.all([fetch("".concat(a.baseUrl,"/users/me"),{headers:a.headers}).then(c),fetch("".concat(a.baseUrl,"/cards"),{headers:a.headers}).then(c)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,s=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=r[0],c=a.name,i=a.about,u=a.avatar,s=a._id,l=r[1];M({name:c,description:i,avatar:u}),l.forEach((function(e){_.append(o({currentUserId:s,template:h,data:e,onDelete:V,onLike:J,onImageClick:z}))}))})).catch((function(e){console.error(e)}))})();