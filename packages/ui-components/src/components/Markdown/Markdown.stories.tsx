import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Markdown from ".";
import InlineMarkdown from ".";
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
  children: "Plain markdown example!",
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
  children: "Styled markdown example!",
};

// Headings example

export const HeadingExample = Template.bind({});
HeadingExample.args = {
  children:
    "# Heading 1 \n ## Heading 2 \n ### Heading 3 \n I am **bold!** \n\n I am *italicized!*",
};

// Quote example

export const QuoteExample = Template.bind({});
QuoteExample.args = {
  children:
    "> I am a nested quote.\n\n>> Including sub-points... \n\n>> - Point 1 is plain. \n\n>> - `Point 2 is code` \n\n>> - Point 3 has an image underneath. \n\n>> ![Cat](https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg)",
};

// Table example

export const TableExample = Template.bind({});

const tableStruct = `
| heading | b  |  c |  d  |
| - | :- | -: | :-: |
| cell 1 | cell 2 | 3 | 4 | 
`;

TableExample.args = {
  children: tableStruct,
};

// Inline markdown example

const InlineTemplate: ComponentStory<typeof InlineMarkdown> = (args) => (
  <InlineMarkdown {...args} />
);

export const InlineExample = InlineTemplate.bind({});
InlineExample.args = {
  children: "Plain markdown example!",
};

// Styled inline markdown example

const StyledInlineMarkdown = styled(InlineMarkdown)`
  color: green;
`;

const StyledInlineTemplate: ComponentStory<typeof StyledInlineMarkdown> = (
  args
) => <StyledInlineMarkdown {...args} />;

export const StyledInlineExample = StyledInlineTemplate.bind({});
StyledInlineExample.args = {
  children: "Styled markdown example!",
};
