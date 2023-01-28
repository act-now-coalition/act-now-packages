import React from "react";

import { Button, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Dialog } from ".";
import { useDialogState } from "../../common/hooks";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const WithoutTitle: ComponentStory<typeof Dialog> = () => {
  const [open, onOpenDialog, onCloseDialog] = useDialogState();
  return (
    <>
      <Button variant="contained" onClick={onOpenDialog}>
        Open dialog
      </Button>
      <Dialog open={open} onClose={onCloseDialog}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero nisi
        porro rem illum! Soluta officia aspernatur ipsam incidunt tempore quod
        magnam hic assumenda accusantium quo laborum, voluptatibus voluptatem
        omnis.
      </Dialog>
    </>
  );
};

const Title = (
  <Typography variant="h2" component="h1">
    Dialog title
  </Typography>
);

export const WithTitle: ComponentStory<typeof Dialog> = () => {
  const [open, onOpenDialog, onCloseDialog] = useDialogState();
  return (
    <>
      <Button variant="contained" onClick={onOpenDialog}>
        Open dialog
      </Button>
      <Dialog open={open} onClose={onCloseDialog} title={Title}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero nisi
        porro rem illum! Soluta officia aspernatur ipsam incidunt tempore quod
        magnam hic assumenda accusantium quo laborum, voluptatibus voluptatem
        omnis.
      </Dialog>
    </>
  );
};

const LongTitle = (
  <Typography variant="h2" component="h1">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </Typography>
);

export const WithLongTitle: ComponentStory<typeof Dialog> = () => {
  const [open, onOpenDialog, onCloseDialog] = useDialogState();
  return (
    <>
      <Button variant="contained" onClick={onOpenDialog}>
        Open dialog
      </Button>
      <Dialog open={open} onClose={onCloseDialog} title={LongTitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A vero nisi
        porro rem illum! Soluta officia aspernatur ipsam incidunt tempore quod
        magnam hic assumenda accusantium quo laborum, voluptatibus voluptatem
        omnis.
      </Dialog>
    </>
  );
};
