import { ColorMode } from "@src/common/enums/color-mode.enum";
import { createContext, useContext } from "react";

interface ColorModeContextInterface {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextInterface>({
  colorMode: ColorMode.light,
  setColorMode: (_colorMode: ColorMode) => {
    return;
  },
});

const useColorModeContext = (): ColorModeContextInterface => useContext<ColorModeContextInterface>(ColorModeContext);

export { ColorModeContext, useColorModeContext };
