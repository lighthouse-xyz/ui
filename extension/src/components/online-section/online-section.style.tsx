import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

const RoundedPaper = styled(Paper)({
  padding: "12px",
  borderRadius: borderRadius.small,
});

export { RoundedPaper };
