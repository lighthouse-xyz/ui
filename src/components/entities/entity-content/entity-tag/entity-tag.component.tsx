import React from "react";
import { useTranslation } from "react-i18next";

import { EntityTagStyled } from "./entity-tag.style";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";

interface Props {
  entityType: EntityType;
}

const EntityTag: React.FC<Props> = ({ entityType }) => {
  const { t } = useTranslation();

  return (
    <div>
      <EntityTagStyled size="small" label={t(`enum.type.${entityType}`)} entitytype={entityType} />
    </div>
  );
};

export default EntityTag;
