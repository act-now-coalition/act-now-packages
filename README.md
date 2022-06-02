# act-now-packages

> NPM Packages for Act Now Coalition

This is a multi-package repository to host NPM packages for the [Act Now Coalition](https://actnowcoalition.org).

See all the [Act Now Coalition packages](https://www.npmjs.com/search?q=keywords:actnowcoalition)

## Setup

Make sure you have [Node.js](https://nodejs.org/en/) installed. We recommend using [nvm](https://github.com/nvm-sh/nvm) to quickly install and use different versions of node via the command line. In this project, we use Node 16 (the latest LTS version).

```sh
nvm install v16
nvm use v16
```

## Worflow

### Creating a package

In order to keep packages consistent with each other, we implemented the yarn command `create-package` to scaffold the initial package structure. To create a package, run:

```sh
yarn create-package
```

The command will prompt for the package name and description. Package names should be short and descriptive (see [npm package.json#name](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name) for more details). The `create-package` command will normalize the package name and description for you.

```
yarn create-package
yarn run v1.22.17
$ yarn plop package
? name: date format
? description: utility functions to format dates
✔  ++ /packages/date-format/README.md
✔  ++ /packages/date-format/src/index.ts
✔  ++ /packages/date-format/package.json
✔  ++ /packages/date-format/LICENSE
✔  yarn
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
$ husky install
husky - Git hooks installed
```

This will create the initial directory structure and starter files, and install the initial package dependencies, see [`packages/assert`](https://github.com/covid-projections/act-now-packages/tree/develop/packages/assert) to see an example of a package.

You can now add more files, dependencies, and update the README file. Make sure to export the package functionality from the `index.ts` file in the package. We strongly recommend to include unit tests in your package before publishing.

### Publishing

Once the code is merged to `develop`, we can publish the package using GitHub actions. To publish your package

1. Go to _[GitHub Actions → Publish Package](https://github.com/covid-projections/act-now-packages/actions/workflows/publish-package.yml)_ and click _Run workflow_
2. Complete the name of the package
3. Click _Run workflow_

This will publish the package to NPM, you should be able to see it in [NPM](https://www.npmjs.com/search?q=keywords:actnowcoalition).

### Installing the package

If you want to use the package on a different project, you can install it as you would normally do with any other package. For example, to install `assert` on a different repository, just go to that project and run:

```sh
yarn add @actnowcoalition/assert
```

If you need a specific version, you can install

```sh
yarn add @actnowcoalition/assert@1.0.1
```

### Updating a package

If you change the code on a package, you will need to update its version number and re-publish the package. We use [semantic versioning](https://semver.org/) to determine what the new version number should be.

## Links

- [Semantic Versioning 2.0](https://semver.org/)
- [Act Now - Frontend file naming convention](https://www.dropbox.com/scl/fi/yhy2bpjivak53tn1dbd53/Frontend-file-naming-convention.paper?dl=0&rlkey=j2kwhzm2gajced4t5lv9hzffc)
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [Yarn CLI - Workspace](https://classic.yarnpkg.com/en/docs/cli/workspace)
