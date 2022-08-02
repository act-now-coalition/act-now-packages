/**
 * Plop is a tool that saves time and helps scaffolding code with consistency.
 *
 * See https://plopjs.com/documentation/ for more details.
 */

import _ from "lodash";
import { exec } from "child_process";

const templateReadme = prepareTemplate(`
# @actnowcoalition/{{dashCase name}}

> {{sentenceCase description}}

## Installing

\`\`\`sh
yarn add @actnowcoalition/{{dashCase name}}
\`\`\`

## License

[MIT](./LICENSE)
`);

const templatePackage = prepareTemplate(`
{
  "name": "@actnowcoalition/{{dashCase name}}",
  "version": "1.0.0",
  "description": "{{sentenceCase description}}",
  "repository": {
    "type": "git",
    "url": "https://github.com/covid-projections/act-now-packages.git",
    "directory": "packages/{{dashCase name}}"
  },
  "keywords": [
    "actnowcoalition"
  ],
  "author": "Act Now Coalition",
  "license": "MIT",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build:esm": "tsc --project ./tsconfig.esm.json",
    "build:cjs": "tsc --project ./tsconfig.cjs.json",
    "build": "yarn build:esm && yarn build:cjs"
  },
  "devDependencies": {
    "typescript": "^4.6.4"
  },
  "sideEffects": false
}`);

const templateTSConfigBase = prepareTemplate(`
{
  "extends": "../../tsconfig",
  "compilerOptions": {
    "baseUrl": "src",
    "declaration": true,
    "declarationDir": "./dist",
    "noEmit": false,
    "rootDir": "src"
  },
  "include": ["src/**/*.ts", "src/**/*.json"],
  "exclude": ["node_modules", "**/*.test.*"]
}
`);

const templateTSConfigCJS = prepareTemplate(`
{
  "extends": "./tsconfig.base",
  "compilerOptions": {
    "module": "CommonJS",
    "outDir": "./dist/cjs/"
  }
}
`);

const templateTSConfigESM = prepareTemplate(`
{
  "extends": "./tsconfig.base",
  "compilerOptions": {
    "module": "ESNext",
    "outDir": "./dist/esm/"
  }
}
`);

const templateComponentMain = prepareTemplate(`
import React from "react";
import { Container } from "./{{pascalCase name}}.style";

const {{pascalCase name}}: React.FC = () => {
  return <Container>{{pascalCase name}}</Container>;
};

export default {{pascalCase name}};
`);

const templateComponentStories = prepareTemplate(`
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {{pascalCase name}} from ".";

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
export { default } from "./{{pascalCase name}}";
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

  plop.setGenerator("package", {
    description: "",
    prompts: [
      { type: "input", name: "name" },
      { type: "input", name: "description" },
    ],
    actions: [
      {
        type: "add",
        path: `packages/{{dashCase name}}/README.md`,
        template: templateReadme,
      },
      {
        type: "add",
        path: `packages/{{dashCase name}}/src/index.ts`,
        template: "",
      },
      {
        type: "add",
        path: `packages/{{dashCase name}}/package.json`,
        template: templatePackage,
      },
      {
        type: "add",
        path: `packages/{{dashCase name}}/LICENSE`,
        templateFile: "./LICENSE",
      },
      {
        type: "add",
        path: `packages/{{dashCase name}}/tsconfig.base.json`,
        template: templateTSConfigBase,
      },
      {
        type: "add",
        path: `packages/{{dashCase name}}/tsconfig.cjs.json`,
        template: templateTSConfigCJS,
      },
      {
        type: "add",
        path: `packages/{{dashCase name}}/tsconfig.esm.json`,
        template: templateTSConfigESM,
      },
      {
        type: "append",
        path: ".github/workflows/publish-package.yml",
        pattern: "package-list",
        template: "          - {{dashCase name}}",
        unique: true,
      },
      {
        type: "yarn",
      },
    ],
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
        template:
          'export { default as {{pascalCase name}} } from "./components/{{pascalCase name}}";',
        unique: true,
      },
    ],
  });
}

function prepareTemplate(srcTemplate) {
  return _.trimStart(srcTemplate);
}
