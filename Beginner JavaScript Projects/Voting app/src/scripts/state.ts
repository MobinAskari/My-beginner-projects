import { pullSessionStorage } from "./datas/sessionStorage.ts";
import { SSKey_CurrentUser } from "./datas/datas.ts";
import { setCookie } from "./datas/cookies.ts";
import { showSignupPage } from "./components/signuppage.ts";
import { showLoginPage } from "./components/loginpage.ts";
import { urlParser } from "./router/urlParser.ts";
import { show404Page } from "./components/404page.ts";
import { setDefaultTheme } from "./utils/themeToggler.ts";

type State = {
  hasVisited: boolean,
  isUserLoggedIn: boolean,
}

const state: State = {
  hasVisited: false,
  isUserLoggedIn: false,
}

export const manageState = (): void => {
  state.isUserLoggedIn = (() => {
    try {
      const isLoggedIn = pullSessionStorage(SSKey_CurrentUser).status;

      return isLoggedIn === 200;
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

  if (!state.isUserLoggedIn)
    state.hasVisited ? showLoginPage() : showSignupPage();

  if (state.isUserLoggedIn)
    urlParser() ? '' : show404Page()

  setDefaultTheme();
}

setCookie('hasVisited', true, 7);