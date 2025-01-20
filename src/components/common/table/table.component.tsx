import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

import ImageAvatar from "../image-avatar/image-avatar.component";
import { UserTableCellStyled } from "./table.style";
import { Stack, TableCell, TableCellProps, Typography } from "@mui/material";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import { getUsername } from "@src/utils/get-user-properties.util";

interface UserTableCellProps extends TableCellProps {
  profile: Profile;
}

const FullWidthTableCell: React.FC<PropsWithChildren<TableCellProps>> = ({ children, ...props }) => {
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} {...props}>
      {children}
    </TableCell>
  );
};

const UserTableCell: React.FC<UserTableCellProps> = ({ profile, ...props }) => {
  const navigate = useNavigate();

  const handleUserClick = (): void => {
    navigate(paths.profile.buildPath(profile.handle ?? profile.userId));
  };

  return (
    <UserTableCellStyled scope="row" onClick={handleUserClick} {...props}>
      <Stack direction="row" spacing={2} alignItems="center" textOverflow="ellipsis" overflow="hidden">
        <ImageAvatar type="user" size="xsmall" userId={profile.userId} image={profile.picture} />
        <Typography noWrap variant="h8">
          {getUsername(profile)}
        </Typography>
      </Stack>
    </UserTableCellStyled>
  );
};

export { FullWidthTableCell, UserTableCell };
