import { getHeaderMenu } from "./user-menu.ts";
import { getUserPfpImg } from "./getUserProfilePic.ts";
import database from "../server/db.ts";
import { UserAPIResponse } from "../types/user.types.ts";

export default async function addHeader() {
  try {
    let user = database.authStore.model as UserAPIResponse;
    if (!user) return;
    const body = document.body;
    let header = document.querySelector('.header');

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
          ${await getUserPfpImg()}
          </div>
        </div>
      `;

      body.appendChild(header);
      await menuVisibilityHandler();
    }

    return header;
  } catch (error) {
    alert("There was a problem fetching user data from the database, please log in again");
    return;
  }

}

const menuVisibilityHandler = async () => {
  const header = document.querySelector('.header') as HTMLDivElement;

  const headerProfileDiv = header.querySelector('.header__profile') as HTMLDivElement;
  const headerMenu = await getHeaderMenu();
  if (headerMenu) headerProfileDiv.appendChild(headerMenu)

  const headerProfilePic = header.querySelector('.header__profile-picture') as HTMLDivElement

  const headerUserMenu = header.querySelector('.header__user-menu') as HTMLDivElement;

  headerProfilePic.addEventListener('click', () => headerUserMenu.classList.toggle('shown'));
}