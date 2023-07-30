import { datas } from "./datas.js";

export const showInsights = () => {
  const container = document.querySelector('[data-insightsContainer]');

  const { insights } = datas;
  container.innerHTML = `
    <div class="progress__insights">
    <div class="insight">
      <h3>$${insights.moneyRaised.toLocaleString()}</h3>
      <p class="clr-gray">of ${insights.goal.toLocaleString()} backed</p>
    </div>
    <div class="insight">
      <h3>${insights.totalBackers.toLocaleString()}</h3>
      <p class="clr-gray">total backers</p>
    </div>
    <div class="insight">
      <h3>${insights.daysLeft.toLocaleString()}</h3>
      <p class="clr-gray">days left</p>
    </div>
    </div>
    <div class="progress__bar-wrapper">
      <progress value="${insights.moneyRaised}" max="${insights.goal}" class="progress-bar"></progress>
    </div>
  `;
}

showInsights()