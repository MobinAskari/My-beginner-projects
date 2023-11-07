import { generateContainer } from "./getContainer"
import addHeader from "./header";
import { showHomePage } from "./homepage";
import { urlSetter } from "../router/urlSetter";
import { removeSidebar } from "./sidebar";
import createPoll from "../datas/createPoll";
import { clearButtonLoadingState, setButtonLoadingState } from "../utils/loadingIndicators";

export const showAddPollPage = () => {
  /*
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
  */

  urlSetter('create-poll')

  const container = generateContainer();
  container.classList.add('sidebarLess', 'hasHeader', 'createPoll', 'alignCenter');
  addHeader();
  removeSidebar();
  container.innerHTML = `
    <div class="head-ux-actions-container">
      <button class="back-to-mainpage-btn">
        <span class="material-symbols-rounded">arrow_back</span>
      </button>
    </div>
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

  createPollBtn.onmousedown = async () => await validateInputs();

  const validateInputs = async () => {
    const showAlertElement = (message: string | null) => {
      alertElement.style.setProperty("color", 'var(--rose800)')
      alertElement.textContent = message;
      alertElement.classList.remove("hidden");
    }

    // const hideAlertElement = () => alertElement.classList.add("hidden");

    const checkInput = (input: HTMLInputElement) => {
      // const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const isEmpty = (value: string) => value === '';
      // const onlyIncludesNumbers = (value: string) => [...value].every(char => nums.includes(parseFloat(char)));

      const value = input.value;

      if (isEmpty(value)) {
        showAlertElement('Inputs cannot be empty');
        return false;
      }

      /* 
      if (onlyIncludesNumbers(value)) {
        showAlertElement("Input must not only consist of numbers");
        return false;
      }
      */

      return true;
    }

    const hasDuplicates = <T>(arr: T[]) => {
      const set = new Set(arr);

      return set.size !== arr.length;
    }

    const isOkay = [
      checkInput(pollTitleInput),
      ...categoryInputs().map(input => checkInput(input)),
      ...choiceInputs().map(input => checkInput(input)),
      pollIsAlwaysOpenCheckbox.checked ? true : checkInput(pollClosingDateInput)
    ].every(res => res);

    if (pollTitleInput.value.length < 4) {
      showAlertElement('Poll title must be at least 4 minimum');
      return;
    }

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

    if (!isOkay) return;

    const categories = categoryInputs().map(input => input.value);
    const choices = choiceInputs().map(input => input.value);

    if (
      hasDuplicates<string>(categories)
      ||
      hasDuplicates<string>(choices)
    ) {
      showAlertElement('Category and choice input values must not be duplicates');
      return;
    }

    try {
      setButtonLoadingState(createPollBtn);
      const creationResult = await createPoll(
        pollTitleInput.value,
        categories,
        choices,
        pollIsAlwaysOpenCheckbox.checked ? undefined : pollClosingDateInput.value,
      );
      await new Promise((s) => setTimeout(s, 250));

      if (creationResult) {
        showAlertElement('');
        alertElement.style.setProperty("color", 'green')
        alertElement.textContent = 'Your poll has been successfully created and added!';
        // setTimeout(showAddPollPage, 4000);
      }
      clearButtonLoadingState(createPollBtn, 'Create poll')
    } catch (error) {
      alert(error);
      showAlertElement('The provided input values do not meet with requirments');
      clearButtonLoadingState(createPollBtn, 'Create poll')

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

}