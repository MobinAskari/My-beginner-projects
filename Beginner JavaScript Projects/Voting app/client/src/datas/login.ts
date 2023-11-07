import database from "../server/db";

export default async function loginUser(
  identifier: string,
  password: string,
  stayLoggedIn: boolean
) {
  try {
    if (password.length < 5) return { status: false, message: 'The provided password must be 5 characters at minimum' }

    const result = await database.collection('users').authWithPassword(identifier, password);

    if (result) return { status: true, message: 'Welcome back!' };

    return { status: false, message: 'There was a problem with logging you in, please try again later' }
  } catch (error) {
    const isAPIHealthy = await database.health.check();

    if (isAPIHealthy.code === 200) return { status: false, message: 'The provided identifier or password is incorrect' };

    return { status: false, message: 'There was a problem with logging you in, please try again later' };
  }
}