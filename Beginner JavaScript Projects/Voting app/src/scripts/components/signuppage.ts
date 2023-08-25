import { generateContainer } from "./generateContainer.ts";
import { getBackground } from "./getBackground.ts";
import { showLoginPage } from "./loginpage.ts";
import { validateInput } from "../datas/validateInput.ts";
import { signupUser } from "../datas/signup.ts";
import { showMainPage } from "./mainpage.ts";

export const showSignupPage = (): void => {
  document.body.innerHTML = ``;
  const container = generateContainer();
  container.classList.add('enteringCon');

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
            <option value="null">Do not specify</option>
            <option value="male">male</option>
            <option value="female">female</option>
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
          <label for="locationInput">
            <span class="material-symbols-rounded">location_on</span>
          </label>
          <input type="text" id="locationInput" placeholder="Your location">
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = allInputs[0].value;
    const email = allInputs[1].value;
    const gender = genderSelect.value;
    const birthDate = allInputs[2].value;
    const location = allInputs[3].value;
    const password = allInputs[4].value;
    const passwordReenter = allInputs[5].value;

    const status = allInputs.map((input, i) => {
      return validateInput(input.value, allAlertElements[i])
    }).every(stat => stat);
        
    if (status) {
      const result = signupUser(
        username,
        email,
        gender,
        birthDate,
        location,
        password,
        passwordReenter);
      
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

  const showLoginAnchor = document.querySelector('[data-show-login]');

  showLoginAnchor?.addEventListener('click', showLoginPage);

}