import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Collapse from "@mui/material/Collapse";
import { OpenChromeStoreOrigin } from "@src/common/enums/track-events.enum";
import Alert from "@src/components/common/alert/alert.component";
import DownloadExtensionButton from "@src/components/common/download-extension-button/download-extension-button.component";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";

const ExtensionAlert: React.FC = () => {
  const { t } = useTranslation();

  const [isAlertDismissed, setIsAlertDismissed] = useState(() =>
    getLocalStorage<boolean>(localStorageKeys.extensionAlertDismissed, false),
  );

  useEffect(
    () => setLocalStorage<boolean>(localStorageKeys.extensionAlertDismissed, isAlertDismissed),
    [isAlertDismissed],
  );

  return (
    <Collapse in={!isAlertDismissed}>
      <Alert
        icon={false}
        color="primary"
        title={t("browserExtension.newAlert.title")}
        content={t("browserExtension.newAlert.subtitle")}
        action={{
          content: (
            <DownloadExtensionButton origin={OpenChromeStoreOrigin.alertSidePanel} color="inherit" size="small" />
          ),
          position: "bottom",
        }}
        onClose={() => setIsAlertDismissed(true)}
        sx={{ marginTop: 4 }}
      />
    </Collapse>
  );
};

export default ExtensionAlert;
