import React from "react";
import { useTranslation } from "react-i18next";

import reparationImage from "@src/assets/images/reparation-image.svg";
import ErrorPage from "@src/components/layout/error-page/error-page.component";

const Maintenance: React.FC = () => {
  const { t } = useTranslation();

  const handleClick = (): void => {
    window.location.reload();
  };

  return (
    <ErrorPage
      errorLogo={reparationImage}
      title={t("error.maintenance.title")}
      subtitle={t("error.maintenance.subtitle")}
      button={{ label: t("cta.refreshPage"), onClick: handleClick }}
    />
  );
};

export default Maintenance;
