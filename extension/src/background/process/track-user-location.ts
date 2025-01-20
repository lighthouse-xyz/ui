import { callWithExtensionToken } from "@extension/background/graphql";
import { LocalStorageState } from "@extension/background/state/storage";

export async function trackUserLocation(location: string): Promise<void> {
  const userId = await LocalStorageState.getUserId();

  const trackUserLocationQuery = `
      mutation TrackUserLocation($location: URL!, $userId: UserId!) {
        trackUserLocation(
          input: { location: $location },
          userId: $userId
        ) {
          world
        }
      }
    `;

  try {
    await callWithExtensionToken("TrackUserLocation", trackUserLocationQuery, {
      location,
      userId,
    });
  } catch (error) {
    console.error("Could not properly track URL", error);
  }
}
