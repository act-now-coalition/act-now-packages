import { useState } from "react";

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
