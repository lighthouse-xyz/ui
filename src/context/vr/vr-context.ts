import { createContext, useContext } from "react";

interface VrContextInterface {
  vrMode: boolean;
  setVrMode: (vrMode: boolean) => void;
  vrDetected: boolean;
}

const VrContext = createContext<VrContextInterface>({
  vrMode: false,
  setVrMode: (_vrMode: boolean) => {
    return;
  },
  vrDetected: false,
});

const useVrContext = (): VrContextInterface => useContext<VrContextInterface>(VrContext);

export { useVrContext, VrContext };
