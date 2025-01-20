import React, { useContext, useEffect, useState } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { ReactComponent as ArrowRight } from "../../../../assets/icons/literal-arrow-right-icon.svg";
import IconButton from "@mui/material/IconButton";

interface Props {
  fetchMoreEntities?: () => void;
  limit?: number;
}

const RightArrowButton: React.FC<Props> = ({ fetchMoreEntities, limit }) => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators, items } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !fetchMoreEntities || (!visibleItemsWithoutSeparators.length && isLastItemVisible),
  );

  useEffect(() => {
    if (isLastItemVisible && fetchMoreEntities) {
      fetchMoreEntities();
    }

    const loading = visibleItemsWithoutSeparators.find(item => item.includes("skeleton"));
    if (loading) {
      setDisabled(true);
    } else if (
      (fetchMoreEntities && limit && items.toItemsWithoutSeparators().length >= limit) ||
      (!fetchMoreEntities && visibleItemsWithoutSeparators.length)
    ) {
      setDisabled(isLastItemVisible);
    }
  }, [items, isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <IconButton aria-label="next" disabled={disabled} onClick={() => scrollNext()}>
      <ArrowRight />
    </IconButton>
  );
};

export default RightArrowButton;
