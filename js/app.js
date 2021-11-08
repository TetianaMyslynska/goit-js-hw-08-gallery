import itemsDefault from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalOverlay: document.querySelector(".lightbox__overlay"),
  modalImage: document.querySelector(".lightbox__image"),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};
const galleryMarkup = createGalleryMarkup(itemsDefault);
refs.galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(elements) {
  return elements
    .map(({ preview, original, description }) => {
      return `<li class = 'gallery__item'>
<a class = 'gallery__link' href = '${original}' >
<img class = 'gallery__image' src = '${preview}'data-source = '${original}' alt = '${description}'/></a></li>`;
    })
    .join("");
}

refs.galleryList.addEventListener("click", onOpenModal);

function onOpenModal(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  evt.preventDefault();
  refs.modal.classList.add("is-open");
  const { dataset, alt } = evt.target;
  console.log(dataset);
  updateAttr(dataset.source, alt);
  updateEventListener("addEventListener");
}

function updateAttr(src = "", alt = "") {
  refs.modalImage.src = src;
  refs.modalImage.alt = alt;
}

function updateEventListener(key) {
  document[key]("keydown", onEscKeyPress);
  document[key]("keydown", onArrowLeftPress);
  document[key]("keydown", onArrowRightPress);
}

refs.modalCloseBtn.addEventListener("click", onCloseModal);

function onCloseModal() {
  refs.modal.classList.remove("is-open");
  updateAttr();
  updateEventListener("removeEventListener");
}

refs.modalOverlay.addEventListener("click", onOverlayClick);

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

const onEscKeyPress = (evt) => {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = evt.code === ESC_KEY_CODE;
  if (isEscKey) {
    onCloseModal();
  }
};

function onArrowLeftPress(evt) {
  const ARR_LEFT_KEY_CODE = "ArrowLeft";
  const isArrLeftKey = evt.code === ARR_LEFT_KEY_CODE;
  if (isArrLeftKey) {
    const sources = itemsDefault.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(refs.modalImage.src);
    if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = sources.length;
    }
    refs.modalImage.src = sources[indexOfCurrentImg - 1];
    console.log(indexOfCurrentImg);
  }
}

function onArrowRightPress(evt) {
  const ARR_RIGHT_KEY_CODE = "ArrowRight";
  const isArrRightKey = evt.code === ARR_RIGHT_KEY_CODE;
  if (isArrRightKey) {
    const sources = itemsDefault.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(refs.modalImage.src);
    if (indexOfCurrentImg + 1 > sources.length - 1) {
      indexOfCurrentImg = -1;
    }
    refs.modalImage.src = sources[indexOfCurrentImg + 1];
    console.log(indexOfCurrentImg + 1);
  }
}
