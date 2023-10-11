export const setCookie = (name: string, value: any, days: number) => {
  let expires = "";
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (JSON.stringify(value)) + expires + "; path=/";
}