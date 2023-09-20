import {
  users,
  SSKey_CurrentUser
} from "../datas/datas.ts";
import { pullSessionStorage } from "../datas/sessionStorage.ts";
import { showLoginPage } from "./loginpage.ts";
import { getHeaderMenu } from "./user-menu.ts";


export const addHeader = () => {
  const user = (() => {
    let userId: number;

    const pullResult = pullSessionStorage(SSKey_CurrentUser);

    if (pullResult.status === 200) {
      userId = pullResult.data.id;
    }

    return users.find(user => user.id === userId);
  })();

  if (!user) {
    alert("You're not authorized");
    showLoginPage();
    return;
  }

  const body = document.body;
  let header = document.querySelector('header');
  const profilePicture =
    user.profilePicture !== '' ?
      `<img src="${user.profilePicture}" alt="">`
      :
      `
      <svg width="1.75rem" height="1.75rem">
        <use href="/icons.svg#icon_userNoPfp">
      </svg>
      `;

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
        ${profilePicture}
        </div>
      </div>
    `;

    body.appendChild(header);
    menuVisibilityHandler();
  }
}

const menuVisibilityHandler = () => {
  const header = document.querySelector('header') as HTMLDivElement;

  const headerProfileDiv = header.querySelector('.header__profile') as HTMLDivElement;
  headerProfileDiv.appendChild(getHeaderMenu())

  const headerProfilePic = header.querySelector('.header__profile-picture') as HTMLDivElement

  const headerUserMenu = header.querySelector('.header__user-menu') as HTMLDivElement;

  headerProfilePic.addEventListener('click', () => headerUserMenu.classList.toggle('shown'));
}