import React from "react";
import { useTranslation } from "react-i18next";

import { ViewAllCardContainer, ViewAllWrapper } from "./view-all-card.style";
import { CardSize } from "@src/common/enums/card-size.enum";

interface Props {
  cardSize?: CardSize;
  handleViewAll?: () => void;
}

const ViewAllCard: React.FC<Props> = ({ cardSize = CardSize.small, handleViewAll }) => {
  const { t } = useTranslation();

  return handleViewAll ? (
    <ViewAllCardContainer elevation={0} cardsize={cardSize}>
      <ViewAllWrapper size="medium" variant="outlined" cardsize={cardSize} onClick={handleViewAll}>
        {t("cta.viewAll")}
      </ViewAllWrapper>
    </ViewAllCardContainer>
  ) : null;
};

export default ViewAllCard;
