import React from "react";

import { Container } from "./Dialog.style";

export interface DialogProps {
  /**
   * This is a prop example
   */
  example: string;
}

export const Dialog = (props: DialogProps) => {
  console.log("props", props);
  return <Container>Dialog</Container>;
};
