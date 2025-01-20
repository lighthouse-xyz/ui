import React, { PropsWithChildren } from "react";

import useFeatureFlag, { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";

interface Props {
  name: FeatureFlag;
}

const ConditionalFeature: React.FC<PropsWithChildren<Props>> = ({ children, name }) => {
  const { isFeatureEnabled } = useFeatureFlag();

  return isFeatureEnabled(name) ? <>{children}</> : null;
};

export default ConditionalFeature;
