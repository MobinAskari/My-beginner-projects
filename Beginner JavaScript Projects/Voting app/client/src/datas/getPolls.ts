import type { RecordListOptions } from "pocketbase";
import database from "../server/db"

export default async function getPolls(
  page: number,
  perPage: number,
  rules?: RecordListOptions
) {
  const unhealthyAPIError = {
    status: false,
    data: [],
    message: 'There was a problem with fetching data from the databse'
  };
  const badArgsError = {
    status: false,
    data: [],
    message: 'The provided arguments are not valid'
  }

  try {
    const result = await database
      .collection("polls")
      .getList(page, perPage, rules);

    if (result)
      return {
        status: true,
        data: result.items,
        message: ''
      };

    else return badArgsError
  } catch (error) {
    const isAPIHealthy = await database.health.check();

    if (isAPIHealthy.code === 200) {
      return badArgsError
    }
    return unhealthyAPIError
  }

}