import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import { Property } from "csstype";

interface StyledImgProps {
  objectfit: Property.ObjectFit;
}

const StyledImg = styled("img")(({ objectfit }: StyledImgProps) => ({
  position: "absolute",
  objectFit: objectfit,
  color: "transparent",
}));

const ShadowImg = styled("img")({
  position: "absolute",
  objectFit: "cover",
  color: "transparent",
});

const BlackOverlay = styled(Box)({
  background: "rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(20px)",
});

const StyledSkeleton = styled(Skeleton)({
  position: "absolute",
  objectFit: "cover",
});

export { BlackOverlay, ShadowImg, StyledImg, StyledSkeleton };
