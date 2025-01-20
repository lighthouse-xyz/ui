import React, { useEffect, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import "./locales/i18n";
import client from "./common/apollo/apollo-client";
import { ColorMode } from "./common/enums/color-mode.enum";
import { getTheme } from "./common/styles/theme";
import MixpanelContextProvider from "./context/analytics/mixpanel-context-provider";
import AuthContextProvider from "./context/auth/auth-context-provider";
import { useColorModeContext } from "./context/color-mode/color-mode-context";
import PageMetadataContextProvider from "./context/page-metadata/page-metadata-context-provider";
import StreamContextProvider from "./context/stream/stream-context-provider";
import UserStateContextProvider from "./context/user-state/user-state-context-provider";
import VrContextProvider from "./context/vr/vr-context-provider";
import Router from "./router/router";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { PrivyProvider } from "@privy-io/react-auth";
import { withLDProvider } from "launchdarkly-react-client-sdk";
import { SnackbarProvider } from "notistack";

const privyAppId = process.env.REACT_APP_ENV === "prod" ? "clahgnbzy0002l708oke522zj" : "cla05q1hb0009jv08kzrl3zyg";

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { colorMode } = useColorModeContext();

  const getPaletteMode = (mode: ColorMode): PaletteMode => {
    switch (mode) {
      case ColorMode.system:
        return prefersDarkMode ? "dark" : "light";
      case ColorMode.dark:
        return "dark";
      default:
        return "light";
    }
  };

  const [paletteMode, setPaletteMode] = useState(getPaletteMode(colorMode));

  useEffect(() => {
    setPaletteMode(getPaletteMode(colorMode));
  }, [colorMode, prefersDarkMode]);

  const theme = useMemo(() => getTheme(paletteMode), [paletteMode]);

  const [justLoggedIn, setJustLoggedIn] = useState<boolean>(false);

  const handleOnSuccess = (): void => {
    setJustLoggedIn(true);
  };

  const resetJustLoggedIn = (): void => {
    setJustLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <HelmetProvider>
          <PrivyProvider appId={privyAppId} onSuccess={handleOnSuccess}>
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={5000}
              resumeHideDuration={500}
              style={{ boxShadow: "none", backgroundColor: "transparent" }}>
              <ApolloProvider client={client}>
                <MixpanelContextProvider>
                  <PageMetadataContextProvider>
                    <VrContextProvider>
                      <AuthContextProvider justLoggedIn={justLoggedIn} resetJustLoggedIn={resetJustLoggedIn}>
                        <DndProvider backend={HTML5Backend}>
                          <UserStateContextProvider>
                            <StreamContextProvider>
                              <Router />
                            </StreamContextProvider>
                          </UserStateContextProvider>
                        </DndProvider>
                      </AuthContextProvider>
                    </VrContextProvider>
                  </PageMetadataContextProvider>
                </MixpanelContextProvider>
              </ApolloProvider>
            </SnackbarProvider>
          </PrivyProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default withLDProvider({
  clientSideID: process.env.REACT_APP_ENV === "prod" ? "6399f4d76b4c810d744d743d" : "6399f4d76b4c810d744d743c",
  context: { key: "anonymous" },
  options: { streaming: false },
})(App);
