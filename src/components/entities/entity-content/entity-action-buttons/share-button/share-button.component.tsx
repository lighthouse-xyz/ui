import React from "react";
import { useTranslation } from "react-i18next";

import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as ShareIcon } from "@src/assets/icons/share-icon.svg";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import { getEntityPath } from "@src/utils/get-path.util";

interface Props {
  entityId: string;
  entityType: EntityType;
  color?: "primary" | "secondary";
  size?: "small" | "large";
}

const ShareButton: React.FC<Props> = ({ entityId, entityType, color, size }) => {
  const { t } = useTranslation();

  const getIconButton = (): JSX.Element => {
    return (
      <Tooltip title={t("cta.share")} arrow>
        <IconButton color={color} size={size} aria-label="share">
          <ShareIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <CopyToClipboard
      activator={getIconButton()}
      content={getEntityPath(entityType, entityId)}
      successMessage={t("success.copyEntityLink")}
    />
  );
};

export default ShareButton;
