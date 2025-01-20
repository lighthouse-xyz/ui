import React from "react";

import { CardSkeleton, ContentSkeleton, TextSkeleton } from "./entity-card-skeleton.style";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { CardSize } from "@src/common/enums/card-size.enum";

interface Props {
  cardSize?: CardSize;
}

const EntityCardSkeleton: React.FC<Props> = ({ cardSize = CardSize.small }) => {
  return (
    <Stack>
      <CardSkeleton variant="rectangular" animation="wave" cardsize={cardSize} />
      <ContentSkeleton spacing={2}>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={24} height={24} animation="wave" />
          <TextSkeleton animation="wave" />
        </Stack>
        {cardSize === CardSize.small && (
          <Stack>
            <TextSkeleton animation="wave" />
            <TextSkeleton animation="wave" />
          </Stack>
        )}
      </ContentSkeleton>
    </Stack>
  );
};

export default EntityCardSkeleton;
