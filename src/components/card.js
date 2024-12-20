const createCard = (template, data, onDelete, onLike, onImageClick) => {
    const element = template.querySelector('.card').cloneNode(true);

    const image = element.querySelector('.card__image');
    image.addEventListener('click', () => onImageClick(data.name, data.link));
      image.src = data.link;
      image.alt = data.alt;
    
    element.querySelector('.card__title').textContent = data.name;

    element
      .querySelector('.card__delete-button')
      .addEventListener('click', onDelete);

    element
      .querySelector('.card__like-button')
      .addEventListener('click', onLike);

    return element;

};

const deleteCard = (event) => {
    event.target.closest('.card').remove();
};

const likeCard = (event) => {
    event.currentTarget.classList.toggle('card__like-button_is-active');
};

export { likeCard, deleteCard, createCard };
