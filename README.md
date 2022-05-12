# act-now-packages

NPM Packages for Act Now Coalition

## Getting started

### Creating a package

Boilerplate to create a package, keeping consistent file name conventions and structure. Plop will only generate the basics, you will need to add additional files, tests, etc.

```sh
yarn create-package
yarn run v1.22.17
$ plop package
? package name: number format
? version number: 1.0.0
? description: number formatting utils
✔  ++ /packages/number_format/README.md
✔  ++ /packages/number_format/package.json
✔  ++ /packages/number_format/src/index.ts
✨  Done in 11.27s.
```

## Installing package dependencies

Each package should have its own dependencies. To install a dependency for one of the packages, go to the package folder and install the dependency as usual. Example:

```sh
cd packages/date-utils
yarn add luxon
```

Each package will have its own dependencies. For development dependencies that should be shared across packages, install them at the root level, passing the `-W` (or `--ignore-workspace-root-check`) option. Example:

```sh
yarn add --dev -W jest
```

## Links

- [Act Now - Frontend file naming convention](https://www.dropbox.com/scl/fi/yhy2bpjivak53tn1dbd53/Frontend-file-naming-convention.paper?dl=0&rlkey=j2kwhzm2gajced4t5lv9hzffc)
