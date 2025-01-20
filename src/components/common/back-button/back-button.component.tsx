import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button, { ButtonProps } from "@mui/material/Button";
import { ReactComponent as ArrowLeft } from "@src/assets/icons/literal-arrow-left-icon.svg";

interface Props extends ButtonProps {
  label?: string;
  destination?: string;
}

const BackButton: React.FC<Props> = ({ label, destination, ...props }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (destination) {
      navigate(destination, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <Button size="small" startIcon={<ArrowLeft color="primary" />} onClick={handleClick} {...props}>
      {label || t("cta.back")}
    </Button>
  );
};

export default BackButton;
