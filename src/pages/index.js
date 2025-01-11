/*import './index.css';

import { closeModal, openModal, handleModalClick } from '../components/modal.js';

import { createCard as DOMCreateCard } from '../components/card.js';

import {
  getInitialCards as APIGetetInitialCards,
  getUserInfo as APIGetUserInfo,
  updateUserAvatar as APIUpdateUserAvatar,
  updateUserInfo as APIUpdateUserInfo,
  likeCard as APILikeCard,
  unLikeCard as APIUnLikeCard,
  createCard as APICreateCard,
  deleteCard as APIDeleteCard,
} from '../components/api.js';

import { enableValidation, clearValidation, } from '../components/validation.js'

import { validationConfig } from '../components/validation.js';
//const validationConfig = {
// formSelector: '.popup__form',
  //inputSelector: '.popup__input',
  //submitButtonSelector: '.popup__button',
  //inactiveButtonClass: '.popup__button_disabled',
  //inputErrorClass: '.popup__input_type_error',
 // errorClass: '.popup__error_visible',
//};

const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');

const cardsContainer = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button')
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton = profileImageForm.querySelector('.popup__button');

const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button')
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    APIUnLikeCard(cardId)
    .then(({ likes }) => {
      buttonElement.classList.remove('card__like-button_is-active');

      if (likes.length) {
        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
      } else {
        counterElement.classList.remove('card__like-counter_is-active');
        counterElement.textContent = '';
      }
    })
    .catch((error) => console.error(error))
    .finally(() => {
      buttonElement.disabled = false;
    });
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add('card__like-button_is-active');

        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    APIDeleteCard(cardId)
      .then(() => {
        buttonElement.closest('.card').remove();

        closeModal(popupConfirm);
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  
  renderLoading({
    buttonElement: cardFormSubmitButton,
    isLoading: true,
  });

  APICreateCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(DOMCreateCard({
        currentUserId: cardData.owner['_id'],
        template: cardTemplate,
        data: cardData,
        onDelete: handleCardDelete,
        onLike: handleCardLike,
        onImageClick: handleCardImageClick,
        })
      );

      cardForm.reset();

      closeModal(popupCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: false,
      });
    });
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });

  APIUpdateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(( name, about, avatar ) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

    closeModal(popupProfile);

    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileFormSubmitButton,
        isLoading: false,
      });
    });
};

const handleProfileImageFormSubmit = (evt) => {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });

  APIUpdateUserAvatar(profileImageInput.value)
    .then(( name, about, avatar ) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

    closeModal(popupProfileImage);

    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
};

const handlePopupProfileButtonOpenClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);

  openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
  cardForm.reset();

  clearValidation(cardForm, validationConfig);

  openModal(popupCard);
};

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImageImage.scr = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
};

const handleProfileImageClick = () => {
  profileImageForm.reset();

  clearValidation(profileImageForm, validationConfig);

  openModal(popupProfileImage);
};

cardForm.addEventListener('submit', handleCardFormSubmit);

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);

popupImage.addEventListener('click', handleModalClick);

popupProfileImage.addEventListener('click', handleModalClick);

profileImage.addEventListener('click', handleProfileImageClick);

popupCard.addEventListener('click', handleModalClick);

popupCardButtonOpen.addEventListener('click', handlePopupCardButtonOpenClick);

popupProfile.addEventListener('click', handleModalClick);

popupProfileButtonOpen.addEventListener('click', handlePopupProfileButtonOpenClick);

popupConfirm.addEventListener('click', handleModalClick);

enableValidation(validationConfig);

/*Promise.all([APIGetUserInfo(), APIGetetInitialCards()])
  .then(([{ name, about, ['_id']: currentUserId}, cardsData]) => {
    setProfile({
      name,
      discription: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });*/
  /*Promise.all([APIGetUserInfo(), APIGetetInitialCards()])
  .then(([user, cardsData]) => {
    setProfile({
      name: user.name,
      discription: user.about,
      avatar: user.avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });*/

