const headerProductElement = document.querySelectorAll('.js-header-product');
const productDropdownMenu = document.querySelectorAll('.dropdown-menu');

const planTogglerElement = document.querySelector('.js-toggle-button');
const currentPlanElement = document.querySelectorAll('.plans-period-duration');

const AvailablePlansContainer = document.querySelector('.available-plans-container');

const frequentQuestionsContainer = document.querySelector('.frequent-questions-container');

let currentPlan = "MONTH";

planTogglerElement.addEventListener('click', () => {

  planTogglerElement.querySelector('span:nth-child(1)').classList.toggle('active');
  planTogglerElement.querySelector('span:nth-child(2)').classList.toggle('active');
  
  if (planTogglerElement.querySelector('span:nth-child(2)').classList.contains('active')) {
    currentPlan = "YEAR";
    console.log(currentPlan);
  }

  if (planTogglerElement.querySelector('span:nth-child(1)').classList.contains('active')) {
    currentPlan = "MONTH";
    console.log(currentPlan);
  }

  loadPlans()

  currentPlanElement.forEach(value => {
    value.classList.toggle('none-active');
  })

});

loadPlans();

function loadPlans() {
  AvailablePlansContainer.innerHTML = '';
  
  availablePlans.forEach((value, index) => {
    const planElement = document.createElement('div');
    planElement.classList.add('available-plan');
    
    const ulElement = document.createElement('ul');
    
    value.features.forEach(value => {
      const liElement = document.createElement('li');
      
      const features = [];

      liElement.innerHTML = `
        <span class="material-symbols-sharp">check</span>
        <li>${value}</li>
      `;
      ulElement.appendChild(liElement);
    });

    if (value.duration === currentPlan) {
    
    planElement.innerHTML = `
      <p>${value.name}</p>
      <div class="plan-pricing-container">
        <div class="dollor">
          <span>$</span>
        </div>
        <p>
          ${value.price}
          <span>/${value.duration}</span>
        </p>
      </div>
    `;

    if (value.mostPopular) {
      planElement.innerHTML += `
      <div class="popular-plan">
      MOST POPUPLAR 
      </div>
      `;
    }

    const buttonElement = document.createElement('button');
    buttonElement.innerText = `START FREE`;

    planElement.appendChild(ulElement);
    planElement.appendChild(buttonElement)

    AvailablePlansContainer.appendChild(planElement);
  } 

  });

  
}


headerProductElement.forEach((value, index) => {
  console.log(value, index);  

  value.addEventListener('click', () => {

    productDropdownMenu[index].classList.toggle('shown');

  });

});



showFrequentQuestions();

function showFrequentQuestions () {
  frequentQuestionsContainer.innerText = '';

  frequentQuestions.forEach(question => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question-element');

    const questionTitle = document.createElement('div');
    questionTitle.classList.add('question-title');
    const questionAnswer = document.createElement('div');
    questionAnswer.classList.add('question-answer');
    questionAnswer.classList.add('hidden');

    questionTitle.innerHTML = `
    <div>
      <p>${question.title}</p>
    </div>
    <div>
      <span class="material-symbols-sharp expand-question">expand_more</span>
    </div>
    `;
    questionAnswer.innerText = question.answer;

    questionElement.appendChild(questionTitle);
    questionElement.appendChild(questionAnswer);

    frequentQuestionsContainer.appendChild(questionElement);
  });

 
}

const questionElement = document.querySelectorAll('.question-element');
const questionAnswer = document.querySelectorAll('.question-answer');

questionElement.forEach((value, index) => {
  value.addEventListener('click', () => {
    

    let expandElement = document.querySelectorAll('.expand-question')[index];
    
    if (expandElement.innerText === 'expand_more') {
      expandElement.innerText = 'expand_less';
    } else {
      expandElement.innerText = 'expand_more';
    }

    questionAnswer[index].classList.toggle('hidden');
  });
});