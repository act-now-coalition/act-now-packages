/**
 * Plop is a tool that saves time and helps scaffolding code with consistency.
 *
 * See https://plopjs.com/documentation/ for more details.
 */
import { exec } from "child_process";
import _ from "lodash";

const templateComponentMain = prepareTemplate(`
import React from "react";
import { Container } from "./{{pascalCase name}}.style";

export interface {{pascalCase name}}Props {

}

export const {{pascalCase name}} = (props: {{pascalCase name}}Props) => {
  return <Container>{{pascalCase name}}</Container>;
};
`);

const templateComponentStories = prepareTemplate(`
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { {{pascalCase name}} } from ".";

export default {
  title: "Components/{{pascalCase name}}",
  component: {{pascalCase name}},
} as ComponentMeta<typeof {{pascalCase name}}>;

const Template: ComponentStory<typeof {{pascalCase name}}> = (args) => (
  <{{pascalCase name}} {...args} />
);

export const Example = Template.bind({});
Example.args = {};
`);

const templateComponentStyles = prepareTemplate(`
import { styled } from "../../styles";

export const Container = styled("div")\`\`;
`);

const templateComponentIndex = prepareTemplate(`
export * from "./{{pascalCase name}}";
`);

export default function (/** @type {import('plop').NodePlopAPI} */ plop) {
  /**
   * Sets a custom action type to run `yarn` on the root directory, which
   * will install the new package dependencies on its directory. Note that
   * it will only include typescript, any other dependencies will still
   * need to be added after creating the package.
   */
  plop.setActionType("yarn", function () {
    exec(`yarn`, function (error, stdout) {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(stdout);
    });
  });

  const componentBasePath = "packages/ui-components/src/components";
  plop.setGenerator("component", {
    description: "Creates a component module with stories, styles and index.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/index.ts`,
        template: templateComponentIndex,
      },
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        template: templateComponentMain,
      },
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx`,
        template: templateComponentStories,
      },
      {
        type: "add",
        path: `${componentBasePath}/{{pascalCase name}}/{{pascalCase name}}.style.ts`,
        template: templateComponentStyles,
      },
      {
        type: "append",
        path: `packages/ui-components/src/index.ts`,
        template: 'export * from "./components/{{pascalCase name}}";',
        unique: true,
      },
    ],
  });
}

function prepareTemplate(srcTemplate) {
  return _.trimStart(srcTemplate);
}
