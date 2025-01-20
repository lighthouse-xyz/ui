import { trackUserLocation } from "@extension/background/process/track-user-location";
import { metaverseTracking } from "@extension/background/state/in-memory-state";
import { LocalStorageState } from "@extension/background/state/storage";

export function trackCurrentUrl(): void {
  console.log("Executing tracking function.");

  const urlToTrack = metaverseTracking.getUrlToTrack();
  LocalStorageState.getIsTracking()
    .then(isTracking => {
      if (!!isTracking && urlToTrack) {
        console.log(`Tracking url ${urlToTrack}.`);

        trackUserLocation(urlToTrack).catch(error => {
          console.error("Could not send user location, will ignore", error);
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export function setupTrackingCron(): void {
  const fifteenSeconds = 15000;

  trackCurrentUrl();
  setInterval(trackCurrentUrl, fifteenSeconds);
}
