// @todo: Темплейт карточки

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция удаления карточки
const deleteCard = (event) => {
    event.target.closest('.card').remove();
}
// @todo: Функция создания карточки
const createCard = (data, deleteCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = data.link;
    cardElement.querySelector('.card__image').alt = data.alt;
    cardElement.querySelector('.card__title').textContent = data.name;

    cardElement
      .querySelector('.card__delete-button')
      .addEventListener('click', deleteCard);

    return cardElement;
};

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  cardsContainer.append(createCard(data, deleteCard));
});