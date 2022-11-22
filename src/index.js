// import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadMoreBtn from "./load-more-btn";
import NewsApiService from "./apiService";

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
        
    // loadMoreBtn.show();
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
        if (newsApiService.totalHits <= 40) { 
          
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
    
