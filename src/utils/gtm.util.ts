import { getLocalStorage, localStorageKeys } from "@src/utils/local-storage.util";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-TT5MMKN",
};

export const handleGtmInit = (): void => {
  const userRejectedCookies = getLocalStorage<boolean | null>(localStorageKeys.cookiesDisabled, null);
  if (userRejectedCookies !== null && !userRejectedCookies) {
    TagManager.initialize(tagManagerArgs);
  }
};

export const handleGtmInitGtag = (): void => {
  const userRejectedCookies = getLocalStorage<boolean | null>(localStorageKeys.cookiesDisabled, null);
  if (userRejectedCookies !== null && !userRejectedCookies) {
    // Update dynamically the consents to true
    window.gtag("consent", "update", {
      /* eslint-disable @typescript-eslint/naming-convention */
      ad_storage: "granted",
      analytics_storage: "granted",
      /* eslint-enable @typescript-eslint/naming-convention */
    });
  }
};
