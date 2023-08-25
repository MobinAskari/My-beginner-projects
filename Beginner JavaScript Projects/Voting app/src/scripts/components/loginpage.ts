import { generateContainer } from "./generateContainer.ts";
import { getBackground } from "./getBackground.ts";
import { showSignupPage } from "./signuppage.ts";
import { validateInput } from "../datas/validateInput.ts";
import { loginUser } from "../datas/login.ts";
import { showMainPage } from "./mainpage.ts";

export const showLoginPage = (): void => {
  document.body.innerHTML = ``;
  const container = generateContainer();
  container.classList.add('enteringCon');

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
          <input type="checkbox" id="rememberInput">
          <label for="rememberInput">Remember me</label>
        </div>
      </div>

      <p>Forgot your password? <a href="#" class="link-rose" data-show-resetpassword>Reset password</a></p>
      
      <p>Don't have an account? <a href="#" class="link-rose" data-show-signup>Sign up</a></p>

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const identifier = allInputs[0].value;
    const password = allInputs[1].value;
    const stayLoggedIn = allInputs[2].checked;

    // Checks to see if every validation return is true
    const status = [
      validateInput(identifier, allAlertElements[0]), validateInput(password, allAlertElements[1])
    ].every(stat => stat); 
      
    if (status) {
      const result = loginUser(identifier, password, stayLoggedIn);

      handleResultMessage(result);
      if (result.status) setTimeout(showMainPage, 1000);
    }
  });

}

const handleResultMessage = (result: {
  status: boolean;
  message: string;
} ) => {
  const resultMessageElement = document.querySelector('.resultMessage') as HTMLParagraphElement;
  resultMessageElement.classList.remove('hidden');
  if (result.status) resultMessageElement.style.color = 'var(--green800)'; 
  else resultMessageElement.style.color = 'var(--rose700)';
  resultMessageElement.textContent = result.message;
}

const handleAnchorClicks = () => {

  // const showResetPasswordAnchor = document.querySelector('[data-show-resetpassword]');

  // showResetPasswordAnchor?.addEventListener('click', () => resetPasswordPage);

  const showSignupAnchor = document.querySelector('[data-show-signup]');

  showSignupAnchor?.addEventListener('click', showSignupPage);

}
