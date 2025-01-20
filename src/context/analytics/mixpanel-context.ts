import { Mixpanel } from "mixpanel-browser";
import React, { useContext } from "react";

interface MixpanelContextInterface {
  mixpanel?: Mixpanel;
}

const MixpanelContext = React.createContext<MixpanelContextInterface>({
  mixpanel: undefined,
});

const useMixpanelContext = (): MixpanelContextInterface => useContext<MixpanelContextInterface>(MixpanelContext);

export { MixpanelContext, useMixpanelContext };
