import React from "react";

import { Close } from "@mui/icons-material";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  Stack,
} from "@mui/material";

export interface DialogProps {
  /**
   * Dialog is open.
   */
  open: boolean;
  /**
   * Callback fired when the dialog requests to be closed.
   */
  onClose: () => void;
  /**
   * Content of the dialog title.
   */
  title?: React.ReactNode;
  /**
   * Main content of the dialog.
   */
  children: React.ReactNode;
}

export const Dialog = ({ open, onClose, title, children }: DialogProps) => {
  return (
    <MuiDialog open={open}>
      <DialogTitle>
        <Stack direction="row">
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              marginLeft: "auto",
              display: "flex",
              height: "fit-content",
              color: (theme) => theme.palette.common.black,
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};
