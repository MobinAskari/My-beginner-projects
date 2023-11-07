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
  email: string,
  emailVisibility: boolean,
  created_polls_ids: string[],
  voted_polls: Vote[],
  notifications: [],
  settings: Settings,
  social_medias: SocialMedias,
  metadata: UserMetadata,
}

export interface UserAPIResponse extends BaseUser {
  id: string,
  collectionId: string,
  collectionName: string,
  verified: boolean,
  profile_picture: string,
  created: string,
  updated: string,
}

export interface UserCreatePayload extends BaseUser {
  password: string,
  passwordConfirm: string,
}