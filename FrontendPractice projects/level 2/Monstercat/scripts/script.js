const headerMenuButton = document.querySelector('.header-menu-button');
const MobileHeaderMenuButton = document.querySelector('.mobile-header-menu-button');

const menuContainer = document.querySelector('.menu-container');
const menuItems = document.querySelector('.menu-items');
const menuCloseButton = document.querySelector('.menu-close-button');



headerMenuButton.addEventListener('click', () => {
  document.body.classList.toggle('preventScroll');
  openMenu();
});

MobileHeaderMenuButton.addEventListener('click', () => {
  document.body.classList.toggle('preventScroll');
  openMenu();
});

function openMenu() {
  menuContainer.classList.toggle('hidden');
}

menuCloseButton.addEventListener('click', () => {
  document.body.classList.toggle('preventScroll');
  menuContainer.classList.toggle('hidden');
});


showElements();
function showElements() {
  menuItems.innerHTML = '';

  const ulContainerElement = document.createElement('ul');
  menuInfoArray.forEach(element => {
    const liElement = document.createElement('li');
    
    if (element.children) {
      
      liElement.innerHTML += `
      <div class="li-header">
        ${element.li} 
        <span class="material-symbols-sharp expand-item">arrow_forward_ios</span>
      </div>
      `;

      const childrenUlContainer = document.createElement('ul');
      
      childrenUlContainer.classList.add('childrenUl');
      
      element.childrenElements.forEach(childrenLi => {
        // const childrenLiElement = document.createElement('li');
        // childrenLiElement.innerHTML = `${childrenLi}`;
        // childrenUlContainer.append(childrenLiElement);
        
        childrenUlContainer.classList.add('hidden');

        childrenUlContainer.innerHTML += `
          <li>${childrenLi}</li>
        `;
      });
      
      liElement.append(childrenUlContainer);
    } else {
      liElement.innerHTML += `${element.li}`;
    }

    ulContainerElement.append(liElement);
  });
  menuItems.append(ulContainerElement);
  
}

document.querySelectorAll('.expand-item').forEach((expandBtn, index) => {
  expandBtn.addEventListener('click', () => {
    if (expandBtn.innerText === 'arrow_forward_ios') {
      expandBtn.innerText = 'expand_less';
    } else {
      expandBtn.innerText = 'arrow_forward_ios';
    }

    document.querySelectorAll('.childrenUl')[index].classList.toggle('hidden');
  });
});

/* 
  <span class="material-symbols-sharp">
    expand_less
  </span>
*/

// got a little lazy and didn't want to do it with css :)
// i acknowledge you shouldn't put a curser:poitner; on all spans, it's just for sake of this particular project

document.querySelectorAll('span').forEach(span => {
  span.style.cursor = 'pointer';
});