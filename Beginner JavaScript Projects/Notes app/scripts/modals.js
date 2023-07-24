import { mainContainer, modals } from "./components.js";

export const onboarding = (modal) => {
  mainContainer.innerHTML = ``;

  const onboardingSection = document.createElement('section');
  onboardingSection.classList = 'onboarding';

  const currentModal = modals[modal]();

  onboardingSection.append(currentModal)

  mainContainer.append(onboardingSection)
}

