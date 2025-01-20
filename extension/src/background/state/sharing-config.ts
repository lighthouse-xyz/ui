import { callWithExtensionToken } from "@extension/background/graphql";
import { LocalStorageState } from "@extension/background/state/storage";
import { listenToMessages } from "@extension/common/messages";

interface LocationStatus {
  locationStatus: {
    allowsSharingLocation: boolean;
  };
}

export async function isUserAllowsSharingLocation(): Promise<boolean> {
  const token = await LocalStorageState.getToken();
  const userId = await LocalStorageState.getUserId();
  if (!token || !userId) {
    return false;
  }

  const locationStatus = `
  query GetAllowsSharingLocation($userId: UserId!) {
    locationStatus: locationStatus(userId: $userId) {
      allowsSharingLocation
    }
  }`;

  try {
    const { data, errors } = await callWithExtensionToken<LocationStatus>("GetAllowsSharingLocation", locationStatus, {
      userId,
    });

    if (errors) {
      console.error("There were errors when retrieving the location status", errors);
      return false;
    }

    return data?.locationStatus.allowsSharingLocation || false;
  } catch (error) {
    console.error("Could not properly retrieve the location status", error);
    return false;
  }
}

export function initIsTrackingSyncWithPopup(): void {
  listenToMessages((request, sender, sendResponse): void => {
    const isFromTheExtension = !sender.tab;
    if (isFromTheExtension) {
      if (request.type === "setIsTracking") {
        LocalStorageState.setIsTracking(request.isTracking).catch(error =>
          console.error("Error happened while setting isTracking", error),
        );
        sendResponse({ ok: true });
      }
    }
  });
}

export async function initIsTracking(): Promise<void> {
  const updateIsTrackingFromApi = async (): Promise<void> => {
    await LocalStorageState.setIsTracking(await isUserAllowsSharingLocation());
  };
  const isTracking = await LocalStorageState.getIsTracking();

  if (!isTracking) {
    await updateIsTrackingFromApi();
  }

  chrome.runtime.onInstalled.addListener(() => void updateIsTrackingFromApi());
}
