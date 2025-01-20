import { Table, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

interface TableRowProps {
  color?: "purple";
}

const StyledTableRow = styled(TableRow)(({ color }: TableRowProps) => ({ theme }) => ({
  borderCollapse: "collapse",
  backgroundColor: color === "purple" ? theme.palette.primary.shades?.["4p"] : theme.palette.background.darker,

  "& td": {
    border: 0,
    padding: "8px 16px",
    ...theme.typography.h8,
    color: color === "purple" ? theme.palette.primary.main : undefined,
  },

  "& td:first-of-type": {
    paddingLeft: "12px",
    borderTopLeftRadius: borderRadius.default,
    borderBottomLeftRadius: borderRadius.default,
  },
  "& td:last-child": {
    paddingRight: "12px",
    borderTopRightRadius: borderRadius.default,
    borderBottomRightRadius: borderRadius.default,
  },
}));

const TableSeparate = styled(Table)({
  borderCollapse: "separate",
  borderSpacing: "0 8px",
});

const StyledTableHeadRow = styled(TableRow)({
  "& th": {
    border: 0,
    padding: "16px 12px 8px 8px",
  },
});

const UserTableCellStyled = styled(TableCell)({
  cursor: "pointer",
  maxWidth: "140px",
});

export { StyledTableHeadRow, StyledTableRow, TableSeparate, UserTableCellStyled };
