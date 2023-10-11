import { show404Page } from "../components/404page.ts";
import { routes } from "./routes.ts";

export const urlParser = () => {
  const url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);

  for (const val in routes) {
    const route = routes[val];

    const requiredArgument = route.requiredArgument ?? null;
    if (route.path === url.pathname && !requiredArgument) return route.functionForDisplaying()();

    if (requiredArgument) {
      let arg: string | number | null = urlParams.get(requiredArgument.param);

      if (!arg) return show404Page();

      requiredArgument
        .requiredParamType === 'number'
        ? arg = parseFloat(arg) : '';

      return route.functionForDisplaying()(arg);
    }

  }
}