import { generateContainer } from "./generateContainer.ts";
import { showMainPage } from "./mainpage.ts";

export const show404Page = () => {
  const body = document.body;
  const container = generateContainer();
  container.classList.add('notFound');

  body.innerHTML = ``;

  container.innerHTML = `
    <div class="notFound-img-wrapper">
      <img src="/illustrations/undraw_page_not_found_re_e9o6.svg" alt="">
    </div>
    <h1 class="notFound-h1">The page you are looking for does not exist!</h1>
    <button class="back-to-main-btn">
      Back to the main page
    </button>
  `;

  body.append(container);

  const backBtn = document.querySelector(".back-to-main-btn");

  backBtn?.addEventListener('click', showMainPage);
}