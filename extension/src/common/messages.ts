export type EmptyMessageResponse = { ok: true };

export interface SetIsTrackingMessage {
  type: "setIsTracking";
  isTracking: boolean;
}

export type SetIsTrackingMessageResponse = EmptyMessageResponse;

export type AnyMessage = [SetIsTrackingMessage, SetIsTrackingMessageResponse];

export function sendMessage<T extends AnyMessage>(message: T[0]): Promise<T[1]> {
  return chrome.runtime.sendMessage(message);
}

export function listenToMessages<T extends AnyMessage>(
  handler: (request: T[0], sender: chrome.runtime.MessageSender, sendResponse: (response: T[1]) => void) => void,
): void {
  chrome.runtime.onMessage.addListener(handler);
}
