import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
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

export const StyledExample = StyledTemplate.bind({});
StyledExample.args = { children: "Styled markdown example!" };

// Headings example
const headings = `
# Heading 1 
  
## Heading 2

### Heading 3

I am **bold!**

I am *italicized!*  
`;

export const HeadingExample = Template.bind({});
HeadingExample.args = { children: headings };

// Quote example
const quote = `
> I am a nested quote.

>> Including sub-points... 

>> - Point 1 is plain. 

>> - \`Point 2 is code\` 

>> - Point 3 has an image underneath. 

>> ![Cat](https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg)`;

export const QuoteExample = Template.bind({});
QuoteExample.args = { children: quote };

// Table example
const tableContent = `
| Col 1     | Col 2     | Col 3     |
|-----------|-----------|-----------|
| Content 1 | Content 2 | Content 3 |
| Content 4 | Content 5 | Content 6 |
`;

export const TableExample = Template.bind({});
TableExample.args = { children: tableContent };

// Inline markdown example
const InlineTemplate: ComponentStory<typeof InlineMarkdown> = (args) => (
  <InlineMarkdown {...args} />
);

export const InlineExample = InlineTemplate.bind({});
InlineExample.args = { children: "Inline **markdown** example!" };
