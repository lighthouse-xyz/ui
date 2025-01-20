import { ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "@privy-io/react-auth";
import { MixpanelCookie } from "@src/common/interfaces/mixpanel-cookie.interface";
import { getMixpanelProjectToken } from "@src/context/analytics/mixpanel-context-provider";
import { getLocalStorage, localStorageKeys } from "@src/utils/local-storage.util";
import { getCookie } from "cookies-next";

const setTokenInContext = setContext(async () => {
  let authToken;
  if (getLocalStorage<string | undefined>(localStorageKeys.isCypressContext, undefined)) {
    authToken = getLocalStorage<string | undefined>(localStorageKeys.token, undefined);
  } else {
    authToken = await getAccessToken();
  }

  return { authToken };
});

const graphQlAuthLink = new ApolloLink((operation, forward) => {
  const mixpanelToken = getMixpanelProjectToken();
  const mixpanelCookie = `mp_${mixpanelToken}_mixpanel`;
  const cookieString = getCookie(mixpanelCookie)?.toString();
  const cookie = cookieString ? (JSON.parse(cookieString) as MixpanelCookie) : undefined;
  const { authToken } = operation.getContext();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(authToken ? { authorization: `Bearer ${authToken as string}` } : {}),
      ...(window ? { "Lighthouse-Location": window.location.href } : {}),
      ...{ "Lighthouse-Distinct-Id": cookie?.distinct_id },
      ...{ "Lighthouse-Referrer": cookie?.$initial_referrer },
    },
  }));

  return forward(operation);
});

export { graphQlAuthLink, setTokenInContext };
