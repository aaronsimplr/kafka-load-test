[![TypeScript version][ts-badge]][typescript-39]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]
[![Sponsor][sponsor-badge]][sponsor]

# simplr-typescript-node-template

👩🏻‍💻 A comprehensive typescript template for Node.js. Based on [node-typescript-boilerplate][orig-project] project.

🏃🏽 Instant Value: All basic tools included and configured:

+ [TypeScript][typescript] [3.9][typescript-39]
+ [ESLint][eslint] with some initial rules recommendation
+ [Jest][jest] for fast unit testing and code coverage
+ Type definitions for Node.js and Jest
+ [Prettier][prettier] to enforce consistent code style
+ NPM [scripts](#available-scripts) for common operations
+ simple example of TypeScript code and unit test
+ .editorconfig for consistent file format
+ example configuration for [GitHub Actions][gh-actions] and [Travis CI][travis]

## Simplr specific additions
+ Node.js Express wiring
+ Clear separation between routes, controllers and services, including examples for each
+ JWT middleware
+ Simplr's standard environment initialization, logger and New Relic integration
+ Unit and integration tests
+ Default Dockerfile
+ git workflow that runs lint, tests and builds the docker container for every PR

## Getting Started

### Use as a repository template

+ To start, just click the **[Use this template][repo-template-action]** link (or the green button). 
+ Choose a unique name, keep the repo Private, and keep the `Include all branches` box unchecked.
+ Cut `develop` branch from `master` branch. You will need to apply some additional settings for this repo, please  consult with someone in order to do it (a separate guide will be created)
+ Now clone the repo and start adding your code in the `src` and unit tests in the `test` directories. Remove unnecessary example files - both source code and tests.


## Available Scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
+ `start` - run the transpiled project from `build/src` folder
+ `build:run` - rebuild and start

## Additional Informations

### Writing tests in JavaScript

Writing unit tests in TypeScript can sometimes be troublesome and confusing. Especially when mocking dependencies and using spies. This is why in this project, **tests are in JavaScript**.

## License
Original project is licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.9-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2012.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[travis-ci]: https://travis-ci.org/jsynowiec/node-typescript-boilerplate
[gha-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fjsynowiec%2Fnode-typescript-boilerplate%2Fbadge&style=flat
[gha-ci]: https://github.com/jsynowiec/node-typescript-boilerplate/actions
[typescript]: https://www.typescriptlang.org/
[typescript-39]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE

[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/jsynowiec

[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io
[gh-actions]: https://github.com/features/actions

[repo-template-action]: https://github.com/SimplrSupport/simplr-typescript-node-template/generate

[orig-project]: https://github.com/jsynowiec/node-typescript-boilerplate
