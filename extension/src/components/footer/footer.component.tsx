import React from "react";

import useLogout from "../../hooks/use-logout.hook";
import { Divider } from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

interface Props {
  signedIn: boolean;
  resetToken: () => void;
}

const Footer: React.FC<Props> = ({ signedIn, resetToken }) => {
  const { logout } = useLogout();

  const handleLogout = (): void => {
    void logout({ onCompleted: resetToken });
  };

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <Link href="https://lighthouse.world/" target="_blank" variant="caption" underline="none" color="primary">
        Lighthouse.world
      </Link>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Link href="https://support.lighthouse.world/" target="_blank" variant="caption" underline="none" color="primary">
        Need help?
      </Link>
      {signedIn && (
        <>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link component="button" variant="caption" underline="none" color="primary" onClick={handleLogout}>
            Sign out
          </Link>
        </>
      )}
    </Stack>
  );
};

export default Footer;
