import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

const BannerPaper = styled(Paper)({
  background: "linear-gradient(283.4deg, #160039 0%, #5B1298 100%)",
  minWidth: "100%",
  height: "256px",
  padding: "20px",
  borderRadius: borderRadius.medium,
  position: "relative",
  marginBottom: "32px",
  overflow: "hidden",
});

const ConnectionsPanelImage = styled("img")({
  position: "absolute",
  top: "0px",
  left: "0px",
});

export { BannerPaper, ConnectionsPanelImage };
