const handleDocumentKeydown = (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.popup.popup_is-opened').forEach((element) => {
        closeModal(element);
      });
    }
  };
  
  const handleModalClick = (event) => {
    if (event.target.classList.contains('popup_is-opened')) {
      return closeModal(event.target);
    }
  
    if (event.target.closest('.popup__close')) {
      return closeModal(event.target.closest('.popup'));
    }
  };
  
  const openModal = (element) => {
    element.classList.add('popup_is-animated');
    element.offsetWidth;
    element.classList.add('popup_is-opened');
  
    document.addEventListener('keydown', handleDocumentKeydown);
    element.addEventListener('click', handleModalClick);
  };
  
  const closeModal = (element) => {
    document.removeEventListener('keydown', handleDocumentKeydown);
    element.removeEventListener('click', handleModalClick);
  
    element.addEventListener('transitionend',() => {
        element.classList.remove('popup_is-animated');
      },
      { once: true }
    );
  
    element.classList.remove('popup_is-opened');
  };
  
  export { openModal, closeModal, handleModalClick };