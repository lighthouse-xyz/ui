import React from "react";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import paths from "@src/common/paths";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  userIdOrHandle?: string;
}

const InviteFriendButton: React.FC<Props> = ({ userIdOrHandle }) => {
  const { t } = useTranslation();
  const { navigateToDialog } = useDialog();
  const { showSignInToast } = useToast();

  const handleInviteFriend = (): void => {
    if (!userIdOrHandle) {
      showSignInToast("generic");
      return;
    }

    navigateToDialog(paths.inviteFriend, { userIdOrHandle });
  };

  return (
    <Button fullWidth variant="outlined" onClick={handleInviteFriend}>
      {t("inviteFriend.gatherYourPeople")}
    </Button>
  );
};

export default InviteFriendButton;
