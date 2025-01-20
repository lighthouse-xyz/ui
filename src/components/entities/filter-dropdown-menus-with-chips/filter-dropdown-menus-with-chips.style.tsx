import { Button, Chip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

interface FilterButtonProps {
  starticonmarginleft?: string;
}

const StackStyled = styled(Stack)({
  button: {
    fontSize: "16px",
    height: "40px",
    padding: "8px 12px",
  },
});

const FilterButton = styled(Button)(({ starticonmarginleft }: FilterButtonProps) => ({
  ".MuiButton-startIcon": {
    marginLeft: starticonmarginleft,
  },
}));

/* eslint-disable no-magic-numbers */
const FilterCount = styled(Chip)(({ theme }) => ({
  width: "19px",
  height: "20px",
  background: theme.palette.deepPurple[100],
  borderRadius: borderRadius.large,
  color: theme.palette.deepPurple[900],
  span: {
    fontSize: "12px",
    fontWeight: 500,
    alignItems: "center",
    padding: "0px",
  },
}));

export { FilterButton, FilterCount, StackStyled };
