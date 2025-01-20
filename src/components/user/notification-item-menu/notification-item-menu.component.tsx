import React from "react";

import { ReactComponent as MoreIcon } from "@src/assets/icons/more-icon.svg";
import { ReactComponent as ReadIcon } from "@src/assets/icons/read-icon.svg";
// import { ReactComponent as TrashIcon } from "@src/assets/icons/trash-icon.svg";
import { Notification } from "@src/common/graphql/generated/user.schema.graphql";
import DropdownMenu, { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";
import { useStreamContext } from "@src/context/stream/stream-context";
import useToast from "@src/hooks/utils/use-toast.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { t } from "i18next";

enum NotificationOptions {
  markRead = "markRead",
  delete = "delete",
}

interface Props {
  isRead: boolean;
  handleDropdownToggleChange: (open: boolean) => void;
  notification: Notification;
}

const NotificationItemMenu: React.FC<Props> = ({ isRead, handleDropdownToggleChange, notification }) => {
  const { showToast } = useToast({ variant: "error" });
  const streamContext = useStreamContext();

  const dropdownOptions = [
    ...conditionalItem(!isRead, {
      option: NotificationOptions.markRead,
      label: t("cta.markRead"),
      icon: <ReadIcon />,
    }),
    // @TODO: Reactivate when deleting duplicates issue is solved
    // {
    //   option: NotificationOptions.delete,
    //   label: t("cta.deleteNotification"),
    //   icon: <TrashIcon />,
    // },
  ];

  function handleOptionClick(option: string): void {
    if (!streamContext.connectedToStream) {
      showToast(t("error.generic"));
      return;
    }

    switch (option) {
      case NotificationOptions.markRead:
        streamContext.markAsRead(notification);
        break;
      // @TODO: Reactivate when deleting duplicates issue is solved
      // case NotificationOptions.delete:
      //   notificationsFeed
      //     ?.removeActivity(notification.activityId)
      //     .then(() => {
      //       client.cache.evict({ id: client.cache.identify(notification) });
      //     })
      //     .catch(_ => showToast(t("error.generic")));
      //   break;
      default:
        break;
    }
  }
  return (
    <DropdownMenu
      dataTestId="notification-item-menu"
      menuOptions={dropdownOptions}
      menuProps={{
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
      }}
      buttonProps={{
        type: ButtonType.icon,
        icon: <MoreIcon />,
      }}
      onOptionClick={handleOptionClick}
      handleToggleChange={handleDropdownToggleChange}
    />
  );
};

export default NotificationItemMenu;
