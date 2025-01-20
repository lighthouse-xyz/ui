import React from "react";
import { Location, useLocation } from "react-router-dom";

import EntityDetails from "../entity-details/entity-details.component";
import { Entity } from "@src/common/interfaces/entity.type";
import paths from "@src/common/paths";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";

const EntityDetailsDialog: React.FC = () => {
  const location = useLocation();

  const { backgroundLocation, entity } = location.state as { backgroundLocation: Location; entity: Entity };
  const isEditable =
    backgroundLocation.pathname === paths.yourEvents || backgroundLocation.pathname === paths.yourPlaces;

  return (
    <DialogFrame>
      <EntityDetails entity={entity} editable={isEditable} />
    </DialogFrame>
  );
};

export default EntityDetailsDialog;
