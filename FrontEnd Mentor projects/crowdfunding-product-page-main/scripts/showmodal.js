import { datas, updateLS, localStorageKey } from "./datas.js";
import { showInsights } from "./insights.js";
import { showCompletion } from "./showCompletion.js";

export const showModal = () => {
  const container = document.querySelector('[data-plansModal]');
  const overlay = document.querySelector('[data-overlay]');
  container.classList.toggle('hidden');
  overlay.classList.toggle('hidden');

  const closeModal = () => {
    container.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
  }

  container.innerHTML = `
    <button class="modal__close-btn" data-closemodalbtn>
      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z" fill="#000" fill-rule="evenodd" opacity=".4"/></svg>
    </button>
    <h3>Back this project</h3>
    <p class="clr-gray">
      Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?
    </p>
  `;

  datas.plans.forEach(plan => {
    container.innerHTML += `
      <div class="reward ${plan.quantity === 0 ? 'sold-out' : ''}" data-planId="${plan.id}">
        <div class="reward__head">
          <div class="checkBtn"></div>
          <div class="modal__name-price modalPrice">
            <h3 data-h3withid="${plan.id}">${plan.title}</h3>
            ${plan.requirement ? `<p class="clr-green semi-bold">Pledge $${plan.requirement} or more</p>` : ''}
          </div>
          <div class="modal__reward-quantity">
            ${plan.quantity !== null ? `<h2>${plan.quantity}</h2><p class="clr-gray">left</p>` : ''}
          </div>
        </div>
        <div class="modal__reward__description">
          <p>${plan.description}</p>
        </div>
        <div class="reward__footer modalFooter hidden">
          <p class="clr-gray">Enter your pledge</p>
          <div class="reward__footer-action">
            <div class="input-wrapper">
              <span class="material-symbols-rounded">attach_money</span>
              <input type="number">
            </div>
            <button class="btn-green" data-continueBtn>Continue</button>
          </div>
        </div>
      </div>
    `;
  });

  const shownRewards = container.querySelectorAll('[data-planId]');

  shownRewards.forEach(shownReward => {
    const toggleSelections = () => {
      if (!shownReward.classList.contains('selected')) input.value = '';

      shownRewards.forEach(shownReward => { 
        shownReward.classList.remove('selected') 
        shownReward.querySelector('.checkBtn').classList.remove('selected');
        shownReward.querySelector('.reward__footer').classList.add('hidden');
      });
      shownReward.classList.toggle('selected');
      checkBtn.classList.toggle('selected');
      rewardFooter.classList.toggle('hidden');
    }

    shownReward.addEventListener('click', () => toggleSelections());

    const checkBtn = shownReward.querySelector('.checkBtn');
    const rewardFooter = shownReward.querySelector('.reward__footer');
    const input = rewardFooter.querySelector('input');
    const planId = parseFloat(shownReward.dataset.planid);
    const continueBtn = rewardFooter.querySelector('[data-continueBtn]');
    
    checkBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      shownReward.classList.toggle('selected');
      checkBtn.classList.toggle('selected');
      rewardFooter.classList.toggle('hidden');
      input.value = '';
    });

    continueBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const plan = datas.plans.find(plan => plan.id === planId);
      const inputValue = parseFloat(input.value)
      if (inputValue && inputValue >= plan.requirement) {
        datas.insights.moneyRaised += inputValue;
        datas.insights.totalBackers += 1;
        updateLS(localStorageKey, datas)
        showCompletion();
        showInsights();
      }
    });
  });

  const closeModalBtn = document.querySelector('[data-closemodalbtn]');
  closeModalBtn.addEventListener('click', closeModal);
}

const backThisProjectBtn = document.querySelector('[data-backprojectbtn]');
backThisProjectBtn.addEventListener('click', showModal);