import { trackCurrentUrl } from "@extension/background/process/cron";
import { processAllTabsWithActiveLast, processSingleTab } from "@extension/background/scan/process-tab";
import { lighthouseTracking, metaverseTracking } from "@extension/background/state/in-memory-state";

export function setProcessTabListeners(): void {
  chrome.tabs.onUpdated.addListener((tabId, change, tab): void => {
    console.log("Detected onUpdated Chrome event");

    const trackedTabId = metaverseTracking.getTrackedTabId();

    const currentlyTrackedTabChangedUrl = trackedTabId === tabId && change.url;
    const tabIsTheActiveOne = tab.active;

    if (currentlyTrackedTabChangedUrl || !trackedTabId || tabIsTheActiveOne) {
      processSingleTab(tab);
    }
  });

  chrome.tabs.onActivated.addListener((tabInfo): void => {
    console.log("Detected onActivated Chrome event");

    const instantlyTrackActivatedTab = (): void => trackCurrentUrl();

    chrome.tabs
      .get(tabInfo.tabId)
      .then(tab => {
        processSingleTab(tab);
        instantlyTrackActivatedTab();
      })
      .catch(error => {
        console.error("Something bad happened when fetching the current tab, will ignore", error);
      });
  });

  chrome.tabs.onRemoved.addListener((tabId): void => {
    console.log("Detected onRemoved Chrome event");

    if (tabId === metaverseTracking.getTrackedTabId()) {
      metaverseTracking.stopTrackingTab();
      processAllTabsWithActiveLast();
    } else if (tabId === lighthouseTracking.getTrackedTabId()) {
      lighthouseTracking.stopTrackingTab();
      processAllTabsWithActiveLast();
    }
  });

  chrome.windows.onFocusChanged.addListener((windowId: number) => {
    console.log(`Detected onFocusChanged Chrome event on ${windowId}`);

    processAllTabsWithActiveLast(undefined, windowId);
  });
}
