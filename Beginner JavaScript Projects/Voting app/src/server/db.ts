import PocketBase from 'pocketbase';
export const dbUrl = 'http://127.0.0.1';
export const dbPort = 8090;
const database = new PocketBase(`${dbUrl}:${dbPort}`);
database.autoCancellation(false);

export default database;