import React, { useEffect, useMemo, useState } from "react";

import { ColorModeContext } from "./color-mode-context";
import { ColorMode } from "@src/common/enums/color-mode.enum";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";

const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState(() => getLocalStorage<ColorMode>(localStorageKeys.colorMode, ColorMode.system));

  useEffect(() => setLocalStorage<ColorMode>(localStorageKeys.colorMode, mode), [mode]);

  const colorModeContextValue = useMemo(() => ({ colorMode: mode, setColorMode: setMode }), [mode, setMode]);

  return <ColorModeContext.Provider value={colorModeContextValue}>{children}</ColorModeContext.Provider>;
};

export default ColorModeContextProvider;
