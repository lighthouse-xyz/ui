import { Badge, BadgeProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)<BadgeProps>({
  gap: "8px",
  "& .MuiBadge-badge": {
    right: -3,
    top: -8,
    padding: "0px 5px",
  },
});

export { StyledBadge };
