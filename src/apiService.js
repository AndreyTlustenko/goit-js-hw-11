// const BASE_URL='https://pixabay.com/api/';
// const API_KEY = '31443725-552c7029b7e3db06c0fa48d2c';

// import axios from "axios";
// export default
//  class NewsApiService {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//         this.totalHits = null;
//     }

//     async fetchHits() {
//     try {
//         return await axios.get('https://pixabay.com/api/', {
//             params: {
//                 key: "31443725-552c7029b7e3db06c0fa48d2c",
//                 q: this.searchQuery,
//                 image_type: "photo",
//                 orientation: "horizontal",
//                 safesearch: true,
//                 per_page: 40,
//                 page: this.page,
//             }
//         }).then(response => { 
//             return response.data;
//         }).then(data => {
//             return data;
//         })
//     } catch (error) {
//         console.log(error);
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }
//     }
    
//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     decreaseTotalHits() {
//         this.totalHits = this.totalHits - 40;
//     }
// }

// export { NewsApiService };

// export default class NewsApiService {
//     constructor(){
//         this.searchQuery = '';
//         this.page = 1;
//         this.totalHits = null;
//     }
//     async fetchHits() {
//     const options = {
//        key: API_KEY 
//     };
//     //   const url = `https://pixabay.com/api/?key=31443725-552c7029b7e3db06c0fa48d2c&q=${this.searchQuery}&image_tipe=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;
//      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${this.page}`;
   
//  try {
//     // return await fetch(url, options)
//     // .then(response => { 
//     //     return response.data;
//     // }).then(data => {
//     //     return data;
//     // })
//      const response = await fetch(url, options);
//         const data = await response.json();
//         console.log(data);
//         this.incrementPage();
//         return data;
//     } catch (error) {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }
//      }

//    incrementPage(){
//     this.page += 1;
//    }

//    resetPage() {
//     this.page = 1;
//     }
    
//     decreaseTotalHits() {
//         this.totalHits = this.totalHits - 40
//     }

//     get query(){
//         return this.searchQuery;
//     }

//     set query(newQuery){
//         this.searchQuery = newQuery;
//     }
// }