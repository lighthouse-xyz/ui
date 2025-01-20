import React, { useEffect, useMemo, useState } from "react";

import { VrContext } from "./vr-context";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";

const VrContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const vrSubdomain = process.env.REACT_APP_ENV === "prod" ? "vr.lighthouse.world" : "vr-dev.lighthouse.world";
  const subdomain = process.env.REACT_APP_ENV === "prod" ? "lighthouse.world" : "dev.lighthouse.world";

  const [vrMode, setVrMode] = useState(window.location.host === vrSubdomain);
  const [vrDetected, setVrDetected] = useState(false);

  if ("xr" in navigator) {
    navigator.xr
      ?.isSessionSupported("immersive-vr")
      .then((supported: boolean) => {
        if (supported) setVrDetected(true);
      })
      .catch(_ => undefined);
  }

  useEffect(() => {
    setVrMode(window.location.host === vrSubdomain);
  }, [window.location.host]);

  useEffect(() => {
    if (vrMode && window.location.host !== vrSubdomain) {
      window.location.href = `https://${vrSubdomain}`;
    } else if (!vrMode && window.location.host === vrSubdomain) {
      window.location.href = `https://${subdomain}`;
    }
  }, [vrMode]);

  const vrContextValue = useMemo(() => ({ vrMode, setVrMode, vrDetected }), [vrMode, setVrMode, vrDetected]);

  return <VrContext.Provider value={vrContextValue}>{children}</VrContext.Provider>;
};

export default VrContextProvider;
