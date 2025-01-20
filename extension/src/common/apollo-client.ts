import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { LocalStorageState } from "@extension/background/state/storage";

let userUrl: string;

switch (process.env.REACT_APP_ENV) {
  case "dev":
    userUrl = "https://api.dev.lighthouse.world/user/graphql";
    break;
  case "local":
    userUrl = "http://localhost:3003/graphql";
    break;
  default:
    userUrl = "https://api.lighthouse.world/user/graphql";
    break;
}

const userLink = new HttpLink({
  credentials: "include",
  uri: userUrl,
});

const retryLink = new RetryLink({
  attempts: {
    max: 3,
  },
  delay: {
    initial: 300,
    max: 1000,
    jitter: true,
  },
});

const authLink = setContext(async (req, { headers }) => {
  const token = await LocalStorageState.getToken();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      ...(token ? { "Lighthouse-Extension-Token": token } : {}),
    },
  };
});

const client = new ApolloClient({
  link: from([retryLink, authLink.concat(userLink)]),
  cache: new InMemoryCache(),
});

export default client;
