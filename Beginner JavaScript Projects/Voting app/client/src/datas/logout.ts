import database from "../server/db";
import handleAppState from "../lib/state";

export const logoutUser = () => {
  database.authStore.clear();
  handleAppState();
}