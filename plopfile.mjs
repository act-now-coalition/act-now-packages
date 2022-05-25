import _ from "lodash";

const templateReadme = prepareTemplate(`
# {{> packageName}}

{{> packageDescription}}
`);

const templatePackage = prepareTemplate(`
{
  "name": "@actnowcoalition/{{> packageName}}",
  "version": "1.0.0",
  "description": "{{> packageDescription}}",
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
  plop.setPartial("packageName", "{{dashCase name}}");
  plop.setPartial("packageDescription", "{{sentenceCase description}}");
  plop.setGenerator("package", {
    description: "",
    prompts: [
      { type: "input", name: "name", message: "" },
      { type: "input", name: "description", message: "" },
    ],
    actions: [
      {
        type: "add",
        path: `packages/{{> packageName}}/README.md`,
        template: templateReadme,
      },
      {
        type: "add",
        path: `packages/{{> packageName}}/src/index.ts`,
        template: "",
      },
      {
        type: "add",
        path: `packages/{{> packageName}}/package.json`,
        template: templatePackage,
      },
      {
        type: "add",
        path: `packages/{{> packageName}}/LICENSE`,
        templateFile: "./LICENSE",
      },
    ],
  });
}

function prepareTemplate(srcTemplate) {
  return _.trimStart(srcTemplate);
}
