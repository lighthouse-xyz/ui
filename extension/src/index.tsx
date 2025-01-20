import React from "react";
import { createRoot } from "react-dom/client";

import "@src/locales/i18n";
import "@src/common/styles/index.css";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "@extension/common/apollo-client";
import Popup from "@extension/components/popup/popup.component";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "@src/common/styles/theme";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/popup");

function init(): void {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }

  const root = createRoot(appContainer);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={getTheme("light")}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Popup />
        </ApolloProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
}

init();
