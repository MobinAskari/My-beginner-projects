import { showMainPage } from "./components/mainpage.ts";
// import { showLoginPage } from "./components/loginpage.ts";
import { pullSessionStorage } from "./datas/sessionStorage.ts";
import { SSKey_CurrentUser } from "./datas/datas.ts";
import { setCookie } from "./datas/cookies.ts";
import { showSignupPage } from "./components/signuppage.ts";
import { showLoginPage } from "./components/loginpage.ts";
import { showVotingPage } from "./components/votingpage.ts";

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

      if (isLoggedIn === 200) return true;
      else return false;
    } catch (error) {
      alert(error);
      return false;
    }
  })();

  state.hasVisited = (() => {
    try {
      const hasVisited = Boolean(document.cookie.split(';')[0].split('=')[1]);

      if (hasVisited) return true;
      else return false;
    } catch (error) {
      alert(error);
      return false;
    }
  })();


  if (state.isUserLoggedIn) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const pollId = params.get('pollId');

    if (pollId) showVotingPage(Number(pollId));
    else showMainPage();
  }
  if (!state.isUserLoggedIn) {
    if (state.hasVisited) showLoginPage();
    else showSignupPage();
  }

  setCookie('hasVisited', true, 7);
}
