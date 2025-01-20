import React from "react";
import { useTranslation } from "react-i18next";

import Alert from "@src/components/common/alert/alert.component";
import { useVrContext } from "@src/context/vr/vr-context";

const VrAlert: React.FC = () => {
  const { t } = useTranslation();

  const { vrMode, setVrMode, vrDetected } = useVrContext();

  return (
    <>
      {vrMode && (
        <Alert
          title={t("warning.currentlyInVrMode.title")}
          content={t("warning.currentlyInVrMode.subtitle")}
          action={{ content: t("cta.switchDesktopVersion"), onClick: () => setVrMode(false) }}
          color="primary"
          style={{ marginBottom: "32px" }}
        />
      )}
      {vrDetected && !vrMode && (
        <Alert
          title={t("warning.vrDetected.title")}
          content={t("warning.vrDetected.subtitle")}
          action={{ content: t("cta.switchVrVersion"), onClick: () => setVrMode(true) }}
          color="primary"
          style={{ marginBottom: "32px" }}
        />
      )}
    </>
  );
};

export default VrAlert;
