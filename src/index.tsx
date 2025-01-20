import React from "react";
import { createRoot } from "react-dom/client";

import "./common/styles/index.css";
import App from "./app";
import ColorModeContextProvider from "./context/color-mode/color-mode-context-provider";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Integration } from "@sentry/types";
import { handleGtmInitGtag } from "@src/utils/gtm.util";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

handleGtmInitGtag();

Sentry.init({
  dsn: "https://9e95e22472d14c8198675800b7e1e6e1@o1201882.ingest.sentry.io/4504118969827328",
  environment: process.env.REACT_APP_ENV === "prod" ? "production" : "development",
  integrations: [new BrowserTracing() as Integration],
  tracesSampleRate: 1.0,
  denyUrls: [/^chrome-extension:\/\/(?!omfhmndankeljoklabieongamiakdlbe).*/],
  release: process.env.REACT_APP_GITHUB_SHA,
});

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <ColorModeContextProvider>
      <App />
    </ColorModeContextProvider>
  </React.StrictMode>,
);
