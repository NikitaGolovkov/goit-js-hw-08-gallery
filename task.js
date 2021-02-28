import defaultRef from './gallery-items.js';

const openModalWindow = document.querySelector('.js-lightbox');
const closeModalWindow = document.querySelector(
  'button[data-action ="close-lightbox"]',
);
const lightBoxImageRef = document.querySelector('.lightbox__content');

//Делаем функцию c коснтурктором разметки==================
const makeLiImage = value => {
  //Создаю разметку================
  const liRef = document.createElement('li');
  liRef.classList.add('gallery__item');
  //console.log(liRef);

  const aRef = document.createElement('a');
  aRef.classList.add('gallery__link');
  aRef.setAttribute('href', `${value.original}`);

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.setAttribute('src', `${value.preview}`);
  imgRef.setAttribute('data-source', `${value.original}`);
  imgRef.setAttribute('alt', `${value.description}`);

  liRef.appendChild(aRef);
  aRef.appendChild(imgRef);

  return liRef;
};
//Нашли ЮЛ наш=================
const divRef = document.querySelector('ul');
//Проходим по массиву объектов мапОм и создаем разметку для каждого объекта
const imageList = defaultRef.map(value => makeLiImage(value));
//console.log(imageList);
//Добавляю в ДОМ=============
divRef.append(...imageList);

//вешаем слушателя
divRef.addEventListener('click', onGalleryClick);
function onGalleryClick(event) {
  //event.preventDefault();прекращаем Дефолтное поведение
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  //Откытие модалки
  openModalWindow.classList.add('is-open');
  //Подмена src в модалке

  lightBoxImageRef.innerHTML = `<img class="lightbox__image" src='${event.target.dataset.source}' alt="" />`;
}

//Закрытие модалки
closeModalWindow.addEventListener('click', handleCloseButton);
function handleCloseButton() {
  //Очистка фото после закрытия
  lightBoxImageRef.innerHTML = `<img class="lightbox__image" src='' alt="" />`;
  openModalWindow.classList.remove('is-open');
}
