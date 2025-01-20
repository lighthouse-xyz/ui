import { allHosts } from "@extension/hosts";
import { getEnvBasedOnConfigValues } from "@extension/utils/env";

export function isLighthouseWebsite(url: string): boolean {
  return url.startsWith(getEnvBasedOnConfigValues());
}

export function isTrackableUrl(url: string): boolean {
  let urlObject: URL;
  try {
    urlObject = new URL(url);
  } catch {
    return false;
  }

  return allHosts.some(host => urlObject.host === host.url.host);
}
