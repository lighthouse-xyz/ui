import React from "react";
import { useTranslation } from "react-i18next";

import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { ClaimAvatarType } from "@src/common/graphql/generated/user.schema.graphql";
import ConditionalFeature from "@src/components/common/conditional-feature/conditional-feature.component";
import useGetAvatar from "@src/hooks/user/use-get-avatar.hook";
import { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  userId: string;
  avatarType: ClaimAvatarType;
  loading?: boolean;
  disabled?: boolean;
  setAvatarClaimed?: (claimed: boolean) => void;
}

const ClaimAvatarButtons: React.FC<Props> = ({
  userId,
  avatarType,
  loading = false,
  disabled = false,
  setAvatarClaimed,
}) => {
  const { showToast } = useToast({ variant: "error" });
  const { t } = useTranslation();

  const { getAvatar, loading: loadingAvatarUrl } = useGetAvatar();

  const handleDownloadAvatar = (): void => {
    void getAvatar({
      variables: { userId, step: avatarType },
      onCompleted: dataAvatar => {
        const element = document.createElement("a");
        element.href = dataAvatar.claimAndGetAvatar.avatarUrl;
        element.click();
        !!setAvatarClaimed && setAvatarClaimed(true);
      },
      onError: () => showToast(t("error.generic")),
    });
  };

  const commonButtonProps: LoadingButtonProps = { fullWidth: true, disabled, size: "large" };
  const context = avatarType === ClaimAvatarType.avatarInviteClaimed ? "second" : undefined;

  return (
    <Stack spacing={2}>
      <LoadingButton
        variant="contained"
        loading={loading || loadingAvatarUrl}
        onClick={handleDownloadAvatar}
        {...commonButtonProps}>
        {t("onboarding.claimAvatars.download", { context })}
      </LoadingButton>
      <ConditionalFeature name={FeatureFlag.claimAvatarsAsNft}>
        {/* TODO(PORTAL-266): implement button "Claim as NFT"" */}
        <LoadingButton variant="outlined" loading={loading} {...commonButtonProps}>
          {t("onboarding.claimAvatars.claimAsNft", { context })}
        </LoadingButton>
      </ConditionalFeature>
    </Stack>
  );
};

export default ClaimAvatarButtons;