/*import "./index.css"; /// добавляем импорт главного файла стилей

import { createCard, likeCard, getCardForDeletion } from "../components/card.js";

import { openModal, closeModal } from "../components/modal.js";

import { enableValidation, clearValidation } from "../components/validation.js";

import {
  getUserInfo,
  getInitialCards,
  getInitialInfo,
  deleteMyCard,
  editProfile,
  postNewCard,
  updateNewAvatar,
} from "../components/api.js";

import { validationConfig } from "../components/validation.js";

/// для создания карточки
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

/// Функция добавления карточки
function addCard(
  card,
  placesList,
  cardTemplate,
  createCard,
  likeCard,
  showImgPopup,
  openDeletePopup,
  profileId
) {
  const cardElement = createCard(
    card,
    cardTemplate,
    likeCard,
    showImgPopup,
    openDeletePopup,
    profileId
  );
  placesList.append(cardElement);
}

/// Функция заполнения страницы карточками
function fillCards(initialCards, profileId) {
  initialCards.forEach((card) => {
    addCard(
      card,
      placesList,
      cardTemplate,
      createCard,
      likeCard,
      showImgPopup,
      openDeletePopup,
      profileId
    );
  });
}

/// Функция button loading пока данные загружаются
const showLoadingBtn = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

/// Popup редактирования профиля
const editPopup = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeEditButton = editPopup.querySelector(".popup__close");
const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editSaveButton = editPopup.querySelector(".popup__button");

profileEditButton.addEventListener("click", () => {
  openModal(editPopup);
  fillPopupEditInputs();
  clearValidation(editForm, validationConfig);
});

closeEditButton.addEventListener("click", () => {
  closeModal(editPopup);
});

/// Функция сохранения полей ввода формы
function fillPopupEditInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

/// Функция редактирования профиля
function handleEditForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  showLoadingBtn(true, editPopup.querySelector(".popup__button"));
  editSaveButton.disabled = true;
  editProfile(nameValue, jobValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(editPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      showLoadingBtn(false, editPopup.querySelector(".popup__button"));
    });
}

editForm.addEventListener("submit", handleEditForm);

/// Popup добавления карточек
const addCardPopup = document.querySelector(".popup_type_new-card");
const openAddButton = document.querySelector(".profile__add-button");
const closeAddButton = addCardPopup.querySelector(".popup__close");
const addForm = document.querySelector('form[name="new-place"]');
const cardInput = addForm.querySelector(".popup__input_type_card-name");
const linkInput = addForm.querySelector(".popup__input_type_url");
const addSaveButton = addCardPopup.querySelector(".popup__button");

openAddButton.addEventListener("click", () => {
  openModal(addCardPopup);
  addForm.reset();
  clearValidation(addForm, validationConfig);
});

closeAddButton.addEventListener("click", () => {
  closeModal(addCardPopup);
});

/// Функция загрузки с сервера и добавления карточек на страницу
function handleAddForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const linkValue = linkInput.value;
  showLoadingBtn(true, addForm.querySelector(".popup__button"));
  addSaveButton.disabled = true;
  postNewCard(cardValue, linkValue)
    .then((card) => {
      const newCard = createCard(
        card,
        cardTemplate,
        likeCard,
        showImgPopup,
        openDeletePopup,
        profileId
      );
      placesList.prepend(newCard);
      closeModal(addCardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      addForm.reset();
      showLoadingBtn(false, addForm.querySelector(".popup__button"));
    });
}

addForm.addEventListener("submit", handleAddForm);

/// Popup увеличение картинок
const imgPopup = document.querySelector(".popup_type_image");
const closePhotoButton = imgPopup.querySelector(".popup__close");
const zoomedPopupImage = imgPopup.querySelector(".popup__image");
const imgPopupCaption = imgPopup.querySelector(".popup__caption");

closePhotoButton.addEventListener("click", () => {
  closeModal(imgPopup);
});

/// Функция показа Popup увеличения картинок
function showImgPopup(evt) {
  openModal(imgPopup);
  zoomedPopupImage.setAttribute("src", evt.target.src);
  zoomedPopupImage.setAttribute("alt", evt.target.alt);
  imgPopupCaption.textContent = evt.target.alt;
}

/// Popup редактирования аватара
const profileImageButton = document.querySelector(".profile__image_cover");
const profileImage = document.querySelector(".profile__image");
const profilePopup = document.querySelector(".popup_type_avatar");
const closeProfileButton = profilePopup.querySelector(".popup__close");
const profileForm = document.forms["avatar_edit"];
const profileLinkInput = profileForm.querySelector(".popup__input_type_url");
const profileSaveButton = profilePopup.querySelector(".popup__button");

profileImageButton.addEventListener("click", () => {
  openModal(profilePopup);
  profileForm.reset();
  clearValidation(profileForm, validationConfig);
});

closeProfileButton.addEventListener("click", () => {
  closeModal(profilePopup);
});

/// Функция смены аватара
function handleProfileForm(evt) {
  evt.preventDefault();
  const linkValue = profileLinkInput.value;
  profileImage.style.backgroundImage = linkValue;
  showLoadingBtn(true, profilePopup.querySelector(".popup__button"));
  profileSaveButton.disabled = true;
  updateNewAvatar(linkValue)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(profilePopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profileForm.reset();
      showLoadingBtn(false, profileForm.querySelector(".popup__button"));
    });
}

profileForm.addEventListener("submit", handleProfileForm);

/// Popup удаления карточки с сервера
const deletePopup = document.querySelector(".popup_type_delete");
const closeDeleteButton = deletePopup.querySelector(".popup__close");
const deleteForm = document.querySelector('form[name="delete-card"');

const openDeletePopup = () => {
  openModal(deletePopup);
};

const closeDeletePopup = () => {
  closeModal(deletePopup);
};

closeDeleteButton.addEventListener("click", closeDeletePopup);

/// Функция удаления карточки
function deleteThisCard({ cardId, deleteButton }) {
  deleteMyCard(cardId)
    .then(() => {
      const deleteItem = deleteButton.closest(".places__item");
      deleteItem.remove();
      closeDeletePopup();
    })
    .catch((error) => {
      console.log(error);
    });
}

///функция подтверждения удаления карточки
function handleDeleteForm(evt) {
  evt.preventDefault();
  deleteThisCard(getCardForDeletion());
}

deleteForm.addEventListener("submit", handleDeleteForm);

///вызов функции получение информации о пользователе и карточках с сервера и заполнение ими страницы
let profileId;

getInitialInfo();
Promise.all([getUserInfo(), getInitialCards()])
  .then((array) => {
    const [userList, initialCards] = array;
    profileTitle.textContent = userList.name;
    profileDescription.textContent = userList.about;
    profileId = userList._id;
    profileImage.style.backgroundImage = `url(${userList.avatar})`;
    fillCards(initialCards, profileId);
  })
  .catch((error) => {
    console.log(error);
  });

///валидация
enableValidation(validationConfig); */

import './index.css';

import {
  closeModal,
  openModal,
  handleModalClick,
} from '../components/modal.js';

import { createCard as DOMCreateCard } from '../components/card.js';

import {
  getInitialCards as APIGetInitialCards,
  getUserInfo as APIGetUserInfo,
  updateUserAvatar as APIUpdateUserAvatar,
  updateUserInfo as APIUpdateUserInfo,
  likeCard as APILikeCard,
  unLikeCard as APIUnLikeCard,
  createCard as APICreateCard,
  deleteCard as APIDeleteCard,
} from '../components/api.js';

import { clearValidation, enableValidation } from '../components/validation.js';

const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');

const cardsContainer = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton =
  profileImageForm.querySelector('.popup__button');

const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const toggleSubmitButtonState = ({ buttonElement, isSubmitting }) => {
  if (isSubmitting) {
    buttonElement.disabled = true;
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.disabled = false;
    buttonElement.textContent = 'Сохранить';
  }
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    APIUnLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove('card__like-button_is-active');

        if (likes.length) {
          counterElement.classList.add('card__like-counter_is-active');
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove('card__like-counter_is-active');
          counterElement.textContent = '';
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add('card__like-button_is-active');

        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  // так как по сути кнопка "Да" все равно выполняет только ровно одну операцию как confirm()
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    APIDeleteCard(cardId)
      .then(() => {
        buttonElement.closest('.card').remove();
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      })
      .finally(() => {
        closeModal(popupConfirm);
      });
  };
};

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  toggleSubmitButtonState({
    buttonElement: cardFormSubmitButton,
    isSubmitting: true,
  });

  APICreateCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(
        DOMCreateCard({
          currentUserId: cardData.owner['_id'],
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );

      cardForm.reset();

      closeModal(popupCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      toggleSubmitButtonState({
        buttonElement: cardFormSubmitButton,
        isSubmitting: false,
      });
    });
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  toggleSubmitButtonState({
    buttonElement: profileFormSubmitButton,
    isSubmitting: true,
  });

  APIUpdateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfile);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      toggleSubmitButtonState({
        buttonElement: profileFormSubmitButton,
        isSubmitting: false,
      });
    });
};

const handleProfileImageFormSubmit = (event) => {
  event.preventDefault();

  toggleSubmitButtonState({
    buttonElement: profileImageFormSubmitButton,
    isSubmitting: true,
  });

  APIUpdateUserAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      toggleSubmitButtonState({
        buttonElement: profileImageFormSubmitButton,
        isSubmitting: false,
      });
    });
};

const handlePopupProfileButtonOpenClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, VALIDATION_CONFIG);

  openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
  cardForm.reset();

  clearValidation(cardForm, VALIDATION_CONFIG);

  openModal(popupCard);
};

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImageImage.src = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
};

const handleProfileImageClick = () => {
  profileImageForm.reset();

  clearValidation(profileImageForm, VALIDATION_CONFIG);

  openModal(popupProfileImage);
};

cardForm.addEventListener('submit', handleCardFormSubmit);

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);

popupImage.addEventListener('click', handleModalClick);

popupProfileImage.addEventListener('click', handleModalClick);

profileImage.addEventListener('click', handleProfileImageClick);

popupCard.addEventListener('click', handleModalClick);
popupCardButtonOpen.addEventListener('click', handlePopupCardButtonOpenClick);

popupProfile.addEventListener('click', handleModalClick);
popupProfileButtonOpen.addEventListener(
  'click',
  handlePopupProfileButtonOpenClick
);

popupConfirm.addEventListener('click', handleModalClick);

enableValidation(VALIDATION_CONFIG);

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });