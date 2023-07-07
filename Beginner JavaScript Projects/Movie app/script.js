import datas , { handleBookmarks, handleTickets} from './datas.js';
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

showMovies(datas.movies, 'shuffle');
showGenres(datas.movies);
showSuggestion(datas.movies)

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
    showMovieBox(data, data[randomIndexs[1]].id);
  });
      
}

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
      
      if (moviesContainer.innerHTML === '') {
        moviesContainer.innerHTML = '<h3 style="color: var(--Text-color);">Nothing to show</h3>'
      }
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
      if (moviesContainer.innerHTML === '') {
        moviesContainer.innerHTML = '<h3 style="color: var(--Text-color);">Nothing to show</h3>'
      }
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
      showMovieBox(datas.movies, movieId);
    });
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

function showMovieBox(moviesData, id) {
  const movie = moviesData.find((movie) => movie.id == id);  

  const boilerplateHTML = 
  `
    <section class="movie-details-box__header">
      <div class="movie-details-box__header_buttons">
        <button class="close-movie-box-button">
          <span class="material-symbols-sharp">close</span>
        </button>
        <button style="pointer-events: none;">
          <span class="material-symbols-sharp">Schedule</span>
          <p>${movie.Runtime}</p>
        </button>
        <button class="bookmark-movie-button">
          <span class="material-symbols-sharp">Bookmark</span>
        </button>
      </div>
      <img src="${movie.Poster}" alt="">
    </section>


    <section class="movie-details-box__footer">

    </section>
  `;
  
  const movieBoxHTML = document.createElement('section');
  movieBoxHTML.classList.add('movie-details-box');
  
  movieBoxHTML.innerHTML = boilerplateHTML;

  mainContainer.appendChild(movieBoxHTML);

  document.querySelector('.movie-details-box__footer').innerHTML = 
  `
  <div class="movie-ratings-container">
    <div class="imdb-rating">
      <p>IMDB ${movie.imdbRating}</p>
    </div>
    <div class="movie-review">
      <div>
        <span class="material-symbols-outlined">star</span>
        <p>${movie.Ratings[1] ? movie.Ratings[1].Value : movie.Ratings[0].Value}</p>
      </div>
      <div>
        <p>
        ${movie.Ratings[1] ? movie.Ratings[1].Source : movie.Ratings[0].Source}
        </p>
      </div>
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
  </div>
  <div class="reservation-actions-container">
    <button class="show-reservation-card">
      Get Reservation
    </button>
  </div>
  `;

  closeMovieBox(mainContainer, movieBoxHTML)

  bookmarkFunc(movie)

  const movieCategoriesWrapper = document.querySelector('.movie-categories-wrapper');
  movieCategoriesWrapper.innerHTML = ``;
  movie.Genre.split(',').forEach(genre => {
    movieCategoriesWrapper.innerHTML += `
      <li>${genre}</li>
    `;    
  });

  const showReservationCardButton = document.querySelector('.show-reservation-card');
  showReservationCardButton.addEventListener('click', () => {
    mainContainer.removeChild(movieBoxHTML);
    showMovieReservationDetails(movie, id);
  });
 
  // event.preventDefault();
  document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // document.body.classList.add('noScroll')

}

function showBookmarks() {
  movieSuggestionSection.style.display = 'none';

  moviesContainer.innerHTML = ``;

  moviesSection.querySelector('h3').textContent = `Bookmarks | shuffle`;

  showMovies(datas.movies, 'shuffle', true);

  showGenres(datas.movies, true);

  const categorySelectors = document.querySelectorAll('.category-selector-button');

  moviesSection.querySelector('h3').textContent = `Bookmarks | shuffle`;

  categorySelectors.forEach(li => {
    li.addEventListener('click', () => {
      moviesSection.querySelector('h3').textContent = `Bookmarks | ${li.querySelector('p').textContent}`;
    });
  });

}

