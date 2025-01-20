import { Box, Chip, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

const BreakableTypography = styled(Typography)({
  wordBreak: "break-word",
});

const HandleChip = styled(Chip)({
  borderRadius: "8px",
  padding: "8px 2px",
});

const ConnectionsCount = styled(Stack)({
  cursor: "pointer",
});

const UserAvatarContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: borderRadius.default,
}));

export { BreakableTypography, ConnectionsCount, HandleChip, UserAvatarContainer };
