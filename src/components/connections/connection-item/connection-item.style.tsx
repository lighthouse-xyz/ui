import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { borderRadius } from "@src/common/styles/style.const";

const ItalicText = styled(Typography)({
  fontWeight: 400,
  fontSize: "12px",
  fontStyle: "italic",
  lineHeight: "16px",
});

const ActionContainer = styled(Box)({
  ".action-button-connection-item": {
    padding: "4px",
    minWidth: "0px",
    width: "32px",
    height: "32px",
    borderRadius: borderRadius.small,
  },
});

export { ActionContainer, ItalicText };
