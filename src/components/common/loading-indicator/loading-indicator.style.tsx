import { Player } from "@lottiefiles/react-lottie-player";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface ContainerProps {
  background: string;
}

interface AnimationProps {
  size: string;
}

const LoadingContainer = styled(Paper)(({ background }: ContainerProps) => ({
  display: "flex",
  justifyContent: "center",
  background,
}));

const LoadingAnimation = styled(Player)(({ size }: AnimationProps) => ({
  height: size,
  width: size,
}));

export { LoadingAnimation, LoadingContainer };
