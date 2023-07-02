import datas from './datas.js'

const genresContainer = document.querySelector('.genres-container');
const moviesSection = document.querySelector('.movies-section');
const moviesContainer = document.querySelector('.movies-container');
const showMovieBox = document.querySelector('.show-movie-box');

showMovies('shuffle');
showGenres();
 
function showMovies(sortCondition) {
  moviesContainer.innerHTML = ``;

  moviesSection.querySelector('h3').textContent = sortCondition;

  const addMovieHTML = (container, movie, i) => {
    const movieTemplate = `
      <div class="movie-wrapper">
        <p class="movie-xp">${movie.xp ? movie.xp+'XP' : '0XP'}</p>
        <img src="${movie.Poster ? movie.Poster : 'images/posters/no-iamge.svg'}" alt="">
        <div class="movie-title-wrapper">
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
          <a href="#" data-movie-index="${i}" class="movie-link">${movie.Title}</a>
        </div>
      </div>
    `;
    container.innerHTML += movieTemplate;
  }
  
  let moviesData; 

  if (sortCondition === 'shuffle') {
    datas.movies.forEach((movie, i) => {
      addMovieHTML(moviesContainer, movie, i);
    });

    moviesData = datas.movies;
  } else {
    const sortedMovies = showByCategory(sortCondition)
    sortedMovies.forEach((movie, i) => {
      addMovieHTML(moviesContainer, movie, i);
    });

    moviesData = sortedMovies;
  }

  const shownMovies = document.querySelectorAll('.movie-link');

  shownMovies.forEach((shownMovie, i) => {
    shownMovie.addEventListener('click', () => {
      // const movieIndex = shownMovie.getAttribute('data-movie-index');
      showParticularMovie(moviesData, i);
      showMovieBox.classList.toggle('hidden');
      document.body.classList.toggle('noScroll');
    });
  });

}

function showGenres() {

  const icons = {
    Action: 'swords',
    Adventure: 'Forest',
    Horror: 'Directions_run',
    Romance: 'Favorite',
    Mystery: 'Mystery',
    War: 'Sword_rose',
    Crime: 'Surgical',
    Comedy: 'Theater_Comedy',
    Drama: 'Sentiment_Sad',
    Family: 'Family_restroom',
    Thriller: 'sports_martial_arts'
  };

  const genresContainerUlElement = genresContainer.querySelector('ul');

  genresContainerUlElement.innerHTML = ``;

  genresContainerUlElement.innerHTML += `
    <li>
      <button class="category-selector-button">
        <span class="material-symbols-sharp">shuffle</span>
        <p>shuffle</p>
      </button>
    </li>
  `;

  const allGenres = [];
  datas.movies.forEach((movie, i) => {
    movie.Genre.split(',').forEach(gen => {      
      if (!allGenres.includes(gen.trim())) {
        allGenres.push(gen.trim())
      }
    })
  });

  allGenres.forEach(genre => {
    genresContainerUlElement.innerHTML += `
      <li>
        <button class="category-selector-button">
          <span class="material-symbols-sharp">${icons[genre] ?? 'question_mark'}</span>
          <p>${genre}</p>
        </button>
      </li>
    `;
  });

  const categorySelectors = document.querySelectorAll('.category-selector-button');

  categorySelectors.forEach(selectorButton => {
    selectorButton.addEventListener('click', () => {
      const categoryName = selectorButton.querySelector('p').textContent;
      showMovies(categoryName);
    });
  });

}

function showParticularMovie(moviesData, i) {
  showMovieBox.innerHTML = ``;

  showMovieBox.innerHTML = `
    <div class="show-movie-top-wrapper">
    <div class="show-movie-buttons">
      <button class="close-movie-box">
        <span class="material-symbols-sharp">close</span>
      </button>
      <button class="bookmark-movie-button">
        <span class="material-symbols-sharp">Bookmark</span>
      </button>
    </div>
    <img src="${moviesData[i].Poster}" alt="">
    </div>
    <div class="show-movie-bottom-container">
    <div class="movie-rating-wrapper">
      <div class="imdb-rating">
        <p>IMDB ${moviesData[i].imdbRating}</p>
      </div>
      <div class="movie-review">
        <div>
          <span class="material-symbols-outlined">star</span>
          <p>${moviesData[i].Ratings[1].Value ? moviesData[i].Ratings[1].Value : moviesData[i].Ratings[0].Value}</p>
        </div>
        <p>
         ${moviesData[i].Ratings[1].Source ? moviesData[i].Ratings[1].Source : moviesData[i].Ratings[0].Source}
        </p>
      </div>
    </div>
    <div class="movie-name-wrapper">
      <h2>${moviesData[i].Title}</h2>
    </div>
    <ul class="movie-categories-wrapper">
      <li>Action</li>
      <li>Action</li>
      <li>Action</li>
    </ul>
    <div class="movie-description-wrapper">
      <p>
        ${moviesData[i].Plot}
      </p>
      <div class="reservation-wrapper">
        <button>Get Reservation</button>
      </div>
    </div>
    </div>
  `;

  const movieGenres = moviesData[i].Genre.split(',');

  const movieCategoryUlElement = document.querySelector('.movie-categories-wrapper');

  movieCategoryUlElement.innerHTML = ``;

  movieGenres.forEach(genre => {
    movieCategoryUlElement.innerHTML += `<li>${genre}</li>`;
  })

  document.querySelector('.close-movie-box').addEventListener('click', () => {
    showMovieBox.classList.toggle('hidden');
    document.body.classList.toggle('noScroll');
  });
}


function showByCategory(sortCondition) {
  let movies = [];

  datas.movies.forEach(movie => {
    let genres = movie.Genre.split(',');
    genres.forEach(genre => {
      if (genre.trim() === sortCondition) {
        movies.push(movie);
      }
    })
  })

  return movies;

}