import { generateContainer } from "./getContainer.ts";
import { showHomePage } from "./homepage.ts";
import addHeader from "./header.ts";
import addSidebar from "./sidebar.ts";
import database from "../server/db.ts";
import { clearLoadingIndictors, getLoadingIndictor } from "../utils/loadingIndicator.ts";
import { urlSetter } from "../router/urlSetter.ts";
import { PollAPIResponse } from "../types/poll.types.ts";
import { show404Page } from "./404page.ts";
import { showLoginPage } from "./loginpage.ts";
import { UserAPIResponse } from "../types/user.types.ts";
import submitUserVote from "../datas/submitUserVote.ts";
import retractUserVote from "../datas/retractUserVote.ts";

export const showVotingPage = async (pollId: string) => {
  //@ts-ignore
  const container = generateContainer();
  container.classList.add("hasHeader", 'hasSidebar');

  addHeader();
  addSidebar();

  const initLogic = async () => {
    try {
      getLoadingIndictor(container, 1);
      const user = database.authStore.model as UserAPIResponse;
      if (!user) return showLoginPage();

      const poll = await database.collection("polls").getOne(pollId) as PollAPIResponse;

      if (!poll) return show404Page();

      clearLoadingIndictors(container);
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
          <h1></h1>
        </div>
        <div class="poll-choices">
        </div>
        <div class="poll-user-actions">
        </div>
        <div class="poll-owner">
          
        </div>
        <div class="poll-categories">
        </div>
        <div class="poll-actions">
          <div class="poll-copy-wrapper">
            <p class="poll-id"></p>
            <button class="poll-copy-btn">
              <p>Copy</p>
              <svg width="1.5rem" height="1.5rem">
                <use href="/icons.svg#icon_copy">
              </svg>
            </button>
          </div>
        </div>
      `;

      const pollUrlAddress = `${window.location.host}/voting-page?poll-id=${(poll.id).toString()}`;
      urlSetter(`/voting-page?poll-id=${poll.id}`);

      const currentUserVote = () => {
        const userVote = user.voted_polls.find(vote => vote.poll_id === poll.id)
        return userVote;
      }

      const showPollTitle = () => {
        const h1El = document.querySelector('.poll-title')?.querySelector('h1') as HTMLDivElement;

        h1El.innerHTML = '';

        h1El.innerText = poll.title;
      }

      const showPollUrlAdress = () => {
        const pEl = document.querySelector('.poll-id') as HTMLDivElement;

        pEl.innerHTML = '';

        pEl.innerText = pollUrlAddress;
      }

      const updatedVotesCount = () =>
        poll?.choices.reduce((acc: any, curr: any) => {
          return acc + curr.choosedBy.length;
        }, 0);

      const updateVotesCountElement = () => {
        const votesCountElement = document.querySelector(".votes-count-span") as HTMLSpanElement;

        votesCountElement.innerHTML = '';

        votesCountElement.textContent = updatedVotesCount();
      };

      const showCategories = (() => {
        const pollCategoriesContainer = container.querySelector(
          ".poll-categories"
        ) as HTMLDivElement;

        pollCategoriesContainer.innerHTML = '';

        poll?.categories.forEach((category) => {
          const btn = document.createElement("button");
          btn.classList.add('poll-category');
          btn.textContent = category.name;

          btn.style.setProperty("color", `var(${category.color})`)
          btn.style.setProperty("border-color", `var(${category.color})`)

          pollCategoriesContainer.append(btn);
        });
      });

      const showChoices = (() => {
        const pollOptionsContainer = document.querySelector(
          ".poll-choices"
        ) as HTMLDivElement;

        pollOptionsContainer.innerHTML = ``;

        poll.choices.forEach((option) => {
          const optionProgressPercentage = (() => {
            const progress = Number(
              (
                (option.choosedBy.length * 100) / updatedVotesCount()
              ).toFixed()
            );

            return isNaN(progress) ? 0 : progress;
          })();

          const pollOptionDiv = document.createElement("div");
          pollOptionDiv.innerHTML = `
          <div class="poll-progress">
            <p class="poll-percentage">
              ${optionProgressPercentage}%
            </p>
            <p class="poll-choice-name">
              ${option.name}
            </p>
            <span class="material-symbols-rounded">check_circle</span>
          </div>
        `;

          pollOptionDiv.dataset.pollOptionId = String(option.id);
          pollOptionDiv.classList.add("poll-choice");
          pollOptionDiv.classList.toggle(
            "selected",
            Boolean(currentUserVote()?.poll_choice_id === option.id)
          );

          // set Progress bar percentage
          const pollProgressBar = pollOptionDiv.querySelector(".poll-progress") as HTMLDivElement;

          pollProgressBar.style.width = `${optionProgressPercentage}%`;

          pollOptionsContainer.append(pollOptionDiv);
        });

        // adding an event listener to shown choices and submitting the vote
        const shownChoices = [...document.querySelectorAll(".poll-choice")] as HTMLDivElement[];

        shownChoices.forEach((option) => {
          option.addEventListener("click", async (event) => {
            event.stopPropagation()
            const optionId = option.dataset.pollOptionId;
            if (!currentUserVote()) {
              try {
                await submitUserVote(user.id, poll.id, optionId!);
                await database.collection('users').authRefresh();
                initLogic();
              } catch (error) {
                alert(error)
              }
            }
          });
        });
      });

      const retractBtnState = () => {
        const pollUserActionsContainer = container.querySelector(
          ".poll-user-actions"
        ) as HTMLDivElement;

        pollUserActionsContainer.innerHTML = ``;

        if (currentUserVote() && currentUserVote()?.poll_choice_id) {

          pollUserActionsContainer.innerHTML = `
          <button class="retract-vote-btn">
            <span class="material-symbols-rounded">
              undo
            </span>
            <p>Retract Vote</p>
          </button>
        `;

          const retractVoteBtn = document.querySelector(".retract-vote-btn") as HTMLButtonElement;

          retractVoteBtn.addEventListener("click", async () => {
            await retractUserVote(user.id, poll.id, currentUserVote()?.poll_choice_id!);
            await database.collection('users').authRefresh();
            initLogic();
          }
          );
        }

      };

      updateVotesCountElement();
      showPollTitle();
      showPollUrlAdress();
      showChoices();
      showCategories();
      retractBtnState();
      await showOwnerMetadata(poll.owner_id)
      clearLoadingIndictors(container);

      const backToMainPageBtn = document.querySelector(
        ".back-btn"
      ) as HTMLButtonElement;

      backToMainPageBtn.addEventListener("click", showHomePage);

      const pollIdBtn = document.querySelector(".poll-copy-btn") as HTMLButtonElement;

      pollIdBtn.addEventListener("click", () => navigator.clipboard.writeText(pollUrlAddress));

    } catch (error) {
      console.log(error);

    }
  }

  initLogic()

};


const showOwnerMetadata = async (ownerId: string) => {
  const pollOwnerContainer = document.querySelector('.poll-owner') as HTMLDivElement;
  getLoadingIndictor(pollOwnerContainer, 1);
  const ownerData = await database.collection('users').getOne(ownerId);
  const ownerPfpUrl = database.getFileUrl(ownerData, ownerData.profile_picture);
  const ownerPfp = ownerPfpUrl ?
    `
        <img src="${ownerPfpUrl}" alt="Poll owner profile   picture">
      `
    :
    `
        <svg width="1.75rem" height="1.75rem">
          <use href="/icons.svg#icon_userNoPfp">
        </svg>
      `;

  clearLoadingIndictors(pollOwnerContainer); // Not a must since we remove everything in the next line, but anyway...
  pollOwnerContainer.innerHTML = `
        <div class="poll-owner-pfp">
         ${ownerPfp}
        </div>       
        <p>${ownerData.username}</p>
      `
}