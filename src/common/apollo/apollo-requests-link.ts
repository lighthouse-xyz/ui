import { ApolloLink, HttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getAccessToken } from "@privy-io/react-auth";
import { graphQlAuthLink } from "@src/common/apollo/apollo-auth-links";
import { ClientName } from "@src/common/enums/client-name.enum";
import { RestLink } from "apollo-link-rest";
import { createUploadLink } from "apollo-upload-client";
import { createClient } from "graphql-ws";

let discoveryUrl: string;
let userUrl: string;
let wsUrl: string;

switch (process.env.REACT_APP_ENV) {
  case "dev":
    discoveryUrl = "https://api.dev.lighthouse.world/discovery/graphql";
    userUrl = "https://api.dev.lighthouse.world/user/graphql";
    wsUrl = "wss://api.dev.lighthouse.world/user/graphql";
    break;
  case "local":
    discoveryUrl = "http://localhost:3002/graphql";
    userUrl = "http://localhost:3003/graphql";
    wsUrl = "ws://localhost:3003/graphql";
    break;
  default:
    discoveryUrl = "https://api.lighthouse.world/discovery/graphql";
    userUrl = "https://api.lighthouse.world/user/graphql";
    wsUrl = "wss://api.lighthouse.world/user/graphql";
    break;
}

const openSeaRestLink = new RestLink({ uri: "https://api.opensea.io" });

const discoveryLink = new HttpLink({
  credentials: "include",
  uri: discoveryUrl,
});

const userLink = new HttpLink({
  credentials: "include",
  uri: userUrl,
});

const webSocketRequestsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
    connectionParams: async () => {
      const token = await getAccessToken();
      return {
        token,
      };
    },
  }),
);

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

const lighthouseGraphQlLink = graphQlAuthLink.concat(
  ApolloLink.split(
    operation => operation.getContext().clientName === ClientName.user,
    ApolloLink.split(
      operation => !operation.getContext().isUpload,
      userLink,
      createUploadLink({
        credentials: "include",
        uri: userUrl,
      }),
    ),
    ApolloLink.split(
      operation => !operation.getContext().isUpload,
      discoveryLink,
      createUploadLink({
        credentials: "include",
        uri: discoveryUrl,
      }),
    ),
  ),
);

const httpRequestsLink = ApolloLink.split(
  operation => operation.getContext().clientName === ClientName.opensea,
  openSeaRestLink,
  lighthouseGraphQlLink,
);

export { httpRequestsLink, retryLink, webSocketRequestsLink };
