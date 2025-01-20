import React from "react";
import { useTranslation } from "react-i18next";

import StepLayout from "../step-layout/step-layout.component";
import MembersListItem from "./members-list-item/members-list-item.component";
import Stack from "@mui/material/Stack";
import onboardingCommunityMembersImage from "@src/assets/images/onboarding-community-members-image.jpg";
import { UserCategory } from "@src/common/graphql/generated/discovery.schema.graphql";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import useGetMembers from "@src/hooks/discovery/use-get-members.hook";

interface Props {
  index: number;
  nbSteps: number;
  userId: string;
}

const CommunityMembersStep: React.FC<Props> = ({ index, nbSteps, userId }) => {
  const topMembers = 5;
  const { t } = useTranslation();

  const { data, loading } = useGetMembers({
    first: topMembers + 1,
    offset: 0,
    where: { categories: [UserCategory.lightkeeper] },
  });
  const membersList = data?.entities.list?.filter(member => member.entityId !== userId).slice(0, topMembers);

  const content =
    loading || !membersList ? (
      <LoadingIndicator size="70px" />
    ) : (
      <Stack spacing={4} paddingRight={2}>
        {membersList.map(member => (
          <MembersListItem key={`community-member-${member.name}`} member={member} currentUserId={userId} />
        ))}
      </Stack>
    );

  return (
    <StepLayout
      index={index}
      nbSteps={nbSteps}
      image={onboardingCommunityMembersImage}
      title={t("signInOnboarding.communityMembers.title")}
      subtitle={t("signInOnboarding.communityMembers.subtitle")}
      content={content}
    />
  );
};

export default CommunityMembersStep;
