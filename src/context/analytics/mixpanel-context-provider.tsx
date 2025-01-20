import React from "react";

import { MixpanelContext } from "./mixpanel-context";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";
import { getLocalStorage, localStorageKeys } from "@src/utils/local-storage.util";
import mixpanel from "mixpanel-browser";

export const getMixpanelProjectToken = (): string => {
  switch (process.env.REACT_APP_ENV) {
    case "local":
      return "";
    case "dev":
      return "90ed54272d29a621674a8e37cda99019";
    default:
      return "f296a7544950eecdd6cce4a9b89a0b84";
  }
};

const MixpanelContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const projectToken = getMixpanelProjectToken();
  const debug = process.env.REACT_APP_ENV === "local" || process.env.REACT_APP_ENV === "dev";

  const userRejectedCookies = getLocalStorage<boolean | null>(localStorageKeys.cookiesDisabled, null);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const instance = mixpanel.init(projectToken, { debug, disable_persistence: userRejectedCookies !== false }, "Portal");

  const contextValue = {
    mixpanel: instance,
  };

  return <MixpanelContext.Provider value={contextValue}>{children}</MixpanelContext.Provider>;
};

export default MixpanelContextProvider;
