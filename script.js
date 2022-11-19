const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a601d40238112fa662ef5f9a2ed81932&';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a601d40238112fa662ef5f9a2ed81932&query="'
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const loadMore = document.getElementById('loadMore');

let movieHolder = [];
let pages = 1;
getMovies(API_URL);


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = search.value;

    if (result !== '' && result) {
        getMovies(SEARCH_API + result);
        search.value = '';
    } else {
        window.location.reload();
    }
    
})

//GETTING MOVIES FROM API
async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    showMorePages(data.results);
}
// RENDER HTML
function renderHtml(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {

        const { title, poster_path, vote_average, overview } = movie;
    
        main.innerHTML += `
            <div class="movie-card">
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="detail">
                    <h3 class="movie-title">${title}</h3>
                    <p class="imdb-score ${rateColor(vote_average)}">${vote_average}</p>
                    <div class="description">
                        <h2>Overview</h2>
                        <p>${overview}</p>
                    </div>
                </div>
            </div>
        `
    });

}

function rateColor(rate) {
    const score = document.querySelector('.imdb-score');
    if (rate >= 7) {
        return 'green';    
    }
    else if (rate >= 5) {
        return 'yellow';
    }
    else {
        return 'red';
    }
}

// LoadMore BUTTON
loadMore.addEventListener('click', () => {
    pages++;
    const urlNew = `${API_URL}page=${pages}`
    getMovies(urlNew);
});

// TAKING EVERY PAGE INTO ARRAY
function showMorePages(array) {
    array.forEach(element => {
        movieHolder.push(element)
    })
    renderHtml(movieHolder)  
}

function clearHTML() {
    main.innerHTML = '';
}