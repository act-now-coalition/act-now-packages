import React, { useState } from "react";
import { Tooltip, TooltipProps as MuiTooltipProps } from "@mui/material";
import { CloseIcon } from "./InfoTooltip.style";

export const InfoTooltip: React.FC<MuiTooltipProps> = ({
  children,
  title,
  ...otherProps
}) => {
  /**
   * MUI Tooltip's 'open', 'onOpen', and 'onClose' props don't need to explicitly
   * be declared by default, but since we need access to a handleClose function
   * for the mobile tooltip's CloseIcon, we need to explicitly declare all three props.
   */

  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.SyntheticEvent) => {
    if (!open) {
      setOpen(true);
      otherProps.onOpen && otherProps.onOpen(e);
    }
  };

  const handleClose = (e: Event | React.SyntheticEvent<Element, Event>) => {
    if (open) {
      setOpen(false);
      otherProps.onClose && otherProps.onClose(e);
    }
  };

  return (
    <Tooltip
      title={
        <>
          <CloseIcon role="button" onClick={handleClose} />
          {title}
        </>
      }
      placement="top"
      arrow={true}
      leaveTouchDelay={60000} // For mobile: a long leaveTouchDelay keeps the tooltip open until the close-icon is clicked
      enterDelay={0}
      enterTouchDelay={0}
      {...otherProps}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      {children}
    </Tooltip>
  );
};
