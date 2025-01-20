import { lighthouseTracking, metaverseTracking } from "@extension/background/state/in-memory-state";
import { isLighthouseWebsite, isTrackableUrl } from "@extension/background/url";

type ChromeTab = chrome.tabs.Tab;

function getUrlFromTab(tab: ChromeTab): string | undefined {
  return tab.url || tab.pendingUrl;
}

function placeElementLastBasedOnCriteria<T>(array: T[], criteria: (element: T) => boolean): T[] {
  const elementFittingCriteria = array.find(element => criteria(element));
  const allOtherElements = array.filter((element: T) => !criteria(element));

  if (elementFittingCriteria) {
    return [...allOtherElements, elementFittingCriteria];
  } else {
    return array;
  }
}

function placeCurrentWindowTabLast(allTabs: ChromeTab[], currentWindowId: number): ChromeTab[] {
  return placeElementLastBasedOnCriteria<ChromeTab>(allTabs, tab => tab.windowId === currentWindowId);
}

function placeCurrentlyTrackedTabLast(allTabs: ChromeTab[]): ChromeTab[] {
  const currentlyTrackedTabId = metaverseTracking.getTrackedTabId();
  return placeElementLastBasedOnCriteria<ChromeTab>(allTabs, tab => tab.id === currentlyTrackedTabId);
}

function reorderActiveTabsBasedOnCurrentWindow(allTabs: ChromeTab[], currentWindowId: number): ChromeTab[] {
  const windowIdOnFocusOut = -1;

  if (currentWindowId === windowIdOnFocusOut) {
    return placeCurrentlyTrackedTabLast(allTabs);
  } else {
    return placeCurrentWindowTabLast(allTabs, currentWindowId);
  }
}

export function processSingleTab(tab: ChromeTab): void {
  const url = getUrlFromTab(tab);

  if (!(tab.id && url)) {
    return;
  }

  if (isLighthouseWebsite(url)) {
    lighthouseTracking.addOrUpdateTrackingTab(tab.id, url);
  } else if (isTrackableUrl(url)) {
    metaverseTracking.addOrUpdateTrackingTab(tab.id, url);
  }
}

export function processAllTabsWithActiveLast(onSuccess?: () => void, currentWindowId?: number): void {
  chrome.tabs.query({}, tabs => {
    let activeTabs = tabs.filter(tab => tab.active);
    const activeTabIds = activeTabs.map(tab => tab.id);

    const allTabsExceptActives = tabs.filter(tab => !activeTabIds.includes(tab.id));

    if (currentWindowId) {
      activeTabs = reorderActiveTabsBasedOnCurrentWindow(activeTabs, currentWindowId);
    }

    const allTabsToProcessInOrder = allTabsExceptActives.concat(activeTabs);

    allTabsToProcessInOrder.forEach(tab => processSingleTab(tab));

    onSuccess?.();
  });
}
