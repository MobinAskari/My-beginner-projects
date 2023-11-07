import database from "../server/db.ts";
import { urlSetter } from "../router/urlSetter.ts";
import handleAppState from "../lib/state.ts";
import type { UserAPIResponse } from "../types/user.types.ts";

const addClassToBody = (className: string) => document.body.classList.add(className);
const removeClassFromBody = (className: string) => document.body.classList.remove(className);

const changeUserThemePreference = async (preferredMode: string) => {
  let user;
  try {
    user = database.authStore.model;
    if (!user) {
      alert("There was a problem fetching user data from the database, please log in again");
      database.authStore.clear();
      urlSetter('login')
      handleAppState();
      return;
    }
  } catch (error) {
    alert("There was a problem fetching user data from the database, please log in again");
    return;
  }

  user.settings.theme = preferredMode;

  await database.collection('users').update(user.id, user);

  await database.collection('users').authRefresh();
}

export const setOnMountTheme = () => {
  const user = database.authStore.model as UserAPIResponse
  document.body.classList.forEach(cls => document.body.classList.remove(cls));

  // OPINIONATED: default theme is dark mode
  user ? addClassToBody(user.settings.theme) : addClassToBody('dark-mode');
}

export const toggleThemeInHTML = () => {
  const themeIconDivs = [...document.querySelectorAll('.app-theme-icon-wrapper')] as HTMLDivElement[];

  removeClassFromBody('light-mode');
  removeClassFromBody('dark-mode');
  themeIconDivs.forEach(div => {
    div.classList.toggle('active');

    const divClassList = [...div.classList];
    const theThemeToApply = divClassList[0];
    if (divClassList.includes('active')) {
      changeUserThemePreference(theThemeToApply);
      addClassToBody(theThemeToApply);
    }
  });
}