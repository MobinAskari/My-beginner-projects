import { manageState } from "../state";
import { SSKey_CurrentUser } from "./datas"

export const logoutUser = () => {
  sessionStorage.removeItem(SSKey_CurrentUser);
  manageState();
}