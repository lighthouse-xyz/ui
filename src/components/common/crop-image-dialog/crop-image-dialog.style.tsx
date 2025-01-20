import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

const CropContainer = styled(Box)({
  ".reactEasyCrop_Container": {
    borderRadius: borderRadius.default,
  },
});

export { CropContainer };
