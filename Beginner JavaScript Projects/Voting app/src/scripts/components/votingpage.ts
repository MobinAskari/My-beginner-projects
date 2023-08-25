import type { Poll, User, pollChoice, voted, choosedBy } from "../datas/datas.ts";
import { LSKey_UsersArr, LSKey_PollsArr, polls, users, SSKey_CurrentUser } from "../datas/datas.ts";
import { generateContainer } from "./generateContainer.ts";
import { pullSessionStorage } from "../datas/sessionStorage.ts";
import { pushToLocalStorage } from "../datas/localStorage.ts";
import { showMainPage } from "./mainpage.ts";

export const showVotingPage = (pollId: number) => {
  const body = document.body;
  const container = generateContainer();
  container.classList.add('votingPage');

  let ownerName, ownerPfp, currentUser: User;
  
  const poll = polls.find(poll => poll.id === pollId) as Poll;

  for (let i = 0; i < users.length; i++) {
    const eachUser = users[i];

    // @ts-ignore
    if (ownerName && ownerPfp && currentUser) break;    
    
    if (eachUser.id === poll.ownerId) {
      ownerName = eachUser.username;
      ownerPfp = eachUser.profilePicture;
    }
    
    if (eachUser.id === pullSessionStorage(SSKey_CurrentUser).data.id) currentUser = eachUser;
  }

  // @ts-ignore
  let hasCurrentUserVoted = Boolean(currentUser.voted.find(votes => {
   return votes.pollId === poll.id 
  }));
  
  const votesCount = () => poll.pollChoices.reduce((acc: any, curr: any) => {
    return acc + curr.choosedBy.length;
  }, 0);

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
        <p><span style="margin-right: .15rem;" class="votes-count-span">${votesCount()} </span> Voters</p>
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
        ${ownerPfp ? 
          `<img src="${ownerPfp}" alt="">` 
          : 
          `<svg width="1.75rem" height="1.75rem">
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
        <p class="poll-id">#${poll.id}</p>
        <button class="poll-copy-btn">
          <p>Copy</p>
          <svg width="1.5rem" height="1.5rem">
            <use href="/icons.svg#icon_copy">
          </svg>
        </button>
      </div>
    </div>
  `;

  const backToMainPageBtn = document.querySelector('.back-btn') as HTMLButtonElement;

  backToMainPageBtn.addEventListener('click', showMainPage);
  // @ts-ignore
  const updateVotesCount = () => container.querySelector('.votes-count-span').textContent = votesCount();
  updateVotesCount()
  
  const pollCategoriesContainer = container.querySelector('.poll-categories') as HTMLDivElement;

  const showCategories = () => {
    poll.pollCategories.forEach(category => {
      pollCategoriesContainer.innerHTML += `
        <button class="poll-category ${category.color}">${category.name}</button>
      `;
    });
  }

  const showOptions = () => {
    const pollOptionsContainer = document.querySelector('.poll-options') as HTMLDivElement;
    
    pollOptionsContainer.innerHTML = ``;

    poll.pollChoices.forEach(option => {
      let progressPercentage: string | number = (option.choosedBy.length * 100 / votesCount());      
      
      progressPercentage ? progressPercentage = progressPercentage.toFixed() : progressPercentage = 0;

      pollOptionsContainer.innerHTML += `
        <div class="poll-option ${currentUser.voted.find(votes => (votes.pollId === poll.id) && votes.pollChoiceId === option.id) ? 'selected' : ''}"
        data-poll-option-id="${option.id}"
        >
          <div class="poll-progress" 
          style="width: ${progressPercentage}%;">
            <p class="poll-percentage">${progressPercentage}%</p>
            <p class="poll-option-name">${option.name}</p>
            <span class="material-symbols-rounded">check_circle</span>
          </div>
        </div>
      `;
    });

    handleShownOptions();
  }

  const showUserActions = () => {
    const pollUserActionsContainer = container.querySelector('.poll-user-actions') as HTMLDivElement;

    pollUserActionsContainer.innerHTML = ``;

    if (hasCurrentUserVoted) {
      pollUserActionsContainer.innerHTML = `
        <button class="retract-vote-btn">
          <span class="material-symbols-rounded">
            undo
          </span>
          <p>Retract Vote</p>
        </button>
      `;

      handleUserActionClicks();
    }
  }

  showOptions();
  showUserActions()
  showCategories();

  function handleShownOptions() {
    const shownOptions = document.querySelectorAll('.poll-option');
    shownOptions.forEach(option => {
      
      option.addEventListener('click', () => {
        // @ts-ignore
        const optionId = parseFloat(option.dataset.pollOptionId); 

        if(!hasCurrentUserVoted) {
          const choosedOption = poll.pollChoices.find(choice => choice.id === optionId) as pollChoice;

          choosedOption.choosedBy.push({
            userId: currentUser.id,
            date: new Date().toISOString()
          });

          currentUser.voted.push({
            pollId: poll.id,
            pollChoiceId: choosedOption.id,
            date: new Date().toISOString() 
          })

          pushToLocalStorage(LSKey_UsersArr, users);
          pushToLocalStorage(LSKey_PollsArr, polls);

          hasCurrentUserVoted = true;
          votesCount();
          updateVotesCount();
          showOptions();
          showUserActions();
        }
        
      });

    });

  }

  function handleUserActionClicks() {
    const retractVoteBtn = document.querySelector('.retract-vote-btn');

    if (retractVoteBtn) {
      retractVoteBtn.addEventListener("click", () => {
        const userVote = currentUser.voted.find(votes =>  votes.pollId === poll.id) as voted;

        const pollChoice = poll.pollChoices.find(choice => choice.id === userVote.pollChoiceId) as pollChoice;

        const userVoteToRemove = pollChoice.choosedBy.find(user => user.userId === currentUser.id) as choosedBy;

        pollChoice.choosedBy.splice(pollChoice.choosedBy.indexOf(userVoteToRemove), 1);
        
        currentUser.voted.splice(currentUser.voted.indexOf(userVote,), 1)

        pushToLocalStorage(LSKey_UsersArr, users);
        pushToLocalStorage(LSKey_PollsArr, polls);
        
        votesCount();
        updateVotesCount();
        showOptions();
        showUserActions();
      });
    }
  }
  

  body.append(container)
}