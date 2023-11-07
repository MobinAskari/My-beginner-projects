export const urlSetter = (pathName: string) => {
  window.history.pushState({}, document.title, pathName);
}
