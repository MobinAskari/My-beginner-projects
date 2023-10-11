import database from "../server/db.ts";
import { UserCreatePayload } from "../types/user.types.ts";

export default async function signupUser(
  username: string,
  email: string,
  gender: string,
  birthDate: string,
  password: string,
  passwordReenter: string
) {

  const chosenDate = new Date(birthDate);
  const currentDate = new Date();
  if (chosenDate.toString() === 'Invalid Date') return {
    status: false,
    message: `Invalid date format!`
  };
  if (currentDate.getTime() < chosenDate.getTime()) return {
    status: false,
    message: `Invalid date, the selected date cannot be ahead of the current date!`
  };
  if (
    username === '' ||
    email === '' ||
    gender === '' ||
    birthDate === '' ||
    password === '' ||
    passwordReenter === ''
  ) return {
    status: false,
    message: `All fields are mandatory`
  };

  const payload: UserCreatePayload = {
    "username": username,
    "email": email,
    "emailVisibility": false,
    "password": password,
    "passwordConfirm": passwordReenter,
    "voted_polls": [],
    "created_polls_ids": [],
    "settings": {
      "stayLoggedIn": true,
      "theme": "dark-mode"
    },
    "notifications": [],
    "user_metadata": {
      "bio": "",
      "birthDate": birthDate,
      "gender": gender
    },
    "social_medias": {
      "facebook": null,
      "instagram": null,
      "telegram": null,
      "twitter": null,
      "youtube": null
    },
  };

  try {
    const req = await database.collection('users').create(payload);

    if (req) return {
      status: true,
      message: 'Your account has been succesfuly created'
    };

    return {
      status: false,
      message: `There was a problem signing you up, please try again later`
    };
  } catch (error) {
    const isAPIHealthy = await database.health.check();
    return isAPIHealthy.code === 200 ? {
      status: false,
      message: `The provided inputs doesn't satisfy the inputs requirements`
    } : {
      status: false,
      message: `There is a porblem on our part, please try again later`
    };
  }
}