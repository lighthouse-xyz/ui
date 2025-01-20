import React from "react";
import { useTranslation } from "react-i18next";

import useMarketplace from "../../../../../hooks/discovery/use-marketplace.hook";
import useToast from "../../../../../hooks/utils/use-toast.hook";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";

interface Props {
  entityId: string;
  disabled?: boolean;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const MarketplaceButton: React.FC<Props> = ({ entityId, disabled = false, color, size }) => {
  const { getMarketplaceLocation, loading } = useMarketplace(entityId);
  const { showToast } = useToast({ variant: "error" });
  const { t } = useTranslation();

  const handleClick = (): void => {
    void getMarketplaceLocation({
      onCompleted: data => window.open(data.marketplace.url),
      onError: () => showToast(t("error.marketplace")),
    });
  };

  return (
    <LoadingButton
      variant="outlined"
      color={color}
      size={size}
      loading={loading}
      disabled={disabled}
      onClick={handleClick}
      loadingIndicator={<CircularProgress size={16} color={color} />}>
      Marketplace
    </LoadingButton>
  );
};

export default MarketplaceButton;
