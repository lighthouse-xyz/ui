import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface PageContainerProps {
  bgimage: string;
}

const PageContainer = styled(Box)(({ bgimage }: PageContainerProps) => ({
  overflow: "hidden",
  minHeight: "100vh",
  backgroundImage: `url(${bgimage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

export { PageContainer };
