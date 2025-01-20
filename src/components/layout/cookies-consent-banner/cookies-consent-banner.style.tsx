import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { zIndexStep } from "@src/common/styles/style.const";

const BannerContainer = styled(Paper)(({ theme }) => ({
  padding: "16px 24px",
  position: "fixed",
  bottom: 0,
  width: "100%",
  color: theme.palette.common.white,
  background: theme.palette.primary.main,
  zIndex: theme.zIndex.drawer + zIndexStep,
}));

export { BannerContainer };
