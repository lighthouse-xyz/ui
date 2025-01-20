import packageJson from "../package.json";
import { allHosts } from "./hosts";
import type { ManifestType } from "./manifest-type";
import { getApiUrlBasedOnEnv, getEnv, getEnvBasedOnConfigValues } from "./utils/env";

function getIcons(): chrome.runtime.ManifestIcons {
  const env = getEnv();
  const isDevOrLocalBuild = env === "dev" || env === "local";

  if (isDevOrLocalBuild) {
    return {
      "16": "icon-16-local.png",
      "48": "icon-48-local.png",
      "128": "icon-128-local.png",
    };
  } else {
    return {
      "16": "icon-16.png",
      "48": "icon-48.png",
      "128": "icon-128.png",
    };
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
const manifest: ManifestType = {
  manifest_version: 3,
  name: "Lighthouse.world",
  version: packageJson.version,
  description: "Join your friends in the metaverse by sharing your location with them.",
  background: { service_worker: "src/pages/background/index.js", type: "module" },
  action: {
    default_popup: "src/index.html",
    default_icon: getIcons()["128"],
  },
  icons: getIcons(),
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "icon-128.png", "icon-48.png", "icon-16.png"],
      matches: ["*://*/*"],
    },
  ],
  host_permissions: [
    `${getEnvBasedOnConfigValues()}/*/*`,
    `${getApiUrlBasedOnEnv()}/*/*`,
    ...allHosts.map(host => `${host.url.toString()}/*/*`),
    "http://localhost:3000/*",
  ],
  permissions: ["activeTab", "alarms", "cookies", "scripting", "storage", "tabs"],
};
/* eslint-enable @typescript-eslint/naming-convention */

export default manifest;
