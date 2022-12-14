import { useState } from "react";

/**
 * React hook used to generate three props for the Dialog component.
 *
 * @param initialIsOpen An initial open state. If undefined, `open` defaults to an initial value of false.
 */

export function useDialog(
  initialIsOpen?: boolean
): [boolean, () => void, () => void] {
  const [open, setIsOpen] = useState(initialIsOpen ?? false);
  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);
  return [open, openDialog, closeDialog];
}
