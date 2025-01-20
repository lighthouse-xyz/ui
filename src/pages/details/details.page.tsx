import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TouchOrigin } from "@src/common/enums/track-events.enum";
import paths from "@src/common/paths";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import EntityDetails from "@src/components/entities/entity-content/entity-details/entity-details.component";
import { useLazyGetEntity } from "@src/hooks/discovery/use-get-entity.hook";
import useTouchEntity from "@src/hooks/discovery/use-touch-entity.hook";
import { isEntityId, isUserId } from "@src/utils/entity.util";

const Details: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getEntity, data, loading } = useLazyGetEntity();
  const { touchEntity } = useTouchEntity(TouchOrigin.directUrl);

  const [entityId, setEntityId] = useState(params.id);

  useEffect(() => {
    if (!params.id || !isEntityId(params.id) || isUserId(params.id)) {
      navigate(paths.error404, { replace: true });
    }
    setEntityId(params.id);
  }, [params]);

  useEffect(() => {
    void getEntity({
      variables: { id: entityId },
      onCompleted: entityData => void touchEntity({ variables: { id: entityData.entity.entityId } }),
      onError: () => navigate(paths.error404, { replace: true }),
    });
  }, [entityId]);

  return (
    <>
      {!!data && <EntityDetails entity={data.entity} />}

      {loading && <LoadingIndicator size="70px" />}
    </>
  );
};

export default Details;
