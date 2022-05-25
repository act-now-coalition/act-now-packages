/**
 * Plop is a tool that saves time and helps scaffolding code with consistency.
 *
 * See https://plopjs.com/documentation/ for more details.
 */

import _ from "lodash";
import { exec } from "child_process";

const templateReadme = prepareTemplate(`
# {{dashCase name}}

{{sentenceCase description}}
`);

const templatePackage = prepareTemplate(`
{
  "name": "@actnowcoalition/{{dashCase name}}",
  "version": "1.0.0",
  "description": "{{sentenceCase description}}",
  "repository": {
    "type": "git",
    "url": "git@github.com:covid-projections/act-now-packages.git"
  },
  "author": "Act Now Coalition",
  "license": "MIT",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "scripts": {
    "build": "tsc src/index.ts --outDir lib --declaration"
  },
  "devDependencies": {
    "typescript": "^4.6.4"
  }
}`);

export default function (/** @type {import('plop').NodePlopAPI} */ plop) {
  /**
   * Sets a custom action type to run `yarn` on the new package folder. Note
   * that it will only include typescript, any other dependencies will still
   * need to be added after creating the package.
   */
  plop.setActionType("yarn", function (answers, config, plop) {
    const dashCase = plop.getHelper("dashCase");
    const command = `cd packages/${dashCase(answers.name)}; yarn; cd ../..;`;
    exec(command, function (error, stdout) {
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
        type: "yarn",
      },
    ],
  });
}

function prepareTemplate(srcTemplate) {
  return _.trimStart(srcTemplate);
}
