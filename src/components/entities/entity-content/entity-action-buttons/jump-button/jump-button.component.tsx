import React from "react";
import { useTranslation } from "react-i18next";

import LoadingButton from "@mui/lab/LoadingButton";
import { Entity } from "@src/common/interfaces/entity.type";
import useJump from "@src/hooks/discovery/use-jump.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  entity: Entity;
  size?: "small" | "medium" | "large";
}

const JumpButton: React.FC<Props> = ({ entity, size = "medium" }) => {
  const { showToast } = useToast({ variant: "error" });
  const { t } = useTranslation();

  const { getJumpLocation, loading } = useJump(entity.entityId);

  const handleClick = (): void => {
    void getJumpLocation({
      onCompleted: data => {
        window.open(data.jump.url);
      },
      onError: () => showToast(t("error.jump")),
    });
  };

  const disabled = !entity.jumpable || entity.live === false;

  return (
    <LoadingButton variant="contained" loading={loading} disabled={disabled} size={size} onClick={handleClick}>
      {t("cta.jump")}
    </LoadingButton>
  );
};

export default JumpButton;
