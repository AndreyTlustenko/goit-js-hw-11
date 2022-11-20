// import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadMoreBtn from "./load-more-btn";
import NewsApiService from "./apiService";

// const refs = {
// form: document.querySelector('#search-form'),
// button: document.querySelector('.button'), 
// gallery: document.querySelector('.gallery'), 
// // loadMoreBtn: document.querySelector('[data-action="load-more"]'),

// }
const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    hitsContainer: document.querySelector('.gallery'),
    }
    
    const newsApiService = new NewsApiService();
    
    console.log(newsApiService);
    
    refs.searchForm.addEventListener('submit', onSearch);
    refs.loadMoreBtn.addEventListener('click', onLoadMore);
    
    const loadMoreBtn = new LoadMoreBtn({
        selector: '.load-more',
        hidden: true,
    })
    console.log(loadMoreBtn)
        
    loadMoreBtn.show();
    loadMoreBtn.disabled();
    
    
    function onSearch(e) {
    e.preventDefault();
    clearHitsConainer();
        newsApiService.query = e.currentTarget.elements.searchQuery.value;
        if (newsApiService.query === '') {
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }
        newsApiService.resetPage();
        newsApiService.fetchHits().then(data => {
            newsApiService.totalHits = data.totalHits;
            console.log(newsApiService.totalHits);
            appendHitsMarkup(data.hits);
        });
        loadMoreBtn.enable();
    }
    
    function createHitsMarkup(hits) {
        return hits.map(({webformatURL, largeImageURL,
            tags, likes, views, comments, downloads,
        }) => {
            return `<div class="gallery__item photo-card">
        <a href='${largeImageURL}' class="gallery__link"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
            <p class="info-item">
                <b>Likes</br></b>${likes}
            </p>
            <p class="info-item">
                <b>Views</br></b>${views}
            </p>
            <p class="info-item">
                <b>Comments</br></b>${comments}
            </p>
            <p class="info-item">
                <b>Downloads</br></b>${downloads}
            </p>
        </div>
    </div>`
        }).join('');
    }
    
    const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });
    
    function onLoadMore() {
        newsApiService.decreaseTotalHits() 
        console.log(newsApiService.totalHits);
        if (
            newsApiService.totalHits <= 40) {
            loadMoreBtn.disabled();
        
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      };
           
        newsApiService.fetchHits().then(data => {
            appendHitsMarkup(data.hits)
        })
    }
    
    function appendHitsMarkup(hits) {
        refs.hitsContainer.insertAdjacentHTML('beforeend', createHitsMarkup(hits));
        lightbox.refresh()
    }
    
    function clearHitsConainer() {
        refs.hitsContainer.innerHTML = '';
    }
    
// const NewsApiService = new NewsApiService();

// refs.form.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);


// function onSearch(e){
//     e.preventDefault();
//     NewsApiService.query = e.currentTarget.elements.searchQuery.value;
//     // NewsApiService.resetPage();
//     NewsApiService.fetchArticles();
  //  }
//    function onSearch(e) {
//     e.preventDefault();
//     clearHitsConainer();
//         newsApiService.query = e.currentTarget.elements.searchQuery.value;
//         if (newsApiService.query === '') {
//             return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//         }
//         newsApiService.resetPage();
//         newsApiService.fetchHits().then(data => {
//             newsApiService.totalHits = data.totalHits;
//             console.log(newsApiService.totalHits);
//             appendHitsMarkup(data.hits);
//         });
//         loadMoreBtn.enable();
    // }

// function onLoadMore(){
//   NewsApiService.fetchArticles();
// }




// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import { imgApiService } from "./js/getImg";
// import { renderImgInfo } from "./js/renderHTML";

// let getEl = selector => document.querySelector(selector);
// getEl('.search-form').addEventListener('submit', onSearch);
// getEl('.load-more').addEventListener('click', onLoadMore);

// const imgApi = new imgApiService();
// console.log(imgApi);


// function onSearch(e) {
//     e.preventDefault();
//     imgApi.query = e.currentTarget.elements.searchQuery.value;
//     imgApi.resetPage();
//     imgApi.getImage().then(data => {
//         if (data.totalHits > 0) {
//             getEl('.gallery').insertAdjacentHTML('beforeend', renderImgInfo(data.hits));
//             // lightbox.refresh();
//             Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//         } else {
//             Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
//         }
//     }).catch(error => {
//         console.log(error);
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     })
// }


// function onLoadMore() {
//     imgApi.page += 1;
//     imgApi.getImage();
// }


// import axios from "axios";
// import NewsApiService from "./news-service";
// import Notiflix from "notiflix";
// import LoadMoreBtn from "./load-more-btn";
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

