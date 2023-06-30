import infos, { generateInfo, deleteRecord, setComplete } from "./infos.js";

const jsDarkModeButton = document.querySelector('.js-dark-mode-button');
jsDarkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('lightmode')
});

const jsOpenMenuButton = document.querySelector('.js-open-menu-button');
//const jsCloseMenuButton = document.querySelector('.js-close-menu-button');
const menuSection = document.querySelector('.menu-section');


const jsAllSortButton = document.querySelector('.js-all-sort-button');
const jsCategoriesSortButton = document.querySelector('.js-categories-sort-button');
const jsCompletedSortButton = document.querySelector('.js-completed-sort-button');
const jsnotCompletedSortButton = document.querySelector('.js-notCompleted-sort-button');

const menuButtons = [jsAllSortButton, jsCategoriesSortButton, jsCompletedSortButton, jsnotCompletedSortButton];
const removeActiveClass = () => {
  menuButtons.forEach(btn => {
    btn.classList.remove('active');
  });
}
jsOpenMenuButton.addEventListener('click', () => {
  menuSection.classList.toggle('shown')
});
/*jsCloseMenuButton.addEventListener('click', () => {
  menuSection.classList.toggle('shown')
});*/

let currentSortingCondition = 'all';

jsAllSortButton.addEventListener('click', () => {
  showTodos('all')
  currentSortingCondition = 'all';
  removeActiveClass()
  jsAllSortButton.classList.add('active')
});
jsCategoriesSortButton.addEventListener('click', () => {
  showTodos('byCategories')
  currentSortingCondition = 'byCategories';
  removeActiveClass()
  jsCategoriesSortButton.classList.add('active')
});
jsCompletedSortButton.addEventListener('click', () => {
  showTodos('byCompleted');
  currentSortingCondition = 'byCompleted';
  removeActiveClass()
  jsCompletedSortButton.classList.add('active')
});
jsnotCompletedSortButton.addEventListener('click', () => {
  showTodos('bynotCompleted');
  currentSortingCondition = 'bynotCompleted';
  removeActiveClass()
  jsnotCompletedSortButton.classList.add('active')
});

const jsTodoSection = document.querySelector('.js-todo-section');
const jsAddTodoSection = document.querySelector('.js-add-todo-section');
const todoTextInput = document.getElementById('todo-text');
const todoCategoryInput = document.getElementById('todo-category');
const todoDateInput = document.getElementById('todo-date');
const addTodoButton = document.getElementById('add-todo');

const jsOpenAddMenuButton = document.querySelector('.js-open-add-menu-button');
jsOpenAddMenuButton.addEventListener('click', () => {
  jsAddTodoSection.classList.toggle('shown');
  jsTodoSection.classList.toggle('shown');
});

addTodoButton.addEventListener('click', () => {
  todoTextInput.value && todoDateInput.value ? createTodo(todoTextInput.value, todoCategoryInput.value, todoDateInput.value) : alert('a todo and a date is required');
});

const jsLastCompletedTodoElement = document.querySelector('.js-last-completed-todo-element');
const jsLastCompletedTodoTimeElapsedElement = document.querySelector('.js-last-completed-todo-time-elapsed-element')
// I acknowledge that they're not good names but i couldn't think of anything else :(

showTodos(currentSortingCondition)

function createTodo(title, category, date) {
  const lastTodoId = infos.todos[infos.todos.length - 1] ? infos.todos[infos.todos.length - 1].id : 0;

  category ? '' : category = 'default';

  generateInfo({
    id: lastTodoId + 1,
    title,
    completed: false,
    category,
    date,
  });

  todoTextInput.value  = ''
  todoDateInput.value = ''
  todoCategoryInput.value = ''
  
  showTodos(currentSortingCondition);
}

function showTodos(sortCondition) {
  jsTodoSection.innerHTML = ``;

  const AddTodoHTML = (parent, todo) => {
    const todoTemplate =
    `
      <div class="todo-wrapper ${todo.completed ? 'completed' : ''}" data-todo-id="${todo.id}">
        <div class="todo-action-buttons-wrapper">
          <button class="js-complete-button complete-button" data-todo-id="${todo.id}">
            <span class="material-symbols-sharp">
              check
            </span>
          </button>
          <button class="js-delete-button delete-button" data-todo-id="${todo.id}">
            <span class="material-symbols-sharp">
              delete_forever
            </span>
          </button>
          <button class="js-category-button category-button" data-todo-id="${todo.id}">
            <span class="material-symbols-sharp spacing">
              category
            </span>
          </button>
        </div>

        <div class="todo-text-wrapper">
          <p>${todo.title}</p>  
        </div> 

        <div class="todo-date-wrapper">
            <span>Y ${todo.date.slice(2, 4)}</span>

            <span>M ${todo.date.slice(5, 7)}</span>

            <span>D ${todo.date.slice(8, 10)}</span>
        </div>
      </div>
    `;
    parent.innerHTML += 
    todoTemplate;
  }

  if (sortCondition === 'byCategories') {
    const todosByCategory = {};

    infos.todos.forEach(todo => {
      const {
        id,
        title,
        completed,
        category,
        date,
      } = todo;

      if (todosByCategory.hasOwnProperty(category)) {
        todosByCategory[category].push({id,
          title,
          completed,
          category,
          date,});
      } else {
        todosByCategory[category] = [{id,
          title,
          completed,
          category,
          date,}];
      }
    });

    for (const category in todosByCategory) {
      
      const mainCategoryTemplate = 
      `
        <div class="sub-category">
          <h3>Category: ${category}</h3>
          <div class="sub-category-todos-container" data-category="${category}">

          </div>
        </div>
      `;
      jsTodoSection.innerHTML += mainCategoryTemplate;

      todosByCategory[category].forEach(todo => {

        const AllSubCategoryTodosContainer = document.querySelectorAll('.sub-category-todos-container');

        AllSubCategoryTodosContainer.forEach(subDiv =>{
          const subDivCategory = subDiv.getAttribute('data-category');
          if (subDivCategory == todo.category) {
           AddTodoHTML(subDiv, todo)
          }
        })

      })

    }
  } 
  else {
    if (infos.todos[0]) {
      infos.todos.forEach(todo => {

        sortCondition === 'all' ? AddTodoHTML(jsTodoSection, todo) : ''
      
        sortCondition === 'byCompleted' && todo.completed ? AddTodoHTML(jsTodoSection, todo) : ''
      
        sortCondition === 'bynotCompleted' && !todo.completed ? AddTodoHTML(jsTodoSection, todo) : ''
      
      })
    }
  }

  if (jsTodoSection.innerHTML == ``) {
    jsTodoSection.innerHTML = `<h2 style="color: var(--Text-color);">Nothing to show!</h2>`
  }
  trackButtons();
}
function calcTimeElapsed(todoDate) {
  let lastTodoDate = todoDate;
  return lastTodoDate;
  // i can't think of a solution for this right now
}
function trackButtons() {
  const jsCompleteButtons = document.querySelectorAll('.js-complete-button');
  const jsDeleteButtons = document.querySelectorAll('.js-delete-button');
  const jsCategoryButtons = document.querySelectorAll('.js-category-button');

  jsCompleteButtons.forEach(completeButton => {
    completeButton.addEventListener('click', () => {
      const id = completeButton.getAttribute('data-todo-id')
      setComplete(id) 
      
      const i = infos.todos.findIndex(todo => todo.id == id);
      infos.todos[i].completed ? jsLastCompletedTodoElement.textContent = infos.todos[i].title : 'The last completed todo appears here';

      infos.todos[i].completed ? jsLastCompletedTodoTimeElapsedElement.textContent = calcTimeElapsed(infos.todos[i].date) : jsLastCompletedTodoTimeElapsedElement.textContent = 'Time Elapsed' 
      showTodos(currentSortingCondition)
    });
  });

  jsDeleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
      const id = deleteButton.getAttribute('data-todo-id')
      deleteRecord(id) 
      showTodos(currentSortingCondition)      
    });
  });
}