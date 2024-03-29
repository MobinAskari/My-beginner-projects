import addHeader from "./header.ts";
import addSidebar from "./sidebar.ts";
import { generateContainer } from "./getContainer.ts";
import { showLoginPage } from "./loginpage.ts";
import { urlSetter } from "../router/urlSetter.ts";
import database from "../server/db.ts";
import getPolls from "../datas/getPolls.ts";
import { clearLoadingIndictors, getLoadingIndictor } from "../utils/loadingIndicators.ts";
import type { PollAPIResponse } from "../types/poll.types.ts";

export async function showHomePage(): Promise<void> {
  const isAuthorized = database.authStore.isValid && database.authStore.model != null;

  if (!isAuthorized) {
    alert("You're not authorized");
    showLoginPage();
    return;
  }

  urlSetter('home');
  const container = generateContainer();
  container.classList.add('hasSidebar', 'hasHeader');

  await addHeader();
  const sidebar = await addSidebar();

  getLoadingIndictor(container, 2);
  try {
    const polls = await getPolls(
      1,
      15,
      { sort: '-created' }
    );
    if (polls.status) {
      clearLoadingIndictors(container);
      container.innerHTML = '';
      container.append(composePollsSection(polls.data as PollAPIResponse[]));
    }
  } catch (error) {
    const isAPIHealthy = await database.health.check();
    if (isAPIHealthy.code === 200) {
      alert('Too many requests, please wait');
      sidebar.style.pointerEvents = 'none';
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showHomePage();
      return;
    }
    container.innerHTML = '<h1>There was a problem fetching data from the database, please try again later</h1>';
  }

}

const composePollsSection = (polls: PollAPIResponse[]) => {
  const section = document.createElement('section');
  section.classList.add('content-section');

  section.innerHTML = `
    <div class="content-section__top">
      <p class="content-section__top-title">Newest polls</p>
      <button>
        <svg width="1.5rem" height="1.5rem">
          <use href="/icons.svg#icon_filter">
        </svg>
      </button>
    </div>
    <div class="content-section__bottom">
      <div class="polls-container">
      </div>
    </div>
  `;

  const pollsContainer = section.querySelector('.polls-container') as HTMLDivElement;

  polls.forEach(poll => {
    const { title } = poll;

    const votesCount = poll.choices.reduce((acc: any, curr: any) => acc + curr.choosedBy.length, 0);
    const votesCountText =
      votesCount === 1
        ? '1 Vote'
        : `${votesCount} Votes`;

    const optionsCount = poll.choices.length;

    pollsContainer.innerHTML += `
      <div class="poll" data-poll-id="${poll.id}">
        <a href="/voting-page?poll-id=${poll.id}">
          <strong class="poll-name">${title}</strong>
        </a>
        <div class="poll-overviews">
          <div class="poll-overview">
            <svg width="1.6rem" height="1.6rem">
              <use href="/icons.svg#icon_group">
            </svg>
            <p>${votesCountText}</p>
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

  });

  return section;
}

/*
const pollClickHandler = () => {
  const shownPolls = [...document.querySelectorAll('.poll')] as HTMLDivElement[];

  shownPolls.forEach(poll => {
    const pollId = poll.dataset.pollId as string;

    poll.addEventListener('click', (event) => {
      event.preventDefault();
      showVotingPage(pollId);
    });
  });
}
*/