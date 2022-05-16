# act-now-packages

NPM Packages for Act Now Coalition

## Getting started

## Installing package dependencies

Each package should have its own set of dependencies. For example, if the package `date-utils` needs `luxon`, the `luxon` library should be added as dependency on the `date-utils/package.json` file, and not on the root `package.json` file.

```sh
cd packages/date-utils
yarn add luxon
```

or alternatively (see the [`yarn worksapce`](https://classic.yarnpkg.com/en/docs/cli/workspace) documentation):

```sh
yarn workspace @covid-projections/date-utils add luxon
```

For dependencies only used to support the development workflow (testing, linting, etc.) that are shared across packages, install them at the root level. To install a dependency at the root level, we need to pass the `-W` (`--ignore-workspace-root-check`) option. Example:

```sh
yarn add --dev jest -W
```

## Links

- [Act Now - Frontend file naming convention](https://www.dropbox.com/scl/fi/yhy2bpjivak53tn1dbd53/Frontend-file-naming-convention.paper?dl=0&rlkey=j2kwhzm2gajced4t5lv9hzffc)
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [Yarn CLI - Workspace](https://classic.yarnpkg.com/en/docs/cli/workspace)
