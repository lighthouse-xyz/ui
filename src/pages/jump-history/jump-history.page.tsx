import React from "react";

import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import JumpHistoryResultsList from "@src/components/user/jump-history-results-list/jump-history-results-list.component";
import { useAuthContext } from "@src/context/auth/auth-context";

const JumpHistory: React.FC = () => {
  const { profile, loading: profileLoading } = useAuthContext();

  return (
    <>
      {!!profile && <JumpHistoryResultsList userId={profile.userId} />}

      {profileLoading && <LoadingIndicator size="70px" />}
    </>
  );
};

export default JumpHistory;
