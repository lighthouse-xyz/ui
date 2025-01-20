import React from "react";

import { Link, Typography } from "@mui/material";
import { ReactComponent as OpenLinkIcon } from "@src/assets/icons/arrow-top-right-icon.svg";

interface Props {
  label: string;
  url: string;
}

const OpenLink: React.FC<Props> = ({ label, url }) => {
  return (
    <Link href={url} target="_blank" textAlign="right" underline="none" color="inherit">
      <Typography variant="button" fontSize="18px" display="inline-flex" alignItems="center" gap="4px">
        {label}
        <OpenLinkIcon width="24px" height="24px" />
      </Typography>
    </Link>
  );
};

export default OpenLink;
