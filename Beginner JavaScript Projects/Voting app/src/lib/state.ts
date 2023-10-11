import { setCookie } from "../datas/cookies.ts";
import { urlParser } from "../router/urlParser.ts";
import { setOnMountTheme } from "../utils/themeToggler.ts";
import { showSignupPage } from "../components/signuppage.ts";
import { showLoginPage } from "../components/loginpage.ts";
import database from "../server/db.ts";

type State = {
  hasVisited: boolean,
  isUserLoggedIn: boolean,
}

const state: State = {
  hasVisited: false,
  isUserLoggedIn: false,
}

export default async function handleAppState() {
  state.isUserLoggedIn = (() => {
    try {
      const isLoggedIn = database.authStore.isValid && database.authStore.model != null;
      return isLoggedIn;
    } catch (error) {
      alert(error);
      return false;
    }
  })();

  state.hasVisited = (() => {
    try {
      const hasVisited = Boolean(document.cookie.split(';')[0].split('=')[1]);

      return hasVisited;
    } catch (error) {
      alert(error);
      return false;
    }
  })();

  window.addEventListener("popstate", urlParser)

  if (!state.isUserLoggedIn) {
    if (state.hasVisited) {
      showLoginPage();
    } else {
      showSignupPage();
    }
  }

  if (state.isUserLoggedIn) urlParser();
  /*
    admin@gmail.com
    1234567890
  */
  setOnMountTheme();

  setCookie('hasVisited', true, 7);
}