export const addHeader = (profilePic: string) => {
  const body = document.body;
  let header = document.querySelector('header');

  if (!header) {
    header = document.createElement('header');
    header.classList.add('header');

    header.innerHTML = `
      <div class="header__logo">
        <h2>Voting <span>App</span></h2>
      </div>

      <div class="header__search">
        <div class="header__search-wrapper">
          <button>
            <svg width="1.5rem" height="1.5rem">
              <use href="/icons.svg#icon_search">
            </svg>
          </button>
          <input type="text" placeholder="Search polls...">
        </div>
      </div>

      <div class="header__profile">
        <div class="header__profile-picture">
          ${profilePic !== '' ? 
            `<img src="${profilePic}" alt="">` 
            : 
            `<svg width="1.75rem" height="1.75rem">
              <use href="/icons.svg#icon_userNoPfp">
            </svg>`
          }
        </div>
      </div>
    `;

    body.appendChild(header);
  }
}