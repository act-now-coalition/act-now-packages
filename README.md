# act-now-packages

> NPM Packages for Act Now Coalition

This is a multi-package repository to host NPM packages for the [Act Now Coalition](https://actnowcoalition.org).

- [Act Now Coalition packages on npm](https://www.npmjs.com/search?q=keywords:actnowcoalition)
- [API Reference Docs](https://act-now-packages.web.app/docs/)
- [Storybook of UI components](https://act-now-packages.web.app/storybook/)

## Setup

Make sure you have [Node.js](https://nodejs.org/en/) installed. We recommend using [nvm](https://github.com/nvm-sh/nvm) to quickly install and use different versions of node via the command line. In this project, we use Node 16 (the latest LTS version).

```sh
nvm install v16
nvm use v16
```

## Workflow

### Publishing

Once the code is merged to `develop`, we can publish the package by merging the `changeset-release/develop` branch to `develop`. To publish your package

1. Go to the `changeset-release/develop` branch. This should be titled "Version Packages" and should be automatically generated when we ship updates with [changesets](https://github.com/changesets/changesets#readme) attached to their PRs. If there is no `changeset-release/develop` branch, then no changeset has been detected since the last package release.
2. Once step one is complete, the updated package should be published on NPM. Check our [Github Actions](https://github.com/act-now-coalition/act-now-packages/actions/workflows/release.yml) page or [NPM](https://www.npmjs.com/search?q=keywords:actnowcoalition) to see if it published successfully.
3. In most cases, it is good practice to also update [Act Now Template](https://github.com/act-now-coalition/act-now-template) to use the newly updated package. More information [here](https://github.com/act-now-coalition/act-now-template#readme).

### Installing the package

If you want to use the package on a different project, you can install it as you would normally do with any other package. For example, to install the package on a different repository, just go to that project and run:

```sh
yarn add @actnowcoalition/actnow.js
```

If you need a specific version, you can install

```sh
yarn add @actnowcoalition/actnow.js@1.0.1
```

### Updating a package

If you change the code on a package, you will need to update its version number and re-publish the package. We use [semantic versioning](https://semver.org/) to determine what the new version number should be.

## Links

- [Semantic Versioning 2.0](https://semver.org/)
- [Act Now - Frontend file naming convention](https://www.dropbox.com/scl/fi/yhy2bpjivak53tn1dbd53/Frontend-file-naming-convention.paper?dl=0&rlkey=j2kwhzm2gajced4t5lv9hzffc)
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [Yarn CLI - Workspace](https://classic.yarnpkg.com/en/docs/cli/workspace)
