import { exchangePrivyTokenForExtensionToken } from "@extension/background/auth/exchange-privy-token";
import { stealPrivyTokenFromLighthouseLocalStorage } from "@extension/background/auth/steal-privy-token";
import { lighthouseTracking } from "@extension/background/state/in-memory-state";
import { LocalStorageState } from "@extension/background/state/storage";

export async function stealLighthouseToken(): Promise<void> {
  console.log("Executing stealing function.");

  const lighthouseTabId = lighthouseTracking.getTrackedTabId();

  if (!lighthouseTabId) {
    return;
  }

  console.log(`Stealing from tab id ${lighthouseTabId}.`);

  const token = await stealPrivyTokenFromLighthouseLocalStorage(lighthouseTabId);

  await exchangePrivyTokenForExtensionToken(token);
}

function stealLighthouseTokenIfMissing(): void {
  LocalStorageState.getToken()
    .then(existingToken => {
      LocalStorageState.getUserId()
        .then(async existingUserId => {
          if (!!existingToken && !!existingUserId) {
            console.log("Already have a token, skipping.");
            return;
          }

          await stealLighthouseToken();
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

export function setupStealingCron(): void {
  const twoSeconds = 2000;

  setInterval(stealLighthouseTokenIfMissing, twoSeconds);
}
