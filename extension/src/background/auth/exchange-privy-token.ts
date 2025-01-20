import { isUserAllowsSharingLocation } from "@extension/background/state/sharing-config";
import { LocalStorageState } from "@extension/background/state/storage";

import { callWithPrivyToken } from "../graphql";

interface ExtensionToken {
  token: string;
  userId: string;
}

interface GenerateExtensionToken {
  generateExtensionToken: ExtensionToken;
}

async function getApiExtensionToken(privyToken: string): Promise<ExtensionToken | undefined> {
  const generateExtensionToken = `
  mutation GenerateExtensionToken {
    generateExtensionToken {
      token
      userId
    }
  }`;

  try {
    const { data, errors } = await callWithPrivyToken<GenerateExtensionToken>(
      "GenerateExtensionToken",
      generateExtensionToken,
      {},
      privyToken,
    );

    if (errors) {
      console.error("There were errors when retrieving the extension token", errors);
      await LocalStorageState.setToken(null);
    }

    return { token: data.generateExtensionToken.token, userId: data.generateExtensionToken.userId };
  } catch (error) {
    console.error("There were errors when retrieving the extension token", error);
    await LocalStorageState.setToken(null);
  }
  return undefined;
}

export async function exchangePrivyTokenForExtensionToken(token: string | undefined): Promise<void> {
  if (!token) {
    return;
  }

  const data = await getApiExtensionToken(token);
  if (data) {
    await LocalStorageState.setToken(data.token);
    await LocalStorageState.setUserId(data.userId);
    await LocalStorageState.setIsTracking(await isUserAllowsSharingLocation());
    console.log("Exchanged token for extension token.");
  }
}
