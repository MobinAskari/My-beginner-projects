import { SSKey_CurrentUser, User, users } from "../datas/datas";
import { logoutUser } from "../datas/logout";
import { pullSessionStorage } from "../datas/sessionStorage";
import { toggleThemeInHTML } from "../utils/themeToggler";
SSKey_CurrentUser

export const getHeaderMenu = () => {
  const user = (() => {
    let userId: number;

    const pullResult = pullSessionStorage(SSKey_CurrentUser);

    if (pullResult.status === 200) {
      userId = pullResult.data.id;
    }

    return users.find(user => user.id === userId);
  })() as User;

  const profilePicture =
    user.profilePicture !== '' ?
      `<img src="${user.profilePicture}" alt="">`
      :
      `
      <svg width="1.75rem" height="1.75rem">
        <use href="/icons.svg#icon_userNoPfp">
      </svg>
      `;

  const userMenuElement = document.createElement('div');
  userMenuElement.classList.add('header__user-menu');
  userMenuElement.innerHTML = `
    <div class="user-menu__profile">
      <div class="profile-pic-wrapper">
        ${profilePicture}
      </div>
      <div class="profile-name-action">
        <p>Lorem Ipsum</p>
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

  const themeIconsWrapper = [...userMenuElement.querySelectorAll('.app-theme-icon-wrapper')] as HTMLDivElement[];

  themeIconsWrapper.forEach(div => {
    div.classList.toggle('active', div.classList[0] == user.settings.theme)
  });

  const allMenuUserActions = [...userMenuElement.querySelectorAll('[data-menu-user-action]')] as HTMLDivElement[];

  const actions: Record<string, Function> = {
    toggleTheme: () => toggleThemeInHTML(),
    logout: () => logoutUser(),
  }

  allMenuUserActions.forEach(action => {
    action.addEventListener('click', () => {
      const neededAction = action.dataset.menuUserAction as string;
      const actionFunctionToRun = actions[neededAction];

      if (actionFunctionToRun != null) actionFunctionToRun()
    });
  });

  return userMenuElement;
}