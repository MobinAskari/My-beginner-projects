import { users } from "./datas.ts";
import { pushToLocalStorage } from "./localStorage.ts";
import { LSKey_UsersArr } from "./datas.ts";
import { SSKey_CurrentUser } from "./datas.ts";
import { pushToSessionStorage } from "./sessionStorage.ts";

export const loginUser = (
  identifier: string, 
  password: string, 
  stayLoggedIn: boolean) => {

  try {
    const user = users.find(user => user.username === identifier || user.email === identifier);
    
    if (!user) return {
      status: false,
      message: "The provided Username or Email doesn't exist"
    }
    if (password !== user.password) return {
      status: false,
      message: "The password is incorrect"
    }
    
    if (stayLoggedIn) user.settings.stayLoggedIn = true;

    user.enteringMetadata.loginsDate.push(new Date().toISOString());

    pushToLocalStorage(LSKey_UsersArr, users);
    pushToSessionStorage(SSKey_CurrentUser, { id: user.id });

    return {
      status: true,
      message: "Welcome back!"
    }
  } catch (error: any) {
    return {
      status: false,
      message: "There was a problem logging you in, please try again later"
    };
  }
}