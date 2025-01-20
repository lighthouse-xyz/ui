import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ActionContainer, ItalicText } from "./connection-item.style";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { UserLocation } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import ImageAvatar from "@src/components/common/image-avatar/image-avatar.component";
import { getWorldLabel } from "@src/utils/worlds.util";

interface Props {
  userId: string;
  username: string;
  handle?: string;
  image?: string;
  customStatus?: string;
  title?: string;
  isOnline?: boolean;
  location?: UserLocation;
  isCurrentUser?: boolean;
  displayOffline?: boolean;
  action?: JSX.Element;
}

const ConnectionItem: React.FC<Props> = ({
  userId,
  username,
  handle,
  image,
  customStatus,
  title,
  isOnline = false,
  location,
  isCurrentUser = false,
  displayOffline = false,
  action,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const offlineUser = !isOnline && !isCurrentUser && displayOffline;

  const getConnectionItem = (): JSX.Element => {
    return (
      <Button
        key={`connection-item-button-${userId}`}
        fullWidth
        color="inherit"
        onClick={() => navigate(paths.profile.buildPath(handle ?? userId))}
        sx={{ padding: "4px", justifyContent: "flex-start" }}>
        <Stack direction="row" alignItems="center" spacing={3} width="100%" padding={0.5}>
          <ImageAvatar
            image={image}
            name={username}
            userId={userId}
            isOnline={isOnline}
            displayOffline={displayOffline}
            size="small"
            type="user"
          />

          <Stack
            textAlign="start"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color={offlineUser ? "text.disabled" : "text.primary"}>
            <Typography variant="h9" noWrap color={offlineUser ? "text.disabled" : "text.primary"}>
              {username}
            </Typography>

            <Tooltip title={title || ""} placement="bottom" arrow>
              <ItalicText noWrap color={offlineUser ? "text.disabled" : "info.main"}>
                {title}
              </ItalicText>
            </Tooltip>

            {!title && (
              <Tooltip title={customStatus || ""} placement="bottom" arrow>
                <ItalicText noWrap color={offlineUser ? "text.disabled" : "text.secondary"}>
                  {customStatus}
                </ItalicText>
              </Tooltip>
            )}

            <Typography typography="caption" noWrap color={offlineUser ? "text.disabled" : "success.main"}>
              {!!location && t("profile.in")} {getWorldLabel(location?.world)}
            </Typography>
          </Stack>
        </Stack>
      </Button>
    );
  };

  return action ? (
    <Stack direction="row" spacing={1} width="100%" alignItems="center" justifyContent="space-between">
      <Stack flexGrow={1} textOverflow="ellipsis" overflow="hidden">
        {getConnectionItem()}
      </Stack>
      <ActionContainer display="flex" alignItems="center">
        {action}
      </ActionContainer>
    </Stack>
  ) : (
    getConnectionItem()
  );
};

export default ConnectionItem;
