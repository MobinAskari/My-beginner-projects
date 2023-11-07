/*
import { generateContainer } from "./generateContainer.ts";
import { getBackground } from "./getBackground.ts";
import { showSignupPage } from "./signuppage.ts";

// Cookie bug, even if they don't agree they will still proceed

type onboarding = {
  img: string,
  heading: string,
  description: string,
  actions: {
    proceed: {
      button: HTMLButtonElement,
      action: () => void
    }
    skip?: {
      button: HTMLButtonElement,
      action: () => void
    }
  },
}

const onboardings: { [key: string]: onboarding } = {
  welcome: {
    img: "/illustrations/undraw_welcoming_re_x0qo.svg",
    heading: "Welcome!",
    description: `Thank you for choosing our app. By using our services, you are agreeing to our <a href="#" class="link-rose">Privacy</a> & <a href="#h" class="link-rose">Policy</a> terms.`,
    actions: {
      proceed: {
        button: createOnboardingButton('proceed', 'js-proceed-button'),
        action: () => showOnboarding('purpose')
      },
    }
  },
  purpose: {
    img: "/illustrations/undraw_welcoming_re_x0qo.svg",
    heading: "Welcome!",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt blanditiis vel atque asperiores! Voluptas magni vero aliquam, maxime laboriosam quisquam amet placeat laborum ab animi rem ullam unde, nostrum iusto?`,
    actions: {
      proceed: {
        button: createOnboardingButton('proceed', 'js-proceed-button'),
        action: () => showSignupPage()
      },
    }
  }

}

function createOnboardingButton (textInside: string, className: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.classList.add('onboarding__btn', className);
  button.innerText = textInside;
  return button;
}

const composeOnboarding = (onboardingObject: onboarding): HTMLElement => {
  const section = document.createElement('section');
  section.classList.add('onboarding');

  const { img, heading, description, actions } = onboardingObject;
  
  section.innerHTML = `
    <div class="onboarding__img">
      <img src="${img}" alt="">
    </div>
    <div class="onboarding__heading">
      <h1>${heading}</h1>
    </div>
    <div class="onboarding__description">
      <p>${description}</p>
    </div>
    <div class="onboarding__action"></div>
  `;

  const onboardingActionDiv = section.querySelector('.onboarding__action') as HTMLDivElement;
  
  if (onboardingActionDiv) {
    Object.values(actions).forEach(actionBtn => {
      onboardingActionDiv.append(actionBtn.button)
    });
  }

  const actionsListener = () => {
    const proceedBtn = onboardingActionDiv.querySelector('.js-proceed-button');    
  
    const skipBtn = onboardingActionDiv?.querySelector('.js-skip-button');
    
    if (proceedBtn) proceedBtn.addEventListener('click', actions.proceed.action);
  
    if (skipBtn && actions.skip) skipBtn.addEventListener('click', actions.skip.action);
  }
  actionsListener()

  return section;  
}

export const showOnboarding = (onboardingName: string): void => {

  const modalContainer = generateContainer();
  modalContainer.classList.add('onboardingCon')
  
  const onboardingToUse = composeOnboarding(onboardings[onboardingName]);
  
  modalContainer.append(onboardingToUse, getBackground());
  
  const calcAndShowPageIndicator = () => {
    const allOnboardings = Object.keys(onboardings);
    const indexToMark = allOnboardings.indexOf(onboardingName);
    const onboardingsCount = allOnboardings.length;

    const pageIndicatorElement = generatePageIndicatorHTML(onboardingsCount, indexToMark)

    modalContainer.append(pageIndicatorElement);
  };
  calcAndShowPageIndicator();

}

const generatePageIndicatorHTML = (amountOfPages: number, indexToMark: number): HTMLElement => {
  const navElement = document.createElement('nav');
  navElement.classList.add('page-indicator');
  
  const ulElement = document.createElement('ul');
  
  for (let i = 0; i < amountOfPages; i++) {
    const liElement = document.createElement('li');
    if (i === indexToMark) liElement.classList.add('active');
    ulElement.append(liElement);
  }

  navElement.append(ulElement);

  return navElement;
}
*/