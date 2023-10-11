import { logoutUser } from "../datas/logout";
import { toggleThemeInHTML } from "../utils/themeToggler";
import database from "../server/db";
import { AuthModel } from "pocketbase";
import { getUserPfpImg } from "./getUserProfilePic";

export const getHeaderMenu = async () => {
  let user: AuthModel;
  try {
    user = database.authStore.model;
    if (!user) return;
  } catch (error) {
    alert("There was a problem fetching user data from the database, please log in again");
    return;
  }

  const userMenuElement = document.createElement('div');
  userMenuElement.classList.add('header__user-menu');
  userMenuElement.innerHTML = `
    <div class="user-menu__profile">
      <div class="profile-pic-wrapper">
        ${getUserPfpImg()}
      </div>
      <div class="profile-name-action">
        <p>${user.username}</p>
        <a href="#">See your profile</a>
      </div>
    </div>
    <div class="user-menu__actions">
      <div class="user-menu__action" data-menu-user-action="settings">
        <div class="menu__action-icon">
          <svg width="1.25rem" height="1.25rem">
            <use href="/icons.svg#icon_settings"></use>
          </svg>
        </div>
        <div class="menu__action-name">
          <p>Settings</p>
        </div>
        <div class="menu__action-right-section"></div>
      </div>
      <div class="user-menu__action" data-menu-user-action="toggleTheme">
        <div class="menu__action-icon">
          <svg width="1.25rem" height="1.25rem">
            <use href="/icons.svg#icon_theme"></use>
          </svg>
        </div>
        <div class="menu__action-name">
          <p>Toggle Theme</p>
        </div>
        <div class="menu__action-right-section">
          <div class="theme-switcher-wrapper">
            <div class="dark-mode app-theme-icon-wrapper">
              <svg width="1.25rem" height="1.25rem">
                <use href="/icons.svg#icon_moon"></use>
              </svg>
            </div>
            <div class="light-mode app-theme-icon-wrapper">
              <svg width="1.25rem" height="1.25rem">
                <use href="/icons.svg#icon_sun"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="user-menu__action" data-menu-user-action="logout">
        <div class="menu__action-icon">
          <svg width="1.25rem" height="1.25rem">
            <use href="/icons.svg#icon_logout"></use>
          </svg>
        </div>
        <div class="menu__action-name">
          <p>Logout</p>
        </div>
        <div class="menu__action-right-section"></div>
      </div>
    </div>
  `;

  const allMenuUserActions = [...userMenuElement.querySelectorAll('[data-menu-user-action]')] as HTMLDivElement[];

  const actions: Record<string, Function> = {
    toggleTheme: () => toggleThemeInHTML(),
    logout: () => logoutUser(),
  }

  allMenuUserActions.forEach(action => {
    action.addEventListener('click', () => {
      const neededAction = action.dataset.menuUserAction;
      const actionFunctionToRun = neededAction && actions[neededAction];

      if (actionFunctionToRun) actionFunctionToRun()
    });
  });

  //@ts-ignore
  const handleThemeActiveStates = (() => {
    const themeIconsWrapper = [...userMenuElement.querySelectorAll('.app-theme-icon-wrapper')] as HTMLDivElement[];

    if (!user) {
      // OPINIONATED: default theme is dark mode
      themeIconsWrapper.forEach(div => {
        div.classList.toggle('active', div.classList[0] === 'dark-mode')
      });
      document.body.classList.add('dark-mode');
    } else {
      themeIconsWrapper.forEach(div => {
        div.classList.toggle('active', div.classList[0] === user?.settings.theme)
      });
      document.body.classList.add(user.settings.theme);
    }

  })()

  return userMenuElement;
}