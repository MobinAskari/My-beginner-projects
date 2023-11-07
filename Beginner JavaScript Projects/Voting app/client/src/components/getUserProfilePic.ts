import database from "../server/db";
import type { UserAPIResponse } from "../types/user.types";

export const getUserPfpImg = async () => {
  const user = database.authStore?.model as UserAPIResponse;
  const svgModel = `
    <svg width="1.75rem" height="1.75rem">
      <use href="/icons.svg#icon_userNoPfp">
    </svg>
  `;

  if (!user || user.profile_picture === '') return svgModel;
  await database.collection('users').authRefresh();

  return `<img src="${database.files.getUrl(user, user.profile_picture)}" alt="user profile picture">`
}