import { routes } from "./routes.ts";

export const urlParser = () => {
  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);

  let pathParsingAndShowingResult = Object.values(routes).some(route => {
    if (route.path !== url.pathname) return false;

    const requiredArgument = route.requiredArgument ?? null;

    if (requiredArgument) {
      let arg: string | number | null = urlParams.get(requiredArgument.param);

      if (!arg) return false;

      requiredArgument
        .requiredParamType === 'number'
        ? arg = parseFloat(arg) : '';

      route.functionForDisplaying()(arg);
      return true;
    }

    route.functionForDisplaying()();
    return true;
  });

  return pathParsingAndShowingResult;
}