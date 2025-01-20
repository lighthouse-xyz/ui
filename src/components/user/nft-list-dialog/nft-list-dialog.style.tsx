import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius, entityCardStyle } from "@src/common/styles/style.const";

const ListNftsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: entityCardStyle.betweenCardsGap,
  overflow: "hidden",
  justifyContent: "center",
  padding: "7px 0",

  ".active": {
    transform: "scale(1.06)",
    img: {
      border: `4px solid ${theme.palette.primary.main}`,
      cursor: "pointer",
    },
  },
  "> *:not(.active)": {
    "&:hover": {
      transform: "scale(1.06)",
    },
  },
}));

const NftContainer = styled(Box)({
  ".MuiSkeleton-root": {
    borderRadius: borderRadius.default,
    cursor: "not-allowed",
  },
  img: {
    borderRadius: borderRadius.default,
    cursor: "pointer",
  },
});

export { ListNftsContainer, NftContainer };
