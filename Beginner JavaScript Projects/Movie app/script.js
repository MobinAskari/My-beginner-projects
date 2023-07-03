import datas , { handleBookmarks } from './datas.js'
import { toggleTheme } from './UIScripts.js';

const sidebarLiElements = document.querySelector('.sidebar-items-wrapper').querySelectorAll('li');

sidebarLiElements.forEach(liElement => {
  const functionalities = {
    Browse: () => {
      showMovies(datas.movies, 'shuffle');
      showSuggestion(datas.movies);
      showGenres(datas.movies);
    },
    Bookmarks: () => {showBookmarks()},
    Tickets: () => {},
    Settings: () => {},
    Theme: () => {toggleTheme()},
  }

  liElement.addEventListener('click', () => {

    const isThemeElement = liElement.querySelector('p').textContent == 'Theme';

    isThemeElement ? '' : sidebarLiElements.forEach(liElement => {
      liElement.classList.remove('active')
    });
    
    isThemeElement ? '' : liElement.classList.add('active');


    functionalities[liElement.querySelector('p').textContent]();
  });

});

const mainContainer = document.querySelector('.main-container');
const movieSuggestionSection = document.querySelector(".movie-suggestion-section");
const genresContainer = document.querySelector('.genres-container');
const moviesSection = document.querySelector('.movies-section');
const moviesContainer = document.querySelector('.movies-container');
const showMovieBox = document.querySelector('.show-movie-box');

showMovies(datas.movies, 'shuffle');
showGenres(datas.movies);
showSuggestion(datas.movies)

function showMovies(data, sortCondition, byBookmarks) {
  moviesContainer.innerHTML = ``;

  moviesSection.querySelector('h3').textContent = sortCondition;

  const addMovieHTML = (container, movie) => {
    const movieTemplate = `
      <div class="movie-wrapper">
        <p class="movie-xp">${movie.xp ? movie.xp+'XP' : '0XP'}</p>
        <img src="${movie.Poster ? movie.Poster : 'images/posters/no-iamge.svg'}" alt="">
        <div class="movie-title-wrapper">
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
          <a href="#" data-movie-id="${movie.id}" class="movie-link">${movie.Title}</a>
        </div>
      </div>
    `;
    container.innerHTML += movieTemplate;
  }

  let moviesData; 

  if (sortCondition === 'shuffle') {
    if (byBookmarks) {
      data.forEach(movie => {
        movie.bookmarked === true ? addMovieHTML(moviesContainer, movie) : ''
      });
    } else {
      data.forEach(movie => {
        addMovieHTML(moviesContainer, movie);
      });
    }

    moviesData = data;
  } else {
    let sortedMovies;

    if (byBookmarks) {
      const bookmarkedMovies = [];

      data.forEach(movie => {
        movie.bookmarked === true ? bookmarkedMovies.push(movie) : ''
      });

      sortedMovies = sortByCategories(bookmarkedMovies, sortCondition);

      sortedMovies.forEach(movie => {
        addMovieHTML(moviesContainer, movie);
      });
    } else {

      sortedMovies = sortByCategories(data, sortCondition);

      sortedMovies.forEach(movie => {
        addMovieHTML(moviesContainer, movie);
      });

    }

    moviesData = sortedMovies;
  }

  const shownMovies = document.querySelectorAll('.movie-link');

  shownMovies.forEach(shownMovie => {
    shownMovie.addEventListener('click', () => {
      const movieId = parseFloat(shownMovie.getAttribute('data-movie-id'));
      showParticularMovie(datas.movies, movieId);
      showMovieBox.classList.toggle('hidden');
      document.body.classList.toggle('noScroll');
    });
  });

}

function showGenres(data, byBookmarks) {

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
  data.forEach((movie, i) => {
    if (byBookmarks) {
      movie.bookmarked ? movie.Genre.split(',').forEach(gen => {      
        if (!allGenres.includes(gen.trim())) {
          allGenres.push(gen.trim())
        }
      }) : ''
    } else {
      movie.Genre.split(',').forEach(gen => {      
        if (!allGenres.includes(gen.trim())) {
          allGenres.push(gen.trim())
        }
      })
    }
    
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
      categorySelectors.forEach(selectorButton => {
        selectorButton.classList.remove('active')
      })
      const categoryName = selectorButton.querySelector('p').textContent;
      selectorButton.classList.add('active')
      // moviesSection.querySelector('h3').textContent = categoryName;
      byBookmarks === true ? showMovies(data, categoryName, true) : showMovies(data, categoryName, false)
    });
  });

}

