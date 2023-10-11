import database from "../server/db"

export default async function getPolls(
  page: number,
  perPage: number,
  rule?: { sort?: string } | { filter?: string }
) {
  const isAPIHealthy = await database.health.check();
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
      .getList(page, perPage, rule);

    if (result)
      return {
        status: true,
        data: result.items,
        message: ''
      };

    if (!isAPIHealthy) return unhealthyAPIError
    return badArgsError

  } catch (error) {
    if (!isAPIHealthy) return unhealthyAPIError
    return badArgsError
  }

}