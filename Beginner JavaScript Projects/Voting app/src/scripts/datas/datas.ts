export type pollCategory = {
  name: string,
  color: string
}

export type choosedBy = {
  userId: number,
  date: string
}

export type pollChoice = {
  id: number, /* Auto gen */
  name: string,
  choosedBy: choosedBy[] /* Users IDs */
}

export interface Poll {
  id: number,
  title: string,
  pollCategories: pollCategory[], /* Company, fun ... */
  ownerId: number /* user id to get from DB */,
  pollChoices: pollChoice[], /* (options counts) -
  (voters count),*/
  creationDate: string,
  openUntil: string | null /* null means it's always open */,
  closed: true | false
}

type SocialMedias = {
  facebook: string | null,
  twitter: string | null,
  instagram: string | null,
  youtube: string | null,
  telegram: string | null /** e.g. https://t.me/user or null for not specified */
}

type Settings = {
  theme: string, /** e.g. darkMode or lightMode */
  stayLoggedIn: boolean /** e.g. true or false */
}

type EnteringMetadata = {
  accountCreatedAt: string,
  loginsDate: string[],
}

type UserMetadata = {
  birthDate: string,
  location: string,
  gender: string,
  bio: string
}

export type voted = {
  pollId: number,
  pollChoiceId: number,
  date: string
}

export type User = {
  token: string, /** e.g. 3oTj9ZwvArOG89OJXP0lGGzWaJcGYtSj */
  id: number,
  username: string,
  email: string,
  password: string,
  profilePicture: string,
  voted: voted[],
  createdPollsIds: number[],
  notifications: [],
  userMetadata: UserMetadata,
  enteringMetadata: EnteringMetadata,
  settings: Settings,
  socialMedias: SocialMedias
}

import { pullLocalStorage } from "./localStorage.ts";

export const SSKey_CurrentUser = 'SSKey_CurrentUser';
export const LSKey_UsersArr = 'LSKey_UsersArr';

export const LSKey_PollsArr = 'LSKey_PollsArr';

export let users: User[] =
  pullLocalStorage(LSKey_UsersArr).data as User[]
  ??
  [
    {
      "token": "aXqdHnRjSXLpjNiZcAMAUQDTk6w3OZK7",
      "id": 1,
      "username": "test",
      "email": "test@email.com",
      "password": "a",
      "userMetadata": {
        "birthDate": "2121-02-11",
        "location": "a",
        "gender": "male",
        "bio": ""
      },
      "profilePicture": "/pfps/profile-2.jpg",
      "voted": [],
      "createdPollsIds": [1],
      "notifications": [],
      "enteringMetadata": {
        "accountCreatedAt": "2023-08-15T10:05:21.736Z",
        "loginsDate": [

        ]
      },
      "settings": {
        "theme": "dark-mode",
        "stayLoggedIn": false
      },
      "socialMedias": {
        "facebook": null,
        "twitter": null,
        "instagram": null,
        "youtube": null,
        "telegram": null
      }
    },
  ];

export let polls: Poll[] =
  pullLocalStorage(LSKey_PollsArr).data as Poll[]
  ??
  [
    {
      id: 1,
      title: `What's the best gaming laptop brand?`,
      pollCategories:
        [
          {
            name: 'Company',
            color: '--green800'
          },
        ],
      ownerId: 1,
      pollChoices:
        [
          {
            id: 1,
            name: 'Lenovo',
            choosedBy: []
          },
          {
            id: 2,
            name: 'Acer',
            choosedBy: []
          },
          {
            id: 3,
            name: 'Asus',
            choosedBy: []
          },
          {
            id: 4,
            name: 'HP',
            choosedBy: []
          },
          {
            id: 5,
            name: 'MSI',
            choosedBy: []
          }
        ],
      creationDate: '2023-08-23T08:21:23.153Z',
      openUntil: null,
      closed: false
    },
  ];