function showParticularMovie(moviesData, id) {
  showMovieBox.innerHTML = ``;

  document.body.scrollTo(0, 0)

  const movie = moviesData.find((movie) => movie.id == id);

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
    <img src="${movie.Poster}" alt="">
    </div>
    <div class="show-movie-bottom-container">
    <div class="movie-rating-wrapper">
      <div class="imdb-rating">
        <p>IMDB ${movie.imdbRating}</p>
      </div>
      <div class="movie-review">
        <div>
          <span class="material-symbols-outlined">star</span>
          <p>${movie.Ratings[1].Value ? movie.Ratings[1].Value : movie.Ratings[0].Value}</p>
        </div>
        <p>
         ${movie.Ratings[1].Source ? movie.Ratings[1].Source : movie.Ratings[0].Source}
        </p>
      </div>
    </div>
    <div class="movie-name-wrapper">
      <h2>${movie.Title}</h2>
    </div>
    <ul class="movie-categories-wrapper">
      <li>Action</li>
      <li>Action</li>
      <li>Action</li>
    </ul>
    <div class="movie-description-wrapper">
      <p>
        ${movie.Plot}
      </p>
      <div class="reservation-wrapper">
        <button>Get Reservation</button>
      </div>
    </div>
    </div>
  `;

  const movieGenres = movie.Genre.split(',');

  const movieCategoryUlElement = document.querySelector('.movie-categories-wrapper');

  movieCategoryUlElement.innerHTML = ``;

  movieGenres.forEach(genre => {
    movieCategoryUlElement.innerHTML += `<li>${genre}</li>`;
  })

  document.querySelector('.close-movie-box').addEventListener('click', () => {
    showMovieBox.classList.toggle('hidden');
    document.body.classList.toggle('noScroll');
  });

  const bookmarkButton = document.querySelector('.bookmark-movie-button');

  movie.bookmarked ? bookmarkButton.classList.add('bookmarked') : ''

  bookmarkButton.addEventListener('click', () => {
    if (bookmarkButton.classList.contains('bookmarked')) {
      bookmarkButton.classList.remove('bookmarked')
      handleBookmarks(id, 'del');
    } else {
      bookmarkButton.classList.add('bookmarked')
      handleBookmarks(id, 'set')
    }
  });
}

function sortByCategories(data, sortCondition) {
  let movies = [];

  data.forEach(movie => {
    let genres = movie.Genre.split(',');
    genres.forEach(genre => {
      if (genre.trim() === sortCondition) {
        movies.push(movie);
      }
    })
  })

  return movies;

}

function showBookmarks() {
  movieSuggestionSection.style.display = 'none';

  moviesContainer.innerHTML = ``;

  moviesSection.querySelector('h3').textContent = `Bookmarks | shuffle`;

  showMovies(datas.movies, 'shuffle', true)

  showGenres(datas.movies, true)

  const categorySelectors = document.querySelectorAll('.category-selector-button');

  moviesSection.querySelector('h3').textContent = `Bookmarks | shuffle`;

  categorySelectors.forEach(li => {
    li.addEventListener('click', () => {
      moviesSection.querySelector('h3').textContent = `Bookmarks | ${li.querySelector('p').textContent}`;
    })
  })

}

function showSuggestion(data) {
  movieSuggestionSection.innerHTML = ``;
  movieSuggestionSection.style.display = 'block';

  const randomIndexs = [];

  let random = Math.floor(Math.random() * (data.length));

  for (var i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * (data.length));
    
    while (randomIndexs.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * (data.length));
    }
    
    randomIndexs.push(randomIndex);
  }

  let image1 = data[randomIndexs[0]].Poster; 
  let image2 = data[randomIndexs[1]].Poster;
  let image3 = data[randomIndexs[2]].Poster;

  movieSuggestionSection.innerHTML = `
  <div class="movie-suggestion-wrapper">
    <img src="${data[randomIndexs[1]].Poster}" alt="" class="movie-suggestion-background">
    <div class="movie-suggestion-top-container">
      <p class="movie-suggestion-xp">${data[randomIndexs[1]].xp ? data[randomIndexs[1]].xp+'XP' : '0XP'}</p>
      <div class="movie-suggestion-top-friends-wrapper">  
        <img src="images/profile-1.jpg" alt="" class="friends-iamge-1">
        <img src="images/profile-2.jpg" alt="" class="friends-iamge-2">
        <img src="images/profile-3.jpg" alt="" class="friends-iamge-3">
        <p>
          +5 Friends are watching
        </p>
      </div>
    </div>
    <div class="movie-suggestion-bottom-container">
      <div class="movie-suggestion-info">
        <h2>${data[randomIndexs[1]].Title}</h2>
        <p>98% Match</p>
        <div>
          <button class="movie-suggestion-info-watch">Watch</button>
          <button class="movie-suggestion-info-add">
            <span class="material-symbols-sharp">add</span>
          </button>
        </div>
      </div>

      <div class="movie-suggestion-posters">
        <img src="${image1}" alt="">
        <img src="${image2}" alt="" class="active">
        <img src="${image3}" alt="">
      </div>
    </div>
  </div>
  `;

  document.querySelector('.movie-suggestion-info-watch').addEventListener('click', () => {
    showParticularMovie(data, data[randomIndexs[1]].id)
    showMovieBox.classList.toggle('hidden');
    document.body.classList.toggle('noScroll');
  });
      
}