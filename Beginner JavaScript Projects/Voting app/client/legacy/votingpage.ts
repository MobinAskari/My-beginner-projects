/*
import type {
  Poll,
  User,
  pollChoice,
  voted,
  choosedBy,
} from "../datas/datas.ts";
import {
  LSKey_UsersArr,
  LSKey_PollsArr,
  polls,
  users,
  SSKey_CurrentUser,
} from "../datas/datas.ts";
import { generateContainer } from "./generateContainer.ts";
import { pullSessionStorage } from "../datas/sessionStorage.ts";
import { pushToLocalStorage } from "../datas/localStorage.ts";
import { showHomePage } from "./homepage.ts";
import { addHeader } from "./header.ts";
import { addSidebar } from "./sidebar.ts";
import { show404Page } from "./404page.ts";
import { urlSetter } from "../router/urlSetter.ts";

export const showVotingPage = (pollId: number) => {
  const body = document.body;
  const container = generateContainer();
  container.classList.add("votingPage");

  addHeader();
  addSidebar();

  const poll = polls.find((poll) => poll.id === pollId) as Poll;

  if (!poll) {
    show404Page();
    return;
  }

  const pollUrlAddress = `${window.location.host}/voting-page?pollId=${(poll.id).toString()}`;

  urlSetter(`/voting-page?pollId=${poll.id}`);

  // find ownerName, ownerPfp, currentUser
  let ownerName, ownerPfp, currentUser: User;
  for (let i = 0; i < users.length; i++) {
    const eachUser = users[i];

    // @ts-ignore
    if (ownerName && ownerPfp && currentUser) break;

    if (eachUser.id === poll.ownerId) {
      ownerName = eachUser.username;
      ownerPfp = eachUser.profilePicture;
    }

    if (eachUser.id === pullSessionStorage(SSKey_CurrentUser).data.id)
      currentUser = eachUser;
  }

  // page structure: 
  container.innerHTML = `
    <div class="poll-ux-actions">
      <button class="back-btn">
        <span class="material-symbols-rounded">arrow_back</span>
      </button>
    </div>

    <div class="poll-metadatas">
      <div class="poll-metadata">
        <svg width="1.6rem" height="1.6rem">
          <use href="/icons.svg#icon_group">
        </svg>
        <p><span style="margin-right: .15rem;" class="votes-count-span"></span> Voters</p>
      </div>
    </div>
    <div class="poll-title">
      <h1>${poll.title}</h1>
    </div>
    <div class="poll-options">
    </div>
    <div class="poll-user-actions">
    </div>
    <div class="poll-owner">
      <div class="poll-owner-pfp">
        ${ownerPfp
      ? `<img src="${ownerPfp}" alt="">`
      : `<svg width="1.75rem" height="1.75rem">
            <use href="/icons.svg#icon_userNoPfp">
          </svg>`
    }
      </div>       
      <p>${ownerName}</p>
    </div>
    <div class="poll-categories">
    </div>
    <div class="poll-actions">
      <div class="poll-copy-wrapper">
        <p class="poll-id">${pollUrlAddress}</p>
        <button class="poll-copy-btn">
          <p>Copy</p>
          <svg width="1.5rem" height="1.5rem">
            <use href="/icons.svg#icon_copy">
          </svg>
        </button>
      </div>
    </div>
  `;

  const currentUserVote = () =>
    currentUser.voted.find((votes) => votes.pollId === poll.id);

  const updatedVotesCount = () =>
    poll.pollChoices.reduce((acc: any, curr: any) => {
      return acc + curr.choosedBy.length;
    }, 0);

  const updateVotesCountElement = () => {
    const votesCountElement = container.querySelector(".votes-count-span") as HTMLSpanElement;
    votesCountElement.textContent = updatedVotesCount();
  }

  const showCategories = () => {
    const pollCategoriesContainer = container.querySelector(
      ".poll-categories"
    ) as HTMLDivElement;

    poll.pollCategories.forEach((category) => {
      const btn = document.createElement("button");
      btn.classList.add('poll-category');
      btn.textContent = category.name;

      btn.style.setProperty("color", `var(${category.color})`)
      btn.style.setProperty("border-color", `var(${category.color})`)

      pollCategoriesContainer.append(btn);
    });
  };

  const showChoices = () => {
    const pollOptionsContainer = document.querySelector(
      ".poll-options"
    ) as HTMLDivElement;

    pollOptionsContainer.innerHTML = ``;

    poll.pollChoices.forEach((option) => {
      const optionProgressPercentage = (() => {
        const progress = Number(
          ((option.choosedBy.length * 100) / updatedVotesCount()).toFixed()
        );

        return isNaN(progress) ? 0 : progress;
      })();

      const pollOptionDiv = document.createElement("div");
      pollOptionDiv.innerHTML = `
        <div class="poll-progress">
          <p class="poll-percentage">
            ${optionProgressPercentage}%
          </p>
          <p class="poll-option-name">
            ${option.name}
          </p>
          <span class="material-symbols-rounded">check_circle</span>
        </div>
      `;

      pollOptionDiv.dataset.pollOptionId = String(option.id);
      pollOptionDiv.classList.add("poll-option");
      pollOptionDiv.classList.toggle(
        "selected",
        Boolean(currentUserVote()?.pollChoiceId === option.id)
      );

      // set Progress bar percentage
      const pollProgressBar = pollOptionDiv.querySelector(".poll-progress") as HTMLDivElement;

      pollProgressBar.style.width = `${optionProgressPercentage}%`;

      pollOptionsContainer.append(pollOptionDiv);
    });

    // adding an event listener to shown choices and submitting the vote
    const shownChoices = [...document.querySelectorAll(".poll-option")] as HTMLDivElement[];

    shownChoices.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.stopPropagation()
        const optionId = Number(option.dataset.pollOptionId);

        submitUserVote(optionId);
      });
    });
  };

  const retractBtnState = () => {
    const pollUserActionsContainer = container.querySelector(
      ".poll-user-actions"
    ) as HTMLDivElement;

    pollUserActionsContainer.innerHTML = ``;

    if (currentUserVote()) {
      pollUserActionsContainer.innerHTML = `
        <button class="retract-vote-btn">
          <span class="material-symbols-rounded">
            undo
          </span>
          <p>Retract Vote</p>
        </button>
      `;

      const retractVoteBtn = document.querySelector(".retract-vote-btn") as HTMLButtonElement;

      retractVoteBtn.addEventListener("click", () => retractUserVote());
    }

  };

  const submitUserVote = (optionId: number) => {
    if (currentUserVote()) return;

    const choosedOption = poll.pollChoices.find(
      (choice) => choice.id === optionId
    ) as pollChoice;

    choosedOption.choosedBy.push({
      userId: currentUser.id,
      date: new Date().toISOString(),
    });

    currentUser.voted.push({
      pollId: poll.id,
      pollChoiceId: choosedOption.id,
      date: new Date().toISOString(),
    });

    pushToLocalStorage(LSKey_UsersArr, users);
    pushToLocalStorage(LSKey_PollsArr, polls);

    updateVotesCountElement();
    showChoices();
    retractBtnState();
  };

  const retractUserVote = () => {
    // user ID, poll ID, pollChoiceId
    const userVote: voted | undefined = currentUserVote();

    if (!userVote) return;

    const choosedOption = poll.pollChoices.find(
      (choice) => choice.id === userVote.pollChoiceId
    ) as pollChoice;
    // example: {id: 3, name: 'Asus', choosedBy: Array(1)}

    const userVoteToRemoveFromOption = choosedOption.choosedBy.find(
      (user) => user.userId === currentUser.id
    ) as choosedBy;
    // example: {userId: 1, date: '2023-08-27T15:33:54.491Z'}

    // remove the user vote from the option "choosedBy" array 
    choosedOption.choosedBy.splice(
      choosedOption.choosedBy.indexOf(userVoteToRemoveFromOption),
      1
    );

    // remove the user vote from the user "voted" array
    currentUser.voted.splice(
      currentUser.voted.indexOf(userVote),
      1
    );

    pushToLocalStorage(LSKey_UsersArr, users);
    pushToLocalStorage(LSKey_PollsArr, polls);

    updateVotesCountElement();
    showChoices();
    retractBtnState();
  }

  updateVotesCountElement();
  showChoices();
  retractBtnState();
  showCategories();

  const backToMainPageBtn = document.querySelector(
    ".back-btn"
  ) as HTMLButtonElement;

  backToMainPageBtn.addEventListener("click", showHomePage);

  const pollIdBtn = document.querySelector(".poll-copy-btn") as HTMLButtonElement;

  pollIdBtn.addEventListener("click", () => navigator.clipboard.writeText(pollUrlAddress));

  body.append(container);
};
*/