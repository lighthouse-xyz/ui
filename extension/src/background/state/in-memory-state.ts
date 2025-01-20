import { isLighthouseWebsite, isTrackableUrl } from "@extension/background/url";

interface Tab {
  id: number;
  url: string;
}

interface ExtensionState {
  isTracking: boolean;
  lighthouseTrackedTabId: number | undefined;
  metaverseTrackedTab: Tab | undefined;
}

const state: ExtensionState = {
  isTracking: false,
  lighthouseTrackedTabId: undefined,
  metaverseTrackedTab: undefined,
};

export const lighthouseTracking = {
  getTrackedTabId(): number | undefined {
    return state.lighthouseTrackedTabId;
  },
  addOrUpdateTrackingTab(tabId: number, url: string | undefined): void {
    if (!url || !isLighthouseWebsite(url)) {
      return;
    }

    console.log(`Setting active lighthouse tracking tab to ${tabId}`);

    state.lighthouseTrackedTabId = tabId;
  },
  stopTrackingTab(): void {
    state.metaverseTrackedTab = undefined;
  },
};

export const metaverseTracking = {
  getTrackedTabId(): number | undefined {
    return state.metaverseTrackedTab?.id;
  },
  getUrlToTrack(): string | undefined {
    return state.metaverseTrackedTab?.url;
  },
  addOrUpdateTrackingTab(tabId: number, url: string | undefined) {
    if (!url || !isTrackableUrl(url)) {
      return;
    }

    console.log(`Setting active metaverse tracking tab to ${url}`);

    state.metaverseTrackedTab = { id: tabId, url };
  },
  stopTrackingTab() {
    state.metaverseTrackedTab = undefined;
  },
};
