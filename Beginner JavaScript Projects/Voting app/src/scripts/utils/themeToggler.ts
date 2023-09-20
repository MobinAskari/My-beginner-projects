import { users, SSKey_CurrentUser, type User, LSKey_UsersArr } from "../datas/datas";
import { pushToLocalStorage } from "../datas/localStorage";
import { pullSessionStorage } from "../datas/sessionStorage.ts";
const changeUserThemePreference = (preferredMode: string) => {
  const user = (() => {
    let userId: number;

    const pullResult = pullSessionStorage(SSKey_CurrentUser);

    if (pullResult.status === 200) {
      userId = pullResult.data.id;
    }

    return users.find(user => user.id === userId);
  })() as User;

  user.settings.theme = preferredMode;
  pushToLocalStorage(LSKey_UsersArr, users);
}

export const setDefaultTheme = () => {
  const user = (() => {
    let userId: number;

    const pullResult = pullSessionStorage(SSKey_CurrentUser);

    if (pullResult.status === 200) {
      userId = pullResult.data.id;
    }

    return users.find(user => user.id === userId);
  })() as User;

  document.body.classList.remove('dark-mode');
  document.body.classList.remove('light-mode');

  if (user == null) {
    document.body.classList.add('dark-mode');
  } else document.body.classList.add(user.settings.theme);
}

export const toggleThemeInHTML = () => {
  const themeSwitchDivElement = document.querySelector('.theme-switcher-wrapper') as HTMLDivElement;

  const themeIconDivs = themeSwitchDivElement.querySelectorAll('div');
  themeIconDivs.forEach(div => {
    div.classList.toggle('active');

    const divClassLists = [...div.classList];
    document.body.classList.remove(divClassLists[0]);
    if (divClassLists.includes('active')) {
      changeUserThemePreference(divClassLists[0]);
      document.body.classList.add(divClassLists[0]);
    }

  });
}