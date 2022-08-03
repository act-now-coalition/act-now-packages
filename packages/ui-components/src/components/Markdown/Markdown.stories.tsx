import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Markdown from ".";
import { styled } from "../../styles";

export default {
  title: "Components/Markdown",
  component: Markdown,
} as ComponentMeta<typeof Markdown>;

// Plain markdown example

const Template: ComponentStory<typeof Markdown> = (args) => (
  <Markdown {...args} />
);

export const PlainExample = Template.bind({});
PlainExample.args = {
  body: "Plain markdown example!",
};

// Styled markdown example

const StyledMarkdown = styled(Markdown)`
  color: green;
`;

const StyledTemplate: ComponentStory<typeof StyledMarkdown> = (args) => (
  <StyledMarkdown {...args} />
);

export const StyledExample = StyledTemplate.bind({});
StyledExample.args = {
  body: "Styled markdown example!",
};
