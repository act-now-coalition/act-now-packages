# act-now-packages

NPM Packages for Act Now Coalition

## Getting started

## Installing package dependencies

Each package should have its dependencies. To install a dependency for one of the packages, go to the package folder and install the dependency as usual. For example:

```sh
cd packages/date-utils
yarn add luxon
```

For shared dependencies, install them at the root level, passing the `-W` (or `--ignore-workspace-root-check`) option. Example:

```sh
yarn add --dev -W jest
```

## Links

- [Act Now - Frontend file naming convention](https://www.dropbox.com/scl/fi/yhy2bpjivak53tn1dbd53/Frontend-file-naming-convention.paper?dl=0&rlkey=j2kwhzm2gajced4t5lv9hzffc)
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
