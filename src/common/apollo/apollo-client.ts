import { ApolloClient, ApolloLink, defaultDataIdFromObject, from, InMemoryCache, TypePolicy } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setTokenInContext } from "@src/common/apollo/apollo-auth-links";
import captchaLink from "@src/common/apollo/apollo-captcha-link";
import errorLink from "@src/common/apollo/apollo-error-link";
import { httpRequestsLink, retryLink, webSocketRequestsLink } from "@src/common/apollo/apollo-requests-link";

import { getImageOrFallback, getUserImageOrFallback } from "../../utils/image-fallbacks.util";
import { EntityType, GenericEntity } from "../graphql/generated/discovery.schema.graphql";
import { AkuQuest, Profile } from "../graphql/generated/user.schema.graphql";
import { defaultName } from "../interfaces/entity.type";

export const originHeader = "Lighthouse-Origin";

const mapGenericToMergedEntityFields: TypePolicy = {
  fields: {
    name: {
      read(name: string) {
        return name ?? defaultName;
      },
    },
    nextStartAt: {
      read(nextStartAt: string) {
        return nextStartAt ? new Date(nextStartAt) : undefined;
      },
    },
    nextFinishAt: {
      read(nextFinishAt: string) {
        return nextFinishAt ? new Date(nextFinishAt) : undefined;
      },
    },
    image: {
      read(image: string, { readField }) {
        const type = readField("type") as EntityType;
        const entityId = readField("entityId") as string;
        return getImageOrFallback(image, type, entityId);
      },
    },
  },
};

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      case "Member":
      case "Estate":
      case "Parcel":
      case "Event":
        return `${(responseObject as GenericEntity).entityId}`;
      case "Profile":
        return `profile_${(responseObject as Profile).userId}`;
      case "AkuQuest":
        return `aku_quest_${(responseObject as AkuQuest).questId}`;
      default:
        return defaultDataIdFromObject(responseObject);
    }
  },
  typePolicies: {
    Estate: mapGenericToMergedEntityFields,
    Event: mapGenericToMergedEntityFields,
    Member: mapGenericToMergedEntityFields,
    Parcel: mapGenericToMergedEntityFields,
    Profile: {
      fields: {
        picture: {
          read(pictureUrl: string, { readField }) {
            const userId = readField("userId") as string;
            return getUserImageOrFallback(userId, pictureUrl);
          },
        },
      },
    },
    JumpLog: {
      fields: {
        lastJumpDate: {
          read(lastJumpDate: string) {
            return lastJumpDate ? new Date(lastJumpDate) : undefined;
          },
        },
      },
    },
    Status: {
      fields: {
        customStatusExpiresAt: {
          read(customStatusExpiresAt: string) {
            return customStatusExpiresAt ? new Date(customStatusExpiresAt) : undefined;
          },
        },
      },
    },
    Query: {
      fields: {
        friends: {
          keyArgs: ["userId", "first", "sortBy"],
        },
      },
    },
  },
});

const apolloLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  webSocketRequestsLink,
  httpRequestsLink,
);

const client = new ApolloClient({
  link: from([retryLink, errorLink, captchaLink, setTokenInContext, apolloLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
