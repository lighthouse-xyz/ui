import React from "react";

import { Box, Collapse, Stack, Typography } from "@mui/material";
import { ReactComponent as ArrowBottomRight } from "@src/assets/icons/arrow-bottom-right-icon.svg";
import { ReactComponent as ArrowTopLeft } from "@src/assets/icons/arrow-top-left-icon.svg";

interface Props {
  title: string | JSX.Element;
  content: JSX.Element;
  open: boolean;
  onClick?: () => void;
}

const CollapsibleContent: React.FC<Props> = ({ title, content, open, onClick: handleClick }) => {
  return (
    <Stack direction="row" spacing={6} paddingY={6}>
      <Box width="20%" onClick={handleClick} sx={{ cursor: "pointer" }}>
        {open ? (
          <ArrowTopLeft color="common.white" width="40px" height="40px" />
        ) : (
          <ArrowBottomRight color="common.white" width="40px" height="40px" />
        )}
      </Box>

      <Stack width="80%">
        <Typography
          fontSize={{ xs: "32px", smMd: "40px" }}
          lineHeight={{ xs: "41px", smMd: "51px" }}
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
          component="div">
          {title}
        </Typography>
        <Collapse in={open}>{content}</Collapse>
      </Stack>
    </Stack>
  );
};

export default CollapsibleContent;
