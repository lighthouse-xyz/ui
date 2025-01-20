import { Notification } from "@src/common/graphql/generated/user.schema.graphql";
import { createContext, useContext } from "react";

interface StreamConnectedContextInterface {
  connectedToStream: true;
  userHasUnseenNotifications: boolean;
  setNotificationsAsSeen: () => void;
  markAsRead: (notification: Notification) => void;
  markAllAsRead: (notifications?: Notification[]) => void;
}

interface StreamNotConnectedContextInterface {
  connectedToStream: false;
}

export type StreamContextInterface = StreamConnectedContextInterface | StreamNotConnectedContextInterface;

const StreamContext = createContext<StreamContextInterface>({
  connectedToStream: false,
});

const useStreamContext = (): StreamContextInterface => useContext(StreamContext);

export { StreamContext, useStreamContext };
