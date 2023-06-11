const availablePlansContainer = document.querySelector('.plans-overall-con');

showAvailablePlans ()

function showAvailablePlans () {
  availablePlansContainer.innerHTML = '';

  availablePlans.forEach(planName => {
    const planOverallDiv = document.createElement('div');
    planOverallDiv.classList.add('plan-overall');

    const savedMoney = (planName.pricePerMonth * 12) - planName.pricePerYear;

    console.log(savedMoney);

    planOverallDiv.innerHTML = `
      <h3 class="clr-${planName.nameColor}">${planName.name}</h3>
      <strong>$${planName.pricePerMonth}/mo</strong>
      <p><strong>$${planName.pricePerYear}/yr</strong> (Save $${savedMoney}/yr)</p>
    `;

    availablePlansContainer.appendChild(planOverallDiv);
  });

}

const plansStats = document.querySelector('.plans-stats');

let statDescription = [];

showPlansStats();


function showPlansStats () {
  plansStats.innerHTML = '';

  plansStatsArray.forEach(planStat => {
    const titleElement = document.createElement('h4');
    titleElement.innerText = planStat.title;

    console.log(planStat);
    
    plansStats.appendChild(titleElement);

    const tableElement = document.createElement('table');

    planStat.stats.forEach((stats, index) => {
      
      const trElement = document.createElement('tr');

      let firstPlanStatus;
      let secondPlanStatus;
      let thirdPlanStatus;

      if (stats.firstPlan === true) {
        firstPlanStatus = `<span class="material-symbols-sharp bgc-clr-blue">check</span>`;
      } 
      if (stats.firstPlan === false) {
        firstPlanStatus = `<span class="material-symbols-sharp clr-blue-opacity">close</span>`;
      }
      if (stats.firstPlan != true && stats.firstPlan != false) {
        firstPlanStatus = `<h5 class="bgc-clr-blue">${stats.firstPlan}</h5>`;
      }

      if (stats.secondPlan === true) {
        secondPlanStatus = `<span class="material-symbols-sharp bgc-clr-purple">check</span>`;
      } 
      if (stats.secondPlan === false) {
        secondPlanStatus = `<span class="material-symbols-sharp clr-purple-opacity">close</span>`;
      }
      if (stats.secondPlan != true && stats.secondPlan != false) {
        secondPlanStatus = `<h5 class="bgc-clr-purple">${stats.secondPlan}</h5>`;
      }

      if (stats.thirdPlan === true) {
        thirdPlanStatus = `<span class="material-symbols-sharp bgc-clr-orange">check</span>`;
      } 
      if (stats.thirdPlan === false) {
        thirdPlanStatus = `<span class="material-symbols-sharp clr-orange-opacity">close</span>`;
      }
      if (stats.thirdPlan != true && stats.thirdPlan != false) {
        thirdPlanStatus = `<h5 class="bgc-clr-orange">${stats.thirdPlan}</h5>`;
      }


      if (stats.description === true) {
        statDescription.push(stats.descriptionText);
        trElement.innerHTML = `
          <th class="has-description">
            <p>${stats.name}</p>
            <span class="material-symbols-sharp description-btn" style="cursor: pointer;">info</span>
          </th>
          <th class="head-stats head-stats-h5">
            ${firstPlanStatus}  
            ${secondPlanStatus}  
            ${thirdPlanStatus} 
          </th>
      `;     
      }
      

      if (stats.description === false) {
        trElement.innerHTML = `
          <th>
            <p>${stats.name}</p>
          </th>
          <th class="head-stats head-stats-h5">
            ${firstPlanStatus}  
            ${secondPlanStatus}  
            ${thirdPlanStatus}   
          </th>
      `;
      }


      tableElement.appendChild(trElement);
      plansStats.appendChild(tableElement);

      
    });

    
    console.log(tableElement);
  });


}


const descriptionElements = document.querySelectorAll('.has-description');

descriptionElements.forEach((val, i) => {
  val.innerHTML += `
  <div class="description-popup hidden">
  <p>${statDescription[i]}</p>  
  </div>
  `;

});

document.querySelectorAll('.description-btn').forEach((infoButton, index) => {

  infoButton.addEventListener('click', () => {
      document.querySelectorAll('.description-popup')[index].classList.toggle('hidden');
  });

});