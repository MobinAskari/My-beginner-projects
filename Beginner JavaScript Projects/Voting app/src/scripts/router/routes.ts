import { show404Page } from "../components/404page";
import { showAddPollPage } from "../components/createPollPage";
import { showHomePage } from "../components/homepage";
import { showLoginPage } from "../components/loginpage";
import { showSignupPage } from "../components/signuppage";
import { showVotingPage } from "../components/votingpage";

type Routes = Record<string,
  {
    path: string,
    functionForDisplaying: () => Function,
    requiredArgument?: {
      param: string,
      requiredParamType: "number" | "string"
    }
  }>

export const routes: Routes = {
  home: {
    path: '/home',
    functionForDisplaying: () => showHomePage
  },
  login: {
    path: '/login',
    functionForDisplaying: () => showLoginPage
  },
  signup: {
    path: '/signup',
    functionForDisplaying: () => showSignupPage
  },
  '404page': {
    path: '/404',
    functionForDisplaying: () => show404Page
  },
  'create-poll': {
    path: '/create-poll',
    functionForDisplaying: () => showAddPollPage,
  },
  'voting-page': {
    path: '/voting-page',
    functionForDisplaying: () => showVotingPage,
    requiredArgument: {
      param: 'pollId',
      requiredParamType: 'number'
    }
  }
}