import { datas } from "./datas.js";

export const showPlans = () => {
  const container = document.querySelector('[data-plansContainer]');
  container.innerHTML = `
    <h3>About this project</h3>
    <p class="clr-gray">
      The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.
    </p>
    <p class="clr-gray">
      Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.
    </p>
  `;

  datas.plans.forEach(plan => {
    container.innerHTML += `
      <div class="reward ${plan.quantity === 0 ? 'sold-out' : ''}">
      <div class="reward__head">
        <div class="name-price">
          <h3>${plan.title}</h3>
          ${plan.requirement ? `<p class="clr-green semi-bold">Pledge $${plan.requirement} or more</p>` : ''}
        </div>
      </div>
      <div class="reward__description">
        <p>${plan.description}</p>
      </div>
      <div class="reward__footer">
          <div class="reward-quantity">
            ${plan.quantity ? `<h2>${plan.quantity}</h2><p class="clr-gray">left</p>` : ''}
          </div>
          ${
          plan.requirement === null && plan.quantity === null ? `` 
          : plan.quantity === 0 ? 
          '<button class="btn-green">Out of Stock</button>' : 
          `<button class="btn-green" data-selectRewardBtn="${plan.id}">Select Reward</button>`}
        </div>
      </div>
    `
  });
}

showPlans()