function showMovieReservationDetails(movie, id) {
  const movieBoxHTML = document.createElement('section');
  movieBoxHTML.classList.add('movie-details-box');

  const savedMovie = movie;
  const savedId = id;
  
  const boilerplateHTML = 
  `
    <section class="movie-details-box__header">
      <div class="movie-details-box__header_buttons">
        <button class="close-movie-box-button">
          <span class="material-symbols-sharp">close</span>
        </button>
        <button style="pointer-events: none;">
          <span class="material-symbols-sharp">Schedule</span>
          <p>${movie.Runtime}</p>
        </button>
        <button class="bookmark-movie-button">
          <span class="material-symbols-sharp">Bookmark</span>
        </button>
      </div>
      <img src="${movie.Poster}" alt="">
    </section>


    <section class="movie-details-box__footer">

    </section>
  `;

  movieBoxHTML.innerHTML = boilerplateHTML;

  mainContainer.appendChild(movieBoxHTML);

  closeMovieBox(mainContainer, movieBoxHTML);
  bookmarkFunc(movie);
  
  const movieBoxFooter = document.querySelector('.movie-details-box__footer');

  movieBoxFooter.innerHTML = 
  `
    <div class="reservation-seats-info-container">
      <div class="reservation-seats-container">
        
      </div>
      <div class="seats-status-description-container">
        <div>
          <span class="seats-indicator available"></span>
          <p>Available</p>
        </div>
        <div>
          <span class="seats-indicator reserved"></span>
          <p>Reserved</p>
        </div>
        <div>
          <span class="seats-indicator selected"></span>
          <p>Selected</p>
        </div>
      </div>
    </div>
  `;

  let specificSchedule = datas.cinemaSchedules.find(schedules => schedules.id === id);

  const Response = makeReservationSeatsContainer(specificSchedule);
  if (!Response) {
    return;
  } else {
    movieBoxFooter.innerHTML += 
    `
    <div class="reservation-dates-container">
      <h4>Select date:</h4>
      <div class="reservation-dates-wrapper">
      </div>
    </div>
    <div class="reservation-times-container">
      <h4>Select time:</h4>
      <div class="reservation-times-wrapper">
      </div>
    </div>

    <div class="reservation-actions-container">
      <div class="total-price-wrapper">
        <h4>Totalprice:</h4>
        <p id="ticket-price-element">$</p>
      </div>
      <div class="buy-wrapper">
        <button class="buy-ticket-button">Buy now</button>
      </div>
    </div>
    `;
  }
  
  const reservationDatesWrapper = document.querySelector('.reservation-dates-wrapper');
  specificSchedule.dates.forEach(date => {
    reservationDatesWrapper.innerHTML += 
    `
      <button class="reservation-date">${date}</button>
    `;
  });

  const reservationTimesWrapper = document.querySelector('.reservation-times-wrapper');
  specificSchedule.times.forEach(time => {
    reservationTimesWrapper.innerHTML += 
    `
      <button class="reservation-time">${time}</button>
    `;
  });

  const availableSeats = document.querySelectorAll('.available');

  availableSeats.forEach(availableSeat => {
    availableSeat.addEventListener('click', () => {
      availableSeat.classList.toggle('selected');
      availableSeat.classList.contains('selected') ? calcAndShowPrice(true) : calcAndShowPrice(false)
    });
  });

  const ticketPriceElement = document.getElementById('ticket-price-element');
  let price = 0;

  function calcAndShowPrice (condition) {
    condition ? price += specificSchedule.pricePerSeat : price -= specificSchedule.pricePerSeat;
    ticketPriceElement.textContent = `$ ${price / 100}`;
  }

  classToggleHelper('reservation-date', 'selected');
  classToggleHelper('reservation-time', 'selected');

  const buyTicketButton = document.querySelector('.buy-ticket-button');
  buyTicketButton.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const positions = [];
    const selectedDate = document.querySelector('.reservation-date.selected');
    const selectedTime = document.querySelector('.reservation-time.selected');

    if (selectedDate && selectedTime && selectedSeats.length > 0) {
      selectedSeats.forEach(selectedSeat => {
        const seatPosition = selectedSeat.dataset.seatPosition;
        const seatRowPosition = selectedSeat.dataset.rowPosition;
        const seatColPosition = selectedSeat.dataset.colPosition;
        positions.push({seatPosition, seatRowPosition, seatColPosition});
      });
      handleTickets(id, positions, selectedDate.textContent, selectedTime.textContent, price);
      alert('Tickets has been reserved');
      mainContainer.removeChild(movieBoxHTML);
      showMovieReservationDetails(savedMovie, savedId);
    } else {
      alert('Every option should be choosed at least once!');
    }

  });
  
}

function getRowsAndCols(specificSchedule, seatPosition) {
  const rowsHTML = [];

  if (!specificSchedule) {
    return 0;
  }

  for (let i = 0; i < specificSchedule[`${seatPosition+'Seats'}`].length; i++) {
    const rows = specificSchedule[`${seatPosition+'Seats'}`][i];
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');
    
    for (let j = 0; j < rows.length; j++) {
      rowEl.innerHTML += 
      `
      <button 
      class="seat ${rows[j].status}" 
      data-seat-position="${seatPosition}" 
      data-row-position="${i}" 
      data-col-position="${j}">
      </button>
      `;
    }

    rowsHTML.push(rowEl)
  }

  let seatsContainerElement = document.createElement('div');
  seatsContainerElement.classList.add(`${seatPosition}-seats-container`);

  rowsHTML.forEach(row => {
    seatsContainerElement.appendChild(row)
  });
  
  return seatsContainerElement;
}

const makeReservationSeatsContainer = (specificSchedule) => {
  const reservationSeatsContainerElement = document.querySelector('.reservation-seats-container');

  if (!specificSchedule) {
    reservationSeatsContainerElement.textContent = 'No data has been found';
    return false;
  }

  const rowsAndColsContainerLeft = getRowsAndCols(specificSchedule, 'left');
  const rowsAndColsContainerRight = getRowsAndCols(specificSchedule, 'right');
  reservationSeatsContainerElement.append(rowsAndColsContainerLeft);
  reservationSeatsContainerElement.append(rowsAndColsContainerRight);
  return true;
  
}


const bookmarkFunc = (movie) => {
  const bookmarkMovieButton = document.querySelector('.bookmark-movie-button');
  movie.bookmarked ? bookmarkMovieButton.classList.add('bookmarked') : ''

  bookmarkMovieButton.addEventListener('click', () => {
    if (bookmarkMovieButton.classList.contains('bookmarked')) {
      handleBookmarks(movie.id, 'del');
      bookmarkMovieButton.classList.remove('bookmarked');
    } else {
      handleBookmarks(movie.id, 'set');
      bookmarkMovieButton.classList.add('bookmarked');      
    }
  });
}
const closeMovieBox = (mainContainer, movieBoxHTML) => {
  document.querySelector('.close-movie-box-button').addEventListener('click', () => {
    mainContainer.removeChild(movieBoxHTML);
    // document.body.classList.remove('noScroll')
  });
}

const classToggleHelper = (elementsClassName, className) => {
  const elements = document.querySelectorAll(`.${elementsClassName}`);

  elements.forEach(element => {
    element.addEventListener('click', () => {
      
      elements.forEach(element => { element.classList.remove(`${className}`)});

      element.classList.toggle(`${className}`);
    });
  });

}