import { createAndAddPollObject } from "../datas/createPoll";
import { generateContainer } from "./generateContainer"
import { addHeader } from "./header";
import { showHomePage } from "./homepage";
import { pullSessionStorage } from "../datas/sessionStorage";
import { User, users, SSKey_CurrentUser } from "../datas/datas";
import { showLoginPage } from "./loginpage";
import { urlSetter } from "../router/urlSetter";

export const showAddPollPage = () => {
  const body = document.body;
  body.innerHTML = ``;

  addHeader();

  const user = (() => {
    let userId: number;

    const pullResult = pullSessionStorage(SSKey_CurrentUser);

    if (pullResult.status === 200) {
      userId = pullResult.data.id;
    }

    return users.find(user => user.id === userId);
  })() as User;

  if (!user) {
    alert("You're not authorized");
    showLoginPage();
    return;
  }

  urlSetter('create-poll')

  const container = generateContainer();
  container.classList.add('addPoll');

  container.innerHTML = `
    <button class="back-to-mainpage-btn">
      <span class="material-symbols-rounded">arrow_back</span>
    </button>
    <h1>Create a poll</h1>
    <div class="add-sections-container">
      <div class="add-section">
        <label for="pollName" class="add-section-input-label">
          <svg width="1.5rem" height="1.5rem">
            <use href="/icons.svg#icon_title"></use>
          </svg>
          <p>Write a title for your poll</p>
        </label>
        <input type="text" id="pollName" class="js-poll-title-input" placeholder="Poll title">
      </div>
      <div class="add-section">
        <label for="first-category-slot-element" class="add-section-input-label">
          <svg width="1.5rem" height="1.5rem">
            <use href="/icons.svg#icon_categories"></use>
          </svg>
          <p>Write at least one category</p>
        </label>
        <div class="add-slots-container">
          <div class="slot-element">
            <input type="text" id="first-category-slot-element" class="js-poll-category-input">
          </div>
          <button class="add-slot-element-btn" data-className-for-slot="js-poll-category-input">
            <svg width="1.5rem" height="1.5rem">
              <use href="/icons.svg#icon_add"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="add-section">
        <label for="first-add-option-element" class="add-section-input-label">
          <svg width="1.5rem" height="1.5rem">
            <use href="/icons.svg#icon_options"></use>
          </svg>
          <p>Write at least two choices</p>
        </label>
        <div class="add-slots-container">
          <div class="slot-element">
            <input type="text" id="first-add-option-element" class="js-poll-choice-input">
          </div>
          <div class="slot-element">
            <input type="text" class="js-poll-choice-input">
          </div>
          <button class="add-slot-element-btn" data-className-for-slot="js-poll-choice-input">
            <svg width="1.5rem" height="1.5rem">
              <use href="/icons.svg#icon_add"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="add-section">
        <label for="always-open-checkbox" class="add-section-input-label">
          <svg width="1.5rem" height="1.5rem">
            <use href="/icons.svg#icon_calendar"></use>
          </svg>
          <p>Select always open or set a closing date for the poll</p>
        </label>
        <div class="add-slots-container">
          <input type="checkbox" id="always-open-checkbox" class="always-open-checkbox" checked="true">
          <label for="always-open-checkbox" class="always-open-checkbox-label"></label>
          <label for="always-open-checkbox" class="text-label">Always open</label>
        </div>
        <input type="datetime-local" class="poll-close-date-input">
      </div>
    </div>
    <p class="alertElement hidden"></p>
    <button class="form__submit-btn js-create-poll-btn">Create poll</button>
  `;

  const backToMainPageBtn = document.querySelector('.back-to-mainpage-btn') as HTMLButtonElement;
  backToMainPageBtn.onmousedown = showHomePage;

  const pollTitleInput = document.querySelector('.js-poll-title-input') as HTMLInputElement;
  const categoryInputs = () => [...document.querySelectorAll(".js-poll-category-input")] as HTMLInputElement[];
  const choiceInputs = () => [...document.querySelectorAll(".js-poll-choice-input")] as HTMLInputElement[];
  const pollIsAlwaysOpenCheckbox = document.querySelector('.always-open-checkbox') as HTMLInputElement;
  const pollClosingDateInput = document.querySelector('.poll-close-date-input') as HTMLInputElement;
  const alertElement = document.querySelector('.alertElement') as HTMLParagraphElement;
  const createPollBtn = document.querySelector('.js-create-poll-btn') as HTMLButtonElement;

  createPollBtn.onmousedown = () => validateInputs();

  const validateInputs = () => {
    const showAlertElement = (message: string | null) => {
      alertElement.style.setProperty("color", 'var(--rose800)')
      alertElement.textContent = message;
      alertElement.classList.remove("hidden");
    }

    // const hideAlertElement = () => alertElement.classList.add("hidden");

    const checkInput = (input: HTMLInputElement) => {
      const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const isEmpty = (value: string) => value === '';
      const onlyIncludesNumbers = (value: string) => [...value].every(char => nums.includes(parseFloat(char)));

      const value = input.value;

      if (isEmpty(value)) {
        showAlertElement('Input cannot be empty');
        return false;
      }

      if (onlyIncludesNumbers(value)) {
        showAlertElement("Input must not only consist of numbers");
        return false;
      }

      return true;
    }

    const isOkay = [
      checkInput(pollTitleInput),
      ...categoryInputs().map(input => checkInput(input)),
      ...choiceInputs().map(input => checkInput(input)),
      pollIsAlwaysOpenCheckbox.checked ? true : checkInput(pollClosingDateInput)
    ].every(res => res);

    if (!pollIsAlwaysOpenCheckbox.checked) {
      const chosenDate = new Date(pollClosingDateInput.value);
      if (chosenDate.toString() === 'Invalid Date') {
        showAlertElement('Invalid date format!');
        return;
      }
      if (new Date().getTime() > chosenDate.getTime()) {
        showAlertElement('Invalid date; the chosen date must not be prior to the current date');
        return;
      }
    }

    if (isOkay) {

      const categories = categoryInputs().map(input => input.value);
      const choices = choiceInputs().map(input => input.value);
      const creationResult = createAndAddPollObject(
        pollTitleInput.value,
        categories,
        user.id,
        choices,
        pollIsAlwaysOpenCheckbox.checked ? null : pollClosingDateInput.value,
      );

      if (creationResult) {
        showAlertElement('');
        alertElement.style.setProperty("color", 'green')
        alertElement.textContent = 'Your poll has been successfully created and added!';
        setTimeout(showAddPollPage, 4000);
      }

    }
  }

  const addAdditionalInputsButtonsHandler = () => {
    const addSlotButtons = [...document.querySelectorAll(".add-slot-element-btn")] as HTMLButtonElement[];

    addSlotButtons.forEach(btn => {

      btn.addEventListener("click", () => {
        btn.
          insertAdjacentHTML("beforebegin",
            `
              <div class="slot-element">
                <button class="delete-slot-element-btn">
                  <svg width="1.5rem" height="1.5rem">
                    <use href="/icons.svg#icon_close"></use>
                  </svg>
                </button>
                <input type="text" class="${btn.dataset?.classnameForSlot}">
              </div>
            `
          );
        deleteAdditionalInputsButtonsHandler();
      });

    });

  }

  const deleteAdditionalInputsButtonsHandler = () => {
    const deleteSlotsButtons = [...document.querySelectorAll('.delete-slot-element-btn')] as HTMLButtonElement[];

    deleteSlotsButtons.forEach(btn => {
      btn.onmousedown = (event) => {
        event.stopPropagation();

        btn.parentNode?.parentNode?.removeChild(btn.parentNode);
      };
    });
  }

  addAdditionalInputsButtonsHandler();
  deleteAdditionalInputsButtonsHandler();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') validateInputs();
  });

  body.append(container);
}