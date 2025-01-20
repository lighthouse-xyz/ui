import { TrackEvent } from "@src/common/enums/track-events.enum";
import { useMixpanelContext } from "@src/context/analytics/mixpanel-context";
import { useCookies } from "react-cookie";

function useMixpanelTrack(): (
  eventName: TrackEvent,
  additionalProperties?: Record<string, unknown>,
  callback?: () => void,
) => void {
  const sessionCookieKey = "connect.sid";

  const [cookies] = useCookies([sessionCookieKey]);
  const { mixpanel } = useMixpanelContext();

  const getSessionId = (sessionCookie?: string): string | undefined => {
    return sessionCookie?.replace(/^s:/, "");
  };

  const trackInMixpanel = (
    eventName: TrackEvent,
    additionalProperties?: Record<string, unknown>,
    callback?: () => void,
  ): void => {
    mixpanel?.track(
      eventName,
      {
        ...additionalProperties,
        ["session_id"]: getSessionId(cookies[sessionCookieKey] as string),
      },
      callback,
    );
  };

  return trackInMixpanel;
}

export default useMixpanelTrack;
