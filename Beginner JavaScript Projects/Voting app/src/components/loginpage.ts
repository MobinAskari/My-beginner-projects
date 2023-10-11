import { generateContainer } from "./getContainer.ts";
import { getBackground } from "./getBackground.ts";
import { showSignupPage } from "./signuppage.ts";
import loginUser from "../datas/login.ts";
import handleAlertElement from "../utils/handleAlertElement.ts";
import { urlSetter } from "../router/urlSetter.ts";
import handleAppState from "../lib/state.ts";
import { clearButtonLoadingState, setButtonLoadingState } from "../utils/loadingIndicator.ts";

export const showLoginPage = (): void => {
  document.body.innerHTML = ``;
  const container = generateContainer();
  container.classList.add('horizontal');

  urlSetter('login');

  container.innerHTML = `
    <section class="entering__left">
    <h1>Login</h1>

    <form action="" class="form entering">
      <div class="form__part">
        <div class="form__part-inputs">
          <label for="identifierInput">
            <span class="material-symbols-rounded">person</span>
          </label>
          <input type="text" id="identifierInput" placeholder="Username or Email">
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
          <input type="checkbox" id="rememberInput" checked="true">
          <label for="rememberInput">Remember me</label>
        </div>
      </div>

      <p>Forgot your password? <a href="#" class="link-rose" data-show-resetpassword>Reset password</a></p>
      
      <p>Don't have an account? <a href="" class="link-rose" data-show-signup>Sign up</a></p>

      <p class="resultMessage hidden">Invalid username or email</p>

      <button type="submit" class="form__submit-btn">Login</button>
    </form>
    </section>
    <section class="entering__right">
      <div class="entering__right-img">
        <img src="/illustrations/undraw_secure_login_pdn4.svg" alt="">
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
  const allAlertElements = Array.from(document.querySelectorAll('.alertElement')) as HTMLParagraphElement[];
  const submitBtn = document.querySelector('.form__submit-btn') as HTMLButtonElement;

  form.addEventListener("submit", async (e) => {
    setButtonLoadingState(submitBtn);
    e.preventDefault();
    const identifier = allInputs[0].value;
    const password = allInputs[1].value;
    const stayLoggedIn = allInputs[2].checked;
    const resultMessageElement = document.querySelector('.resultMessage') as HTMLParagraphElement;

    const inputValsCheck = [identifier, password].map((val, i) => {
      if (val === '' || val === ' ') {
        handleAlertElement(allAlertElements[i], 'Input cannot be empty', 'error')
        return false;
      }
      handleAlertElement(allAlertElements[i], '', 'hide');
      return true;
    });

    if (!inputValsCheck.every(val => val)) {
      clearButtonLoadingState(submitBtn, 'Login');
      return;
    }

    setButtonLoadingState(submitBtn);
    try {
      const result = await loginUser(identifier, password, stayLoggedIn);

      if (!result || !result.status) {
        clearButtonLoadingState(submitBtn, 'Login');
        handleAlertElement(resultMessageElement, result.message, 'error');
        return;
      }

      handleAlertElement(resultMessageElement, result.message, 'success')
      urlSetter("home");
      handleAppState();
    } catch (error) {
      clearButtonLoadingState(submitBtn, 'Login');

      handleAlertElement(resultMessageElement, 'There was a problem with connecting to the database, please check your internet connection and try again', 'error');
    }
  });

}

const handleAnchorClicks = () => {

  // const showResetPasswordAnchor = document.querySelector('[data-show-resetpassword]');

  // showResetPasswordAnchor?.addEventListener('click', () => resetPasswordPage);

  const showSignupAnchor = document.querySelector('[data-show-signup]');

  showSignupAnchor?.addEventListener('click', (event) => {
    event.preventDefault();
    urlSetter('signup');
    showSignupPage();

  });

}
