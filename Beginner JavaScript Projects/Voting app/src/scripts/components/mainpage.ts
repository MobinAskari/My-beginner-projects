import {
  users,
  polls,
  SSKey_CurrentUser
} from "../datas/datas.ts";
import { pullSessionStorage } from "../datas/sessionStorage.ts";
import { addHeader } from "./header.ts";
import { addSidebar } from "./sidebar.ts";
import { generateContainer } from "./generateContainer.ts";
import { showVotingPage } from "./votingpage.ts";
import { showLoginPage } from "./loginpage.ts";

export const showMainPage = (): void => {
  window.history.replaceState({}, document.title, "/mainpage");

  const user = (() => {
    let userId: number;

    const pullResult = pullSessionStorage(SSKey_CurrentUser);

    if (pullResult.status === 200) {
      userId = pullResult.data.id;
    }

    return users.find(user => user.id === userId);
  })();

  if (!user) {
    alert("You're not authorized");
    showLoginPage();
    return;
  }

  const body = document.body;
  body.innerHTML = ``;

  addHeader();
  addSidebar();
  showContent();

  pollClickHandler();
}

const showContent = () => {
  const container = generateContainer();
  container.classList.add('content');

  container.append(
    composeCategoriesSection(),
    composePollsSection()
  );
}

const getRandomIndex = (amount: number) => {
  const indexesToUseMap = new Map();
  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * polls.length);

    if (!indexesToUseMap.has(randomIndex)) indexesToUseMap.set(randomIndex, '');
  }
  return indexesToUseMap
}

const composeCategoriesSection = () => {
  const section = document.createElement('section');
  section.classList.add('content-section');

  section.innerHTML += `
    <div class="content-section__top">
      <p class="content-section__top-title">Random Categories</p>
      <a href="#" class="section-link">Show all</a>
    </div>
  `;

  section.innerHTML += `
    <div class="content-section__bottom">
      <div class="categories-container">
      </div>
    </div>
  `;

  const categoriesContainer = section.querySelector('.categories-container') as HTMLDialogElement;

  const usedCategories: string[] = [];
  for (const [index] of getRandomIndex(10)) {
    const poll = polls[index];
    const categoryName = poll.pollCategories[0]?.name;

    if (usedCategories.indexOf(categoryName) === -1) {
      usedCategories.push(categoryName)
      categoriesContainer.innerHTML += `
        ${categoryName ? `<button class="category-btn">${categoryName}</button>` : ''}
      `;
    }
  }

  return section;
}

const composePollsSection = () => {
  const section = document.createElement('section');
  section.classList.add('content-section');

  section.innerHTML = `
    <div class="content-section__top">
      <p class="content-section__top-title">Polls You Might Like</p>
      <button>
        <svg width="1.5rem" height="1.5rem">
          <use href="/icons.svg#icon_filter">
        </svg>
      </button>
    </div>
  `;

  section.innerHTML += `
    <div class="content-section__bottom">
      <div class="polls-container">
      </div>
    </div>
  `;

  const pollsContainer = section.querySelector('.polls-container') as HTMLDivElement;

  for (const [index] of getRandomIndex(20)) {
    const poll = polls[index];
    const { title } = poll;

    const votesCount = poll.pollChoices.reduce((acc: any, curr: any) => {
      return acc + curr.choosedBy.length;
    }, 0);

    const optionsCount = poll.pollChoices.length;

    pollsContainer.innerHTML += `
      <div class="poll" data-poll-id="${poll.id}">
        <a href="">
          <strong class="poll-name">${title}</strong>
        </a>
        <div class="poll-overviews">
          <div class="poll-overview">
            <svg width="1.6rem" height="1.6rem">
              <use href="/icons.svg#icon_group">
            </svg>
            <p>${votesCount === 0 ? '0 Votes' : votesCount === 1 ? '1 Vote' : `${votesCount} Votes`}</p>
          </div>
          <div class="poll-overview">
            <svg width="1.6rem" height="1.6rem">
              <use href="/icons.svg#icon_checkCircle">
            </svg>
            <p>${optionsCount} Options</p>
          </div>
        </div>
      </div>
    `;
  }

  return section;
}

const pollClickHandler = () => {
  const shownPolls = [...document.querySelectorAll('.poll')] as HTMLDivElement[];

  shownPolls.forEach(poll => {
    const pollId = Number(poll.dataset.pollId);

    poll.addEventListener('click', (event) => {
      event.preventDefault();
      showVotingPage(pollId);
    });
  });
}