import { likeCard, unLikeCard } from './api.js';

const cardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    unLikeCard(cardId)
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
     likeCard(cardId)
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

const createCard = ({
  currentUserId,
  template,
  data,
  onDelete,
  onLike,
  onImageClick,
}) => {
  const element = template.querySelector('.card').cloneNode(true);

  const image = element.querySelector('.card__image');
  image.addEventListener('click', () =>
    onImageClick({
      cardName: data.name,
      cardLink: data.link,
    })
  );
  image.src = data.link;
  image.alt = data.name;

  element.querySelector('.card__title').textContent = data.name;

  const counter = element.querySelector('.card__like-counter');

  if (data.likes.length) {
    counter.classList.add('card__like-counter_is-active');
    counter.textContent = data.likes.length;
  }

  const deleteButton = element.querySelector('.card__delete-button');

  if (data.owner['_id'] === currentUserId) {
    deleteButton.classList.add('card__delete-button_is-active');
    deleteButton.addEventListener('click', () => {
      onDelete({
        cardId: data['_id'],
        cardElement: element,
        buttonElement: deleteButton,
      });
    });
  }

  const likeButton = element.querySelector('.card__like-button');

  if (data.likes.find((element) => element['_id'] === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    onLike({
      cardId: data['_id'],
      buttonElement: likeButton,
      counterElement: counter,
    });
  });

  return element;
};

export { createCard, cardLike };