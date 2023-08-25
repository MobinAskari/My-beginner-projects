import type { User } from "./datas.ts";
import { users } from "./datas.ts";
import { generateToken } from "./tokengenerator.ts";
import { pushToLocalStorage } from "./localStorage.ts";
import { LSKey_UsersArr } from "./datas.ts";
import { pushToSessionStorage } from "./sessionStorage.ts";
import { SSKey_CurrentUser } from "./datas.ts";

export const signupUser = (
  username: string,
  email: string,
  gender: string,
  birthDate: string,
  location: string,
  password: string,
  passwordReenter: string
) => {

  if (password !== passwordReenter) return { status: false, message: "password and the password reenter doesn't match" };
  
  const checkForIdenticalUser = users.map(user => {
    if (user.username === username) return { status: true, message: "this username has already been taken" }
    
    if (user.email === email) return { status: true, message: "this email has already been taken" }
    
    return { status: false, message: "" }
  })[0];

  if (checkForIdenticalUser?.status === true) return { status: false, message: checkForIdenticalUser.message }

  const generateId = (): number => {
    const lastId = users[users.length - 1]?.id;

    return lastId ? lastId + 1 : 1;
  }

  try {
    const user: User = {
      token: generateToken(),
      id: generateId(),
      username: username,
      email: email,
      password: password,
      userMetadata: {
        birthDate: birthDate,
        location: location,
        gender: gender,
        bio: ''
      },
      profilePicture: '',
      voted: [],
      notifications: [],
      enteringMetadata: {
        accountCreatedAt: new Date().toISOString(),
        loginsDate: []
      },
      settings: {
        theme: 'darkMode',
        stayLoggedIn: false
      },
      socialMedias: {
        facebook: null, 
        twitter: null,
        instagram: null,
        youtube: null,
        telegram: null
      } 
    }
    
    users.push(user);
    pushToLocalStorage(LSKey_UsersArr, users);
    pushToSessionStorage(SSKey_CurrentUser, { id: user.id });
    
    return {
      status: true,
      message: "Your account was succesfully created"
    };
  } catch (error: any) {
    return {
      status: false,
      message: `There was a problem signing you up, please try again later`
    };
  }    
}