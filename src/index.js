//Импорт
import './pages/index.css';

import { initialCards } from './components/cards.js';

import { closeModal, openModal, handleModalClick } from './components/modal.js';

import { likeCard, deleteCard, createCard } from './components/card.js';

//Глобальные переменные
const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');

const cardsContainer = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');

// Функции
const handleCardImageClick = (cardName, cardLink) => {
  popupImageImage.src = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
};

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  cardsContainer.prepend(
    createCard(
      cardTemplate,
      {
        name: cardNameInput.value,
        link: cardLinkInput.value,
      },
      deleteCard,
      likeCard,
      handleCardImageClick
    )
  );

  cardForm.reset();

  closeModal(popupCard);
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(popupProfile);
};

const handlePopupProfileButtonOpenClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
  cardForm.reset();

  openModal(popupCard);
};

cardForm.addEventListener('submit', handleCardFormSubmit);

profileForm.addEventListener('submit', handleProfileFormSubmit);


popupImage.addEventListener('click', handleModalClick);

popupCard.addEventListener('click', handleModalClick);
popupCardButtonOpen.addEventListener('click', handlePopupCardButtonOpenClick);

popupProfile.addEventListener('click', handleModalClick);

popupProfileButtonOpen.addEventListener(
  'click',
  handlePopupProfileButtonOpenClick
);

initialCards.forEach((cardData) => {
  cardsContainer.append(
    createCard(
      cardTemplate,
      cardData,
      deleteCard,
      likeCard,
      handleCardImageClick
    )
  );
});