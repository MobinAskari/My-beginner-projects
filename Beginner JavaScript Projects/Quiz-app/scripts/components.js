import { getQuizzes, getQuiz, addQuizToOpened } from "./retrieveData.js";
import { showHomepage } from "./script.js";

export const mainContainer =  document.querySelector('.main-container');
export const headerContainer =  document.querySelector('.header-container');

export const addSidebar = (sidebarName, ...items) => {
  const sidebar = document.createElement('aside');
  sidebar.classList.add(sidebarName);
  const ulElement = document.createElement('ul');

  sidebar.append(ulElement);

  const icons = {
    Home: 'Home',
    Quizzes: 'Quiz',
    Leaderboard: 'Leaderboard',
    Account: 'Person',
  }

  items.forEach(item => { 
    const liElement = document.createElement('li');
    liElement.innerHTML = 
    `
      <li>
        <a href="#">
          <span class="material-symbols-sharp">${icons[item] ?? 'question_mark'}</span>
          <p>${item}</p>
        </a>
      </li>
    `;
    ulElement.append(liElement);
  });

  headerContainer.innerHTML += 
  `
    <button class="header-menu-button">
      <span class="material-symbols-sharp">menu</span>
    </button>
  `;

  // if (window.innerWidth > 768) {
  //   document.body.style.setProperty('--sidebar-width', '12rem');
  // } else if (window.innerWidth <= 768 && window.innerWidth > 500) {
  //   document.body.style.setProperty('--sidebar-width', '3.25rem');
  // } else if (window.innerWidth <= 500) {
  //   document.body.style.setProperty('--sidebar-width', '0');
  // }
  

  mainContainer.append(sidebar);

}

export const addHeaderItems = (...items) => {
  const header = document.querySelector('.header-container');

  const headerFunctionalities = {
    search: () => {
      header.innerHTML += `
        <div class="search-wrapper">
          <button class="search-quiz-button">
            <span class="material-symbols-sharp">search</span>
          </button>
          <input type="text" placeholder="Search quiz id: #4">
        </div>
      `;
    },
    accountInfo: () => {
      header.innerHTML += `
        <div class="account-wrapper">
          <div class="account-profile-image-wrapper">
            <img src="images/profile-pictures/profile-2.jpg" alt="">
          </div>
          <p>Mobin A.</p>
        </div>
      `;
    },
  };

  items.forEach(item => headerFunctionalities[item] ? headerFunctionalities[item]() : '');
}

export const addMainContainerSections = (...items) => {
  const sections = {
    openedQuizzes: () => {
      mainContainer.innerHTML += 
      `
        <section class="opened-quizzes-section">
          <h2>Opened Quizzes</h2>
          <div class="quizzes-container opened-quizzes">
      
          </div>
        </section>
      `;
      showQuizzes('opened');
    },
    newQuizzes: () => {
      mainContainer.innerHTML += 
      `
        <section class="new-quizzes-section">
          <h2>New Quizzes</h2>
          <div class="quizzes-container new-quizzes">
      
          </div>
        </section>
      `;
      showQuizzes('new');
    },
  }

  items.forEach(item => sections[`${item}Quizzes`] ? sections[`${item}Quizzes`]() : '');
}

const showQuizzes = (sortBy) => {
  const quizzes = getQuizzes(sortBy);

  quizzes.forEach(quiz => {
    document.querySelector(`.${sortBy}-quizzes`).innerHTML += 
    `
      <div class="quiz" data-quiz-id="${quiz.id}">
        <div class="quiz-image ${quiz.imageColor}">
          <span class="material-symbols-sharp">${quiz.image}</span>
        </div>
        <div class="quiz-general-info">
          <h3>${quiz.title}</h3>
          <div class="question-count-wrapper">
            <span class="material-symbols-sharp">confirmation_number</span>
            <p>${quiz.quizContent.length} Questions</p>
          </div>
        </div>
      </div>
    `;
  });

  const shownQuizzes = document.querySelectorAll('.quiz');

  shownQuizzes.forEach(shownQuiz => {
    shownQuiz.addEventListener('click', () => {
      const id = parseFloat(shownQuiz.dataset.quizId);
      startQuiz(id)
    });
  });

}

function showBox() {
  headerContainer.innerHTML = ``;
  mainContainer.innerHTML = ``;

  document.body.style.setProperty('--sidebar-width', '0')
  addHeaderItems('search', 'accountInfo');
}

