import { NextLink, Operation } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "@privy-io/react-auth";
import * as Sentry from "@sentry/react";
import { ClientName } from "@src/common/enums/client-name.enum";
import { localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";
import { GraphQLErrorExtensions } from "graphql/error";

const notFoundCode = 404;
const ignoreCodes = [notFoundCode, "USER_HANDLE_ALREADY_TAKEN", "FILE_CONTENT_NSFW", "BOT_DETECTED"];
const ignoreMessages = [
  "Unauthorized",
  "Bad Request",
  "Bad Request Exception",
  "Not Found",
  "Forbidden resource",
  "input.'url' must be the url of a location in a supported world.",
  'Variable "$chapter" got invalid value',
  "input.email must be an email",
];

const renewTokenIfRequired = (operation: Operation, message: string, forward: NextLink): void => {
  const errorCouldBeFixedByNewToken = message === "Unauthorized" || message === "Forbidden resource";
  if (!errorCouldBeFixedByNewToken) {
    forward(operation);
  }

  operation.setContext(async ({ headers: oldHeaders = {} }) => {
    const authToken = await getAccessToken();

    if (authToken === null) {
      // Meaning refresh token expired or token was cleared from local storage
      setLocalStorage<boolean>(localStorageKeys.unauthorized, true);
      window.dispatchEvent(new Event("local-storage"));
    }

    return {
      headers: {
        ...oldHeaders,
        ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
      },
    };
  });
};

const sendErrorToSentry = (operation: Operation, message: string, extensions: GraphQLErrorExtensions): void => {
  const tags = {
    fromUrl: window.location.pathname,
    clientName: (operation.getContext().clientName ?? ClientName.discovery) as string,
    queryName: operation.operationName,
    variables: JSON.stringify(operation.variables),
  };

  const tagsMaxLength = 199;
  const variablesDetails = tags.variables.length > tagsMaxLength ? `, Variables: ${tags.variables}` : "";
  Sentry.captureMessage(
    `[GraphQL error]: Message: ${message}, Code: ${extensions?.code as string}, Details: ${JSON.stringify(
      extensions?.response,
    )}${variablesDetails}`,
    { tags },
  );
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) {
    return;
  }

  graphQLErrors.forEach(({ message, extensions }) => {
    const shouldIgnoreErrorForSentry =
      ignoreMessages.includes(message) || ignoreCodes.includes(extensions?.code as string | number);

    if (shouldIgnoreErrorForSentry) {
      renewTokenIfRequired(operation, message, forward);
    } else {
      sendErrorToSentry(operation, message, extensions);
    }
  });
});

export default errorLink;
