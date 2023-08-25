type pollCategory = {
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

export type Poll = {
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
  notifications: [],
  userMetadata: UserMetadata,
  enteringMetadata: EnteringMetadata,
  settings: Settings,
  socialMedias: SocialMedias
}

/*

  {
    id,
    title,
    pollCategories,
    owner,
    options: [
      {
        id: auto-gen
        name: '',
        choosedBy: [IDs]
      }
    ]
    (options counts),
    (voters count),
    date added,
    end time of the poll ?,
    closed ?
  }

*/

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
      "voted": [
        {
          pollId: 3,
          pollChoiceId: 1,
          date: 's'
        },
      ],
      "notifications": [],
      "enteringMetadata": {
          "accountCreatedAt": "2023-08-15T10:05:21.736Z",
          "loginsDate": [
            
          ]
      },
      "settings": {
          "theme": "darkMode",
          "stayLoggedIn": false
      },
      "socialMedias": {
          "facebook": null,
          "twitter": null,
          "instagram": null,
          "youtube": null,
          "telegram": null
      }
    }
  ];

export let polls: Poll[] =
  pullLocalStorage(LSKey_PollsArr).data as Poll[] 
    ??
  [
    {
      id: 1,
      title: 'A question?',
      pollCategories:
        [
          {
            name: 'Company',
            color: 'violet'
          }
        ],
      ownerId: 1,
      pollChoices: 
        [
          {
            id: 1,
            name: 'Apple',
            choosedBy: []
          },
          {
            id: 2,
            name: 'Microsoft',
            choosedBy: []
          },
        ],
      creationDate: '2023-08-23T08:21:23.153Z',
      openUntil: null,
      closed: false
    },
    {
      id: 2,
      title: 'A question2?',
      pollCategories:
        [
          {
            name: 'Fun',
            color: 'green'
          }
        ],
      ownerId: 1,
      pollChoices: 
        [
          {
            id: 1,
            name: 'Apple2',
            choosedBy: []
          },
          {
            id: 2,
            name: 'Microsoft2',
            choosedBy: []
          },
        ],
      creationDate: '2023-08-23T08:21:23.153Z',
      openUntil: null,
      closed: false
    },
    {
      id: 3,
      title: 'A question3?',
      pollCategories:
        [
          {
            name: 'Company',
            color: 'orange'
          }
        ],
      ownerId: 1,
      pollChoices: 
        [
          {
            id: 1,
            name: 'Apple2',
            choosedBy: [
              {userId:1 , date: 's'},
              {userId:2 , date: 's'},
              {userId:3 , date: 's'},
              {userId:88 , date: 's'},
              {userId:95 , date: 's'}, 
            ]
          },
          {
            id: 2,
            name: 'Microsoft2',
            choosedBy: [
              {userId:4 , date: 's'},
              {userId:5 , date: 's'},
              {userId:6 , date: 's'}, 
              {userId:7 , date: 's'},
              {userId:8 , date: 's'},
              {userId:9 , date: 's'}, 
            ]
          },
          {
            id: 3,
            name: 'Facebook3',
            choosedBy: [
              {userId:10 , date: 's'},
              {userId:11 , date: 's'},
              {userId:12 , date: 's'}, 
              {userId:13 , date: 's'},
              {userId:14 , date: 's'},
              {userId:15 , date: 's'},
              {userId:16 , date: 's'},
              {userId:17 , date: 's'},
              {userId:18 , date: 's'},
            ]
          },
          {
            id: 4,
            name: 'Google4',
            choosedBy: [
              {userId:10 , date: 's'},
              {userId:11 , date: 's'},
              {userId:12 , date: 's'}, 
              {userId:13 , date: 's'},
              {userId:14 , date: 's'},
              {userId:15 , date: 's'},
              {userId:16 , date: 's'},
              {userId:17 , date: 's'},
              {userId:18 , date: 's'},
              {userId:11 , date: 's'},
              {userId:12 , date: 's'}, 
              {userId:13 , date: 's'},
              {userId:14 , date: 's'},
              {userId:15 , date: 's'},
              {userId:16 , date: 's'},
              {userId:17 , date: 's'},
              {userId:18 , date: 's'},
            ]
          }
        ],
      creationDate: '2023-08-23T08:21:23.153Z',
      openUntil: null,
      closed: false
    }
  ];
/* 
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
    "profilePicture": "",
    "polls": [],
    "voted": [],
    "notifications": [],
    "enteringMetadata": {
        "accountCreatedAt": "2023-08-15T10:05:21.736Z",
        "loginsDate": [
            "2023-08-15T10:05:45.599Z",
            "2023-08-15T10:08:28.127Z",
            "2023-08-15T11:14:15.662Z",
            "2023-08-19T05:18:57.160Z",
            "2023-08-19T05:24:56.039Z",
            "2023-08-19T11:34:17.174Z",
            "2023-08-20T10:59:19.241Z",
            "2023-08-20T11:00:06.545Z",
            "2023-08-20T11:01:32.897Z"
        ]
    },
    "settings": {
        "theme": "darkMode",
        "stayLoggedIn": false
    },
    "socialMedias": {
        "facebook": null,
        "twitter": null,
        "instagram": null,
        "youtube": null,
        "telegram": null
    }
  }

*/

