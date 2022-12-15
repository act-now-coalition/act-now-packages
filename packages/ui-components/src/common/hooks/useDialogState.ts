import { useState } from "react";

/**
 * React hook used to manage the the opening/closing of the Dialog component.
 *
 * @param initialIsOpen An initial open state. If undefined, `open` defaults to an initial value of false.
 *
 * See Dialog.stories.tsx for example usage.
 *
 * @example
 * ```tsx
 * const [open, onOpenDialog, onCloseDialog] = useDialogState();
 *
 * <Button onClick={openDialog}>
 *    Open dialog
 * </Button>
 * <Dialog open={open} onClose={closeDialog}>
 *    Lorem ipsum dolor sit amet consectetur
 *    adipisicing elit.
 * </Dialog>
 * ```
 */

export function useDialogState(
  initialIsOpen?: boolean
): [boolean, () => void, () => void] {
  const [open, setIsOpen] = useState(initialIsOpen ?? false);
  const onOpenDialog = () => {
    setIsOpen(true);
  };
  const onCloseDialog = () => setIsOpen(false);
  return [open, onOpenDialog, onCloseDialog];
}
