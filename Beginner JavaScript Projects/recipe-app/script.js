import meals from './infos.js';

// const API = `https://www.themealdb.com/api/json/v1/1/random.php`;

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

const mainContainer = document.querySelector('.main-container');

const mealsContainer = document.querySelector('.meals-container');

const generateRandomButton = document.querySelector('.generate-random');

generateRandomButton.addEventListener('click', () => {
  showRandomMeal(showParticularMeal);
});

async function showRandomMeal(callback) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const result = await data.json();
  console.log(result);
  callback(result, '', true);
}

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

searchButton.addEventListener('click', () => {
  searchMeal(searchInput.value, showMeals);
});

async function searchMeal(mealName, callback) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  const result = await data.json();
  callback('all', result, true);
}

const categoryButtons = document.querySelectorAll('.category');

categoryButtons.forEach(categoryBtn => {
  categoryBtn.addEventListener('click', () => {
    
    categoryButtons.forEach(catBtn => { 
      catBtn.classList.remove('active');
    });

    showMeals(`${categoryBtn.querySelector('p').innerText}`);
  });
});

showMeals('all');
function showMeals(MealsCategory, data, searchReq) {
  mealsContainer.innerHTML = ``;
  if (!searchReq) {
    meals.forEach(meal => {
      // const aElement = document.createElement('a');
      // aElement.classList.add('.meal');
      if (MealsCategory === 'all') {
        mealsContainer.innerHTML += `
          <a href="#" class="meal" meal-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strCategory}</p>
          </a>
        `;
      } 
      if (MealsCategory === meal.strCategory) {
        mealsContainer.innerHTML += `
          <a href="#" class="meal" meal-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strCategory}</p>
          </a>
        `;
      } 
    });
  }
  if(searchReq) {
    data.meals.forEach(meal => {
      mealsContainer.innerHTML += `
        <a href="#" class="meal" meal-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strCategory}</p>
        </a>
      `;
    })
  }

  if (mealsContainer.innerHTML === '') {
    mealsContainer.innerHTML = `
      <h2 style="text-align:center;">Nothing was found :(</h2>
    `
  }
  getShownMeals();

  categoryButtons.forEach(btn => {
    const pEl = btn.querySelector('p').innerText;
    pEl == MealsCategory ? btn.classList.add('active') : ''
  });
}

function getShownMeals()  {
  document.querySelectorAll('.meal').forEach((meal, index) => {
    meal.addEventListener('click', () => {
      meal.getAttribute('meal-id')
      // showParticularMeal(meals[index]);
      showParticularMeal(meals, meal.getAttribute('meal-id'));
    });
  });
}

function showParticularMeal(meals, id, randomMealReq) {
  if (!randomMealReq) {
    let meal; 
  meals.find(m => {
    m.idMeal == id ? meal = m : ''
  });
  mainContainer.innerHTML = ``;
  mainContainer.classList.toggle('meal-shown');
  mainContainer.innerHTML += `
  <section class="meal-image-section">
    <button class="back-button">
      <span class="material-symbols-sharp">arrow_back</span>
    </button>
    <img src="${meal.strMealThumb}" alt="">
  </section>
  <section class="meal-info-section"> 
    <div class="meal-primary-info">
      <div class="primary-info-wrapper">
        <div>
          <h3>${meal.strMeal}</h3>
          <h5></h5>
        </div>
        <div class="general-info"> 
          <div>
            <span class="material-symbols-sharp">category</span>
            <p>${meal.strCategory}</p>
          </div>
          <div>
            <span class="material-symbols-sharp">menu</span>
            <p>${meal.strDifficulty}</p>
          </div>
          <div>
            <span class="material-symbols-sharp">numbers</span>
            <p>Serves ${meal.strServes}</p>
          </div>
        </div>
      </div>
      <div class="ratings">
        <span class="material-symbols-sharp">star</span>
        <p>${meal.strRating ? meal.strRating : 'No ratings'}</p>
      </div>
    </div>
    <div class="instruction-wrapper">
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
    </div>
  </section>
  `;

  const ingredientsWrapperElement = document.createElement('div');
  ingredientsWrapperElement.classList.add('ingredients-wrapper');
  ingredientsWrapperElement.innerHTML = `<h3>Ingredients</h3>`;

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measures = meal[`strMeasure${i}`];
    ingredient ?
      ingredientsWrapperElement.innerHTML += `
        <div class="ingredinet-and-measures">
          <p>${ingredient}</p>
          <p>${measures}</p>
        </div>
      ` : '';
  }
  document.querySelector('.meal-info-section').append(ingredientsWrapperElement);
  }  
  if (randomMealReq) {
    console.log(meals);
  mainContainer.innerHTML = ``;
  mainContainer.classList.toggle('meal-shown');
  mainContainer.innerHTML += `
  <section class="meal-image-section">
    <button class="back-button">
      <span class="material-symbols-sharp">arrow_back</span>
    </button>
    <img src="${meals.meals[0].strMealThumb}" alt="">
  </section>
  <section class="meal-info-section"> 
    <div class="meal-primary-info">
      <div class="primary-info-wrapper">
        <div>
          <h3>${meals.meals[0].strMeal}</h3>
          <h5></h5>
        </div>
        <div class="general-info"> 
          <div>
            <span class="material-symbols-sharp">category</span>
            <p>${meals.meals[0].strCategory}</p>
          </div>
          <div>
            <span class="material-symbols-sharp">menu</span>
            <p>${meals.meals[0].strArea}</p>
          </div>
          <div>
            <span class="material-symbols-sharp">numbers</span>
            <p>ID: ${meals.meals[0].idMeal}</p>
          </div>
        </div>
      </div>
      <div class="ratings">
        <span class="material-symbols-sharp">star</span>
        <p>${meals.meals[0].strRating ? meals.meals[0].strRating : 'No ratings'}</p>
      </div>
    </div>
    <div class="instruction-wrapper">
      <h3>Instructions</h3>
      <p>${meals.meals[0].strInstructions}</p>
    </div>
  </section>
  `;

  const ingredientsWrapperElement = document.createElement('div');
  ingredientsWrapperElement.classList.add('ingredients-wrapper');
  ingredientsWrapperElement.innerHTML = `<h3>Ingredients</h3>`;

  for (let i = 1; i <= 20; i++) {
    const ingredient = meals.meals[0][`strIngredient${i}`];
    const measures = meals.meals[0][`strMeasure${i}`];
    ingredient ?
      ingredientsWrapperElement.innerHTML += `
        <div class="ingredinet-and-measures">
          <p>${ingredient}</p>
          <p>${measures}</p>
        </div>
      ` : '';
  }
  document.querySelector('.meal-info-section').append(ingredientsWrapperElement);
  }
  trackBackButton();
}

function trackBackButton() {
  document.querySelector('.back-button').addEventListener('click', () => {
    location.reload();
  });
}
