import database from "../server/db";
import { urlSetter } from "../router/urlSetter";
import handleAppState from "../lib/state";

export const logoutUser = () => {
  database.authStore.clear();
  urlSetter('login');
  handleAppState();
}