import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as LighthouseLogo } from "@src/assets/logos/lighthouse-logo-with-text.svg";

interface Props {
  title: string;
  subtitle: string;
  explanation?: string;
}

const ClaimHandleHeader: React.FC<Props> = ({ title, subtitle, explanation }) => {
  return (
    <Stack alignItems="center" textAlign="center" spacing={6}>
      <LighthouseLogo width="189px" height="40px" />
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h8">{subtitle}</Typography>
      <Typography variant="body1">{explanation}</Typography>
    </Stack>
  );
};

export default ClaimHandleHeader;
