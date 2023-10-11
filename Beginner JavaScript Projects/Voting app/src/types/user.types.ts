export type Vote = {
  poll_id: string,
  poll_choice_id: string,
  date: string
}

type SocialMedias = {
  facebook: string | null,
  twitter: string | null,
  instagram: string | null,
  youtube: string | null,
  telegram: string | null /* e.g. https://t.me/user or null for not specified */
}

type Settings = {
  theme: string, /** e.g. darkMode or lightMode */
  stayLoggedIn: boolean /** e.g. true or false */
}

type UserMetadata = {
  birthDate: string,
  gender: string,
  bio: string
}

interface BaseUser {
  username: string,
  emailVisibility: boolean,
  created_polls_ids: string[],
  voted_polls: Vote[],
  notifications: [],
  settings: Settings,
  social_medias: SocialMedias,
  user_metadata: UserMetadata,
}

export interface UserAPIResponse extends BaseUser {
  id: string,
  collectionId: string,
  collectionName: string,
  email?: string,
  verified: boolean,
  profile_picture: string,
  created: string, /* the date which this record was initially created */
  updated: string, /* the date which this record was updated */
}

export interface UserCreatePayload extends BaseUser {
  password: string,
  passwordConfirm: string,
  email: string,
}