import { generateContainer } from "./getContainer.ts";
import { getBackground } from "./getBackground.ts";
import { showLoginPage } from "./loginpage.ts";
import signupUser from "../datas/signup.ts";
import { urlSetter } from "../router/urlSetter.ts";
import handleAlertElement from "../utils/handleAlertElement.ts";
import loginUser from "../datas/login.ts";
import handleAppState from "../lib/state.ts";
import { clearButtonLoadingState, setButtonLoadingState } from "../utils/loadingIndicators.ts";

export const showSignupPage = (): void => {
  document.body.innerHTML = ``;
  const container = generateContainer();
  container.classList.add('horizontal');

  urlSetter('signup');

  container.innerHTML = `
    <section class="entering__left">
    <h1>Sign up</h1>

    <form action="" class="form entering">
      <div class="form__part">
        <div class="form__part-inputs">
          <label for="usernameInput">
            <span class="material-symbols-rounded">person</span>
          </label>
          <input type="text" id="usernameInput" placeholder="Username">
        </div>
        <p class="alertElement hidden">Invalid username or email</p>
      </div>
      <div class="form__part">
        <div class="form__part-inputs">
          <label for="emailInput">
            <span class="material-symbols-rounded">mail</span>
          </label>
          <input type="text" id="emailInput" placeholder="Email">
        </div>
        <p class="alertElement hidden">Invalid username or email</p>
      </div>
      <div class="form__part">
        <div class="form__part-inputs">
          <label for="genderSelect">
            <span class="material-symbols-rounded">man</span>
          </label>
          <select id="genderSelect">
            <option value="null">Not specified</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div class="form__part">
        <div class="form__part-inputs">
          <label for="ageInput">
            <span class="material-symbols-rounded">date_range</span>
          </label>
          <input type="date" id="ageInput">
        </div>
        <p class="alertElement hidden">Invalid username or email</p>
      </div>
      <div class="form__part">
        <div class="form__part-inputs">
          <label for="passwordInput">
            <span class="material-symbols-rounded">lock</span>
          </label>
          <input type="password" id="passwordInput" placeholder="Password">
        </div>
        <p class="alertElement hidden">Invalid username or email</p>
      </div>
      <div class="form__part">
        <div class="form__part-inputs">
          <label for="reenterPasswordInput">
            <span class="material-symbols-rounded">lock_reset</span>
          </label>
          <input type="password" id="reenterPasswordInput" placeholder="Reenter your password">
        </div>
        <p class="alertElement hidden">Invalid username or email</p>
      </div>
      
      <p>Already registered? <a href="#" class="link-rose" data-show-login>Log in</a></p>

      <p>By signing up, you are agreeing to our <a href="#" class="link-rose">Privacy</a> & <a href="#" class="link-rose">Policy</a> statements</p>

      <p class="resultMessage hidden">Invalid username or email</p>

      <button type="submit" class="form__submit-btn">Sign up</button>
    </form>
    </section>
    <section class="entering__right">
      <div class="entering__right-img">
        <img src="/illustrations/undraw_sign_up_n6im.svg" alt="">
      </div>        
    </section>
  `;

  handleAnchorClicks();
  handleForm();

  container.append(getBackground());
}

const handleForm = () => {
  const form = document.querySelector('form') as HTMLFormElement;
  const allInputs = [...document.querySelectorAll('input')];
  const genderSelect = document.getElementById('genderSelect') as HTMLSelectElement;
  const allAlertElements = [...document.querySelectorAll('.alertElement')] as HTMLParagraphElement[];
  const resultMessageElement = document.querySelector('.resultMessage') as HTMLParagraphElement;
  const submitBtn = document.querySelector('.form__submit-btn') as HTMLButtonElement;

  form.addEventListener("submit", async (e) => {
    setButtonLoadingState(submitBtn, 'Loading...');
    e.preventDefault();
    const username = allInputs[0].value;
    const email = allInputs[1].value;
    const gender = genderSelect.value;
    const birthDate = allInputs[2].value;
    const password = allInputs[3].value;
    const passwordReenter = allInputs[4].value;

    const inputsValsCheck = [
      username,
      email,
      birthDate,
      password,
      passwordReenter,
    ].map((val, i) => {
      if ([...val].every(char => char === ' ' || char === '')) {
        handleAlertElement(allAlertElements[i], 'Input cannot be empty', 'error')
        return false;
      }
      handleAlertElement(allAlertElements[i], '', 'hide');
      return true;
    });

    if (!inputsValsCheck.every(val => val)) {
      clearButtonLoadingState(submitBtn, 'Sign up');
      return;
    }

    setButtonLoadingState(submitBtn, 'Signing you up...');
    try {
      const result = await signupUser(
        username,
        email,
        gender,
        birthDate,
        password,
        passwordReenter);

      if (!result || !result.status) {
        clearButtonLoadingState(submitBtn, 'Sign up');
        handleAlertElement(resultMessageElement, result.message, 'error');
        return;
      }

      handleAlertElement(resultMessageElement, result.message, 'success')
      try {
        setButtonLoadingState(submitBtn, 'Logging you in...');
        const login = await loginUser(username, password, true);

        if (!login) {
          clearButtonLoadingState(submitBtn, 'Sign up')
          handleAlertElement(resultMessageElement, 'There was a problem with logging you in, please try to log in manually', 'error');
          return
        }

        urlSetter("home");
        handleAppState();
      } catch (error) {
        handleAlertElement(resultMessageElement, 'There was a problem with logging you in, please try to log in manually', 'error')
      }
    } catch (error) {
      clearButtonLoadingState(submitBtn, 'Sign up');

      handleAlertElement(resultMessageElement, 'There was a problem with connecting to the database, please check your internet connection and try again', 'error');
    }



  });
}

const handleAnchorClicks = () => {

  const showLoginAnchor = document.querySelector('[data-show-login]');

  showLoginAnchor?.addEventListener('click', (event) => {
    event.preventDefault();
    showLoginPage();
  });

}