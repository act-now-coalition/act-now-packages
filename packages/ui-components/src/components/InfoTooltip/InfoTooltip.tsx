import React, { useState } from "react";
import { Tooltip, TooltipProps as MuiTooltipProps } from "@mui/material";
import { CloseIcon } from "./InfoTooltip.style";

const InfoTooltip: React.FC<MuiTooltipProps> = ({
  children,
  title,
  ...otherProps
}) => {
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
    >
      {children}
    </Tooltip>
  );
};

export default InfoTooltip;
