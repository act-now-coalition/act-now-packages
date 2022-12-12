import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InlineMarkdown, Markdown } from ".";
import { styled } from "../../styles";

export default {
  title: "Components/Markdown",
  component: Markdown,
} as ComponentMeta<typeof Markdown>;

const Template: ComponentStory<typeof Markdown> = (args) => (
  <Markdown {...args} />
);

// Styled markdown example
const StyledMarkdown = styled(Markdown)`
  color: green;
`;

const StyledTemplate: ComponentStory<typeof StyledMarkdown> = (args) => (
  <StyledMarkdown {...args} />
);

export const WithColoredText = StyledTemplate.bind({});
WithColoredText.args = { children: "Styled markdown example with green text!" };

// Headings example
const headings = `
# Heading 1 
  
## Heading 2

### Heading 3

I am **bold!**

I am *italicized!*  
`;

export const WithHeadings = Template.bind({});
WithHeadings.args = { children: headings };

// Quote example
const quote = `
> I am a nested quote.

>> Including sub-points... 

>> - Point 1 is plain. 

>> - \`Point 2 is code\` 

>> - Point 3 has an image underneath. 

>> ![Cat](https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg)`;

export const WithQuoteAndImage = Template.bind({});
WithQuoteAndImage.args = { children: quote };

// Table example
const tableContent = `
| Col 1     | Col 2     | Col 3     |
|-----------|-----------|-----------|
| Content 1 | Content 2 | Content 3 |
| Content 4 | Content 5 | Content 6 |
`;

export const WithTable = Template.bind({});
WithTable.args = { children: tableContent };

// Inline markdown example
const InlineTemplate: ComponentStory<typeof InlineMarkdown> = (args) => (
  <InlineMarkdown {...args} />
);

export const Inline = InlineTemplate.bind({});
Inline.args = { children: "Inline **markdown** example!" };