function startQuiz(id) {
  showBox();

  const quiz = getQuiz(id);
  addQuizToOpened(id);

  let currentIndex = 0;
  
  let answers = [];
  quiz.quizContent.forEach((con, index) => {
    answers.push({index, answer: ''});
  });

  mainContainer.innerHTML = `
  <section class="quiz-top-section">
      <button class="back-button"><span class="material-symbols-sharp">arrow_back</span></button>
      <div class="progress-indicator-container">
        
      </div>
      <div class="timer-button-wrapper">
        <button><span class="material-symbols-sharp">timer</span></button>
        <p class="timer-tooltip"><span class="remaining-time">5:32m</span> Remaining</p>
      </div>
    </section>
    <section class="quiz-section">
         
    </section>
    <button class="submit-quiz-btn">Next</button> 
  `;

  const quizSection = document.querySelector('.quiz-section');

  renderQuiz(currentIndex)
  function renderQuiz(currentIndex) {
    quizSection.innerHTML = ``;

    quizSection.innerHTML = 
    `
      <h4 class="questions-counter">${currentIndex + 1}/${quiz.quizContent.length} Questions</h4>
      <h3 class="current-question">${quiz.quizContent[currentIndex].question}</h3>
      <div class="answers-container">
        <div class="answer" data-option="a">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${quiz.quizContent[currentIndex].a}</div>
        </div>
        <div class="answer" data-option="b">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${quiz.quizContent[currentIndex].b}</div>
        </div>
        <div class="answer" data-option="c">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${quiz.quizContent[currentIndex].c}</div>
        </div>
        <div class="answer" data-option="d">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${quiz.quizContent[currentIndex].d}</div>
        </div>
      </div>

    `;

    const questionOptions = document.querySelectorAll('.answer');
    questionOptions.forEach((option, i) => {
      
      const lastChoosed = answers.find(answer => answer.answer === option.dataset.option);
      if (lastChoosed && lastChoosed.index === currentIndex) {
        option.classList.add('choosed')
      }

      option.addEventListener('click', () => {

        if (option.classList.contains('choosed')) {
          option.classList.remove('choosed')
          answers[currentIndex].answer = '';
          allProgressWrappers[currentIndex].classList.remove('choosedOption');
        } else {

          questionOptions.forEach(option => option.classList.remove('choosed'));
          
          option.classList.add('choosed')
          answers[currentIndex].answer = option.dataset.option;
          allProgressWrappers[currentIndex].classList.add('choosedOption')
        }
      
      });
    });
  }
  
  
  const progressIndicatorContainer = document.querySelector('.progress-indicator-container')
  
  quiz.quizContent.forEach((content, i) => {
    progressIndicatorContainer.innerHTML += `
    <div class="progress-wrapper" data-quiz-index="${i}"></div>
    `;
  });

  const allProgressWrappers = document.querySelectorAll('.progress-wrapper');

  allProgressWrappers.forEach(progressWrapper => {
    progressWrapper.addEventListener('click', () => {
      const quizIndex = parseFloat(progressWrapper.dataset.quizIndex);
      renderQuiz(quizIndex)
    });
  });

  const backButton = document.querySelector('.back-button');

  backButton.addEventListener('click', () => {
    if(currentIndex > 0) {
      currentIndex -= 1;
      renderQuiz(currentIndex);
    } else if (currentIndex - 1 === -1) {
      showHomepage()
    }
  });

  const submitQuizBtn = document.querySelector('.submit-quiz-btn');

  submitQuizBtn.addEventListener('click', () => {
    
    if(currentIndex < quiz.quizContent.length - 1) {
      currentIndex += 1;
      renderQuiz(currentIndex);
    } else {
      showFinal(quiz, answers)
    }

  });

}

function showFinal(quiz, answers) {
  showBox();
  let correctAnswers = 0;

  mainContainer.innerHTML = `
    <section class="quiz-results">
      <div class="all-answers-container">

      </div>
    </section>
  `;

  const allQuestionsContainer = document.querySelector('.all-answers-container');

  allQuestionsContainer.innerHTML = ``;

  quiz.quizContent.forEach((content, i) => {

    content.correct === answers[i].answer ? correctAnswers += 1 : '';

    allQuestionsContainer.innerHTML += 
    `
      <h3 class="current-question">${content.question}</h3>
      <div class="answers-container">
        <div class="answer ${answers[i].answer === 'a' ? answers[i].answer === content.correct ? 'correct' : 'wrong' : ''}" data-option="a">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${content.a}</div>
        </div>
        <div class="answer ${answers[i].answer === 'b' ? answers[i].answer === content.correct ? 'correct' : 'wrong' : ''}" data-option="b">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${content.b}</div>
        </div>
        <div class="answer ${answers[i].answer === 'c' ? answers[i].answer === content.correct ? 'correct' : 'wrong' : ''}" data-option="c">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${content.c}</div>
        </div>
        <div class="answer ${answers[i].answer === 'd' ? answers[i].answer === content.correct ? 'correct' : 'wrong' : ''}" data-option="d">
          <div class="answer-radio-wrapper">
            <span class="material-symbols-sharp">circle</span>
          </div>
          <div class="answer-text">${content.d}</div>
        </div>
      </div>
    `;

  });

  const resultsTitleElement = document.createElement('h3');
  resultsTitleElement.innerHTML = 
  `
  You answered correctly at ${correctAnswers} out of ${quiz.quizContent.length} questions
  `;
  correctAnswers > 0 ? resultsTitleElement.classList.add('correct') : resultsTitleElement.classList.add('wrong')

  document.querySelector('.quiz-results').prepend(resultsTitleElement)
}