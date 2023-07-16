const calculatorFormContainer = document.querySelector('.calculator-form_container');

const formParts = (element) => {
  const formPartsElements = {
    regular: (name, alert, img, id) => {
      return `
        <div class="formpart_titles">
          <p>${name}</p>
          <p class="alert">${alert}</p>
        </div>
        <div class="input_wrapper bill">
          <img src="${img}" alt="">
          <input type="number" placeholder="0" id="${id}">
        </div>
      `;
    },
    percentage: () => {
      return `
          <div class="formpart_titles">
            <p>Choose a percentage</p>
            <p class="alert">At least one should be choosed</p>
          </div>
          <div class="tip-buttons_container">
            <button class="tip-percentage_element button">5%</button>
            <button class="tip-percentage_element button">10%</button>
            <button class="tip-percentage_element button">15%</button>
            <button class="tip-percentage_element button">25%</button>
            <button class="tip-percentage_element button">50%</button>
            <input class="tip-percentage_element input" type="number" placeholder="Custom">
          </div>
      `;
    }
  }

  return formPartsElements[element];
}

export const addToForm = () => {
  calculatorFormContainer.innerHTML = ``;

  const reg1 = formParts('regular');
  calculatorFormContainer.innerHTML += reg1('Bill', `Can't be zero/empty`, 'images/icon-dollar.svg', 'bill-input');

  const percentage = formParts('percentage');
  calculatorFormContainer.innerHTML += percentage()
  
  const reg2 = formParts('regular');
  calculatorFormContainer.innerHTML += reg2('Number of People', `Can't be zero/empty`, 'images/icon-person.svg', 'number-of-people-input');
}

const calculatorResultsContainer = document.querySelector('.calculator-results_container');
export const amountElements = (names) => {
  calculatorResultsContainer.innerHTML = ``;

  names.forEach(name => {
    calculatorResultsContainer.innerHTML += 
    `
     <div class="amount_container">
       <div>
         <strong>${name.strong}</strong>
         ${name.p ? `<p>${name.p}</p>` : ''}
       </div>
       <div>
         <h2 id="${name.id}">$0.00</h2>
       </div>
     </div>
   `;
  });

  calculatorResultsContainer.innerHTML += `
    <button class="reset-button">RESET</button>
  `;
}

