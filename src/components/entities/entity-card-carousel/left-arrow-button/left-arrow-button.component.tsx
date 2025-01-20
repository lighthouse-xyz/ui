import React, { useContext, useEffect, useState } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { ReactComponent as ArrowLeft } from "../../../../assets/icons/literal-arrow-left-icon.svg";
import IconButton from "@mui/material/IconButton";

const LeftArrowButton: React.FC = () => {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const loading = visibleItemsWithoutSeparators.find(item => item.includes("skeleton"));
    if (!loading && visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <IconButton aria-label="previous" disabled={disabled} onClick={() => scrollPrev()}>
      <ArrowLeft />
    </IconButton>
  );
};

export default LeftArrowButton;
