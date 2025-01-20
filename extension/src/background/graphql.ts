import { LocalStorageState } from "@extension/background/state/storage";
import { getApiUrlBasedOnEnv } from "@extension/utils/env";

interface GraphQLReturn<TResult> {
  data: TResult;
  errors?: Array<{ message: string }>;
}

export async function callWithExtensionToken<TResult = unknown>(
  operationName: string,
  query: string,
  variables: Record<string, unknown>,
): Promise<GraphQLReturn<TResult>> {
  const token = await LocalStorageState.getToken();

  if (!token) {
    throw new Error("No token was found to query");
  }

  const result = await fetch(`${getApiUrlBasedOnEnv()}/user/graphql`, {
    method: "POST",
    headers: {
      "Lighthouse-Extension-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName,
      variables,
      query,
    }),
  });

  const resultParsed = (await result.json()) as GraphQLReturn<TResult>;
  const errors = resultParsed.errors;

  if (errors) {
    const hasUnauthorizedError = errors.some(error => error.message === "Unauthorized");
    if (hasUnauthorizedError) {
      console.error("The token cannot track the user location, resetting it", errors);
      await LocalStorageState.setToken(null);
    } else {
      console.error("There were errors when sending the URL.", errors);
    }
  }

  return resultParsed;
}

export async function callWithPrivyToken<TResult = unknown>(
  operationName: string,
  query: string,
  variables: Record<string, unknown>,
  token: string,
): Promise<GraphQLReturn<TResult>> {
  const result = await fetch(`${getApiUrlBasedOnEnv()}/user/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName,
      variables,
      query,
    }),
  });
  return (await result.json()) as Promise<GraphQLReturn<TResult>>;
}
