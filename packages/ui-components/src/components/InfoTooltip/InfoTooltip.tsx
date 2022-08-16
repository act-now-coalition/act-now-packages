import React, { useState } from "react";
import { Tooltip, TooltipProps as MuiTooltipProps } from "@mui/material";
import { CloseIcon } from "./InfoTooltip.style";

const InfoTooltip: React.FC<MuiTooltipProps> = ({
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

  const handleOpen = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <Tooltip
      {...otherProps}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
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
    >
      {children}
    </Tooltip>
  );
};

export default InfoTooltip;
