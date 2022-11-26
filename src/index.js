import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;

const refs = {
  searchForm: document.querySelector(`.search-form`),
  searchInput: document.querySelector(`.search-form__input`),
  btnSubmit: document.querySelector(`.search-form__button`),
  btnLoadMore: document.querySelector(`.load-more`),
  gallery: document.querySelector(`.gallery`),
};

let page = 1;
let inputValue = '';
let totalHits;
let currentHits = 0;
const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `31443725-552c7029b7e3db06c0fa48d2c`;

refs.searchForm.addEventListener('submit', formSubmit);
refs.gallery.addEventListener('click', onClick);

function formSubmit(event) {
  event.preventDefault();
 
  refs.gallery.innerHTML = '';
  inputValue = refs.searchForm[0].value.trim();
  page = 1;
  currentHits = 0;

  fetchPhoto().then(array => {
    if (inputValue === '' || array.hits.length === 0) {
    
      return Notiflix.Notify.failure(
        'Sorry, there sre no images matching your search query. Please try again.'
      );
    }
    let markup = addMarkup(array.hits);
    refs.gallery.insertAdjacentHTML(`beforeend`, markup);
 
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
    lightbox.init();
  });

  refs.searchForm.reset();
}
function onClick(event) {
  event.preventDefault();
}
async function fetchPhoto(page = 1) {
  try {
    const options = new URLSearchParams({
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    let url = `${BASE_URL}?key=${API_KEY}&q=${inputValue}&page=${page}&${options}`;
    const response = await axios.get(url, options);
    const photos = await response.data;
    totalHits = await response.data.totalHits;
    return photos;
  } catch {
    error;
  }
}

function addMarkup(array) {
  currentHits += array.length;
  const mark = array.reduce((ac, element) => {
    ac += `<div class="photo-card" width="300px">
        <a href="${element.largeImageURL}">
           <img class="photo-img" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
           </a>
           <div class="info">
             <p class="info-item">
               <b>Likes</b>
               ${element.likes}
             </p>
             <p class="info-item">
               <b>Views</b>
               ${element.views}
             </p>
             <p class="info-item">
               <b>Comments</b>
               ${element.comments}
             </p>
             <p class="info-item">
               <b>Downloads</b>
               ${element.downloads}
             </p>
           </div>
        </div>`;

    return ac;
  }, '');
  return mark;
}
const lightbox = {
  init() {
    this.lightbox = new SimpleLightbox('.photo-card a', {
      captionsData: 'alt',
      captionDelay: 250,
      close: false,
      showCounter: false,
    });
  },

  refresh() {
    this.lightbox.refresh();
  },
};

function onLoading() {
  page += 1;
  if (currentHits >= totalHits) {
  
    return Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  fetchPhoto(page).then(array => {
    let markup = addMarkup(array.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    if (array.totalHits <= page * 40) {
     
      return Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
}

window.addEventListener(`scroll`, () => {
  const docPos = document.documentElement.getBoundingClientRect();
  if (docPos.bottom < document.documentElement.clientHeight) {
    Notiflix.Notify.info('Loading more images...');
    onLoading();
  }
});