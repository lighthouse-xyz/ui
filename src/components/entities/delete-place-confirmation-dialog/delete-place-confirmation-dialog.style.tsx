import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const CustomList = styled(List)({
  padding: 0,
  paddingLeft: "14px",
  listStyleType: "disc",
});

const CustomListItem = styled(ListItem)({
  display: "list-item",
  padding: "4px 16px 4px 0",
  margin: 0,
});

const CustomStack = styled(Stack)({ maxHeight: "256px", overflow: "auto" });

export { CustomList, CustomListItem, CustomStack };
