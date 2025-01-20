import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ConnectionsListItem from "../connections-list-item/connections-list-item.component";
import { Stack, Typography } from "@mui/material";
import { ConnectionType } from "src/common/enums/connections-type.enum";
import { useGetConnections } from "src/hooks/user/use-get-connections.hook";

interface Props {
  userId: string;
}

const FollowerRecommendationsList: React.FC<Props> = ({ userId }) => {
  const { t } = useTranslation();

  const totalFollowerRecommendationsLimit = 3;

  const [diffCount, setDiffCount] = useState(0);

  // UserId from Lighthouse gate in prod
  const mapTitleUserId: Record<string, string> = {
    ["lh_us_8f9a4dbd9998b72aaf822c55a0a5073e6271f35bc0227d40fe76dca01ab16e5a"]: "Chief Bullish Officer",
    ["lh_us_80294afad1fabfc849226671178fcc8a57ba2b09c437043e522aa11a5ceebc53"]: "Chief Geek Officer",
    ["lh_us_9d3b0b61b9d42279f26456ca2f8f75d2352b61e7e7a1ca067e5ebfb3dd583230"]: "Master of Delights",
    ["lh_us_8147cfd1105dc580ef3899767e65c27e1474b574e346a1371fd74d4f645f896a"]: "Lighthouse World Builder",
    ["lh_us_14adef3a938930ac6c28a959813a642f0094f5243c70ab8562518e61819be6e9"]: "Lighthouse S&O",
    ["lh_us_ba330c151adc44c04f66d4eb3b94b5e4cc01aff80cd44270fa87f681c5c1bc50"]: "Lighthouse Hmu for Qs",
  };

  const results = useGetConnections(ConnectionType.followerRecommendations, {
    first: totalFollowerRecommendationsLimit,
    offset: 0,
    userId,
  });
  const hasFollowerRecommendations = results.data && results.data.entities.totalCount > 0;
  const followerRecommendations = results.data?.entities.list || [];

  useEffect(() => {
    !!results.refetch && void results.refetch();
  }, [diffCount]);

  return hasFollowerRecommendations ? (
    <Stack spacing={3}>
      <Typography variant="h8" paddingY={2} paddingX={1}>
        {t("people.peopleYouMayLike")}
      </Typography>

      <Stack spacing={1}>
        {followerRecommendations.map((connection, index) => (
          <ConnectionsListItem
            key={`follower-recommendation-item-${connection.userId}-${index}`}
            connection={connection}
            endActionType="followIcon"
            userTitle={mapTitleUserId[connection.userId]}
            currentUserId={userId}
            diffCount={diffCount}
            setDiffCount={setDiffCount}
          />
        ))}
      </Stack>
    </Stack>
  ) : null;
};

export default FollowerRecommendationsList;
