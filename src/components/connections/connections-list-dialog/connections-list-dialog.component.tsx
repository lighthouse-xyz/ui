import React from "react";

import ConnectionsList from "../connections-list/connections-list.component";
import Stack from "@mui/material/Stack";
import { ConnectionType } from "@src/common/enums/connections-type.enum";
import { FriendListSortingMethod, RelationListSortingMethod } from "@src/common/graphql/generated/user.schema.graphql";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import { useGetConnections } from "@src/hooks/user/use-get-connections.hook";

interface Props {
  connectionsType: ConnectionType;
  userId: string;
  closeDialog: () => void;
}

const ConnectionsListDialog: React.FC<Props> = ({ connectionsType, userId, closeDialog }) => {
  const results = useGetConnections(connectionsType, {
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
    userId,
    sortBy:
      connectionsType === ConnectionType.friends ? FriendListSortingMethod.alias : RelationListSortingMethod.alias,
  });

  return (
    <DialogFrame onClose={closeDialog}>
      <Stack padding={6}>
        <ConnectionsList
          connectionType={connectionsType}
          results={results}
          userId={userId}
          context="dialog"
          endActionType="followButton"
        />
      </Stack>
    </DialogFrame>
  );
};

export default ConnectionsListDialog;
