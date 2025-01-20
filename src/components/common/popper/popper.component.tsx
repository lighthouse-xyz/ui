import React, { PropsWithChildren, useState } from "react";
import { usePopper } from "react-popper";

import Alert from "../alert/alert.component";
import { StyledPopper } from "./popper.style";
import { Box, ButtonProps, PopperProps } from "@mui/material";

interface ActionProps extends Omit<ButtonProps, "content"> {
  content: string | JSX.Element;
}

interface Props extends Omit<PopperProps, "content"> {
  title?: string;
  content?: string | JSX.Element;
  action?: ActionProps;
  onClose?: () => void;
}

const Popper: React.FC<PropsWithChildren<Props>> = ({ title, content, action, open, onClose, children, ...props }) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [referenceArrow, setReferenceArrow] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.placement,
    modifiers: [
      {
        name: "arrow",
        options: {
          element: referenceArrow,
        },
      },
      // eslint-disable-next-line no-magic-numbers
      { name: "offset", options: { offset: [8, 8] } },
      { name: "flip", enabled: true },
      {
        name: "preventOverflow",
        enabled: true,
        options: {
          rootBoundary: "viewport",
          padding: 8,
        },
      },
    ],
  });

  return (
    <Box>
      <Box ref={setReferenceElement}>{children}</Box>

      {!!referenceElement && (
        <StyledPopper
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          data-show="true"
          open={!!open}
          anchorEl={referenceElement}
          disablePortal
          transition
          {...props}>
          <Alert
            variant="filled"
            icon={false}
            title={title}
            content={content}
            action={action}
            color="primary"
            onClose={onClose}
          />
          <div ref={setReferenceArrow} style={styles.arrow} {...attributes.arrow} className="arrow" />
        </StyledPopper>
      )}
    </Box>
  );
};

export default Popper;
