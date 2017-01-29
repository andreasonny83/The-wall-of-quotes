[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# The Wall Of Quotes

> Discover and share quotes and sayings

This is an Angular2 single page web application using Firebase.

## Note

This project is very much still a work in progress.

## Prerequisites

This project has dependencies that require Node 4 or higher
with NPM 3 or higher.

## Table of Contents

*   [Installation](#installation)
*   [Usage](#usage)
*   [Generating a New Project](#generating-and-serving-an-angular2-project-via-a-development-server)
*   [Unit tests](#unit-tests)
*   [Creating a Build](#creating-a-build)
*   [Contributing](#contributing)
*   [Changelog](#changelog)
*   [License](#license)

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Clone your local copy of this repository with:

```bash
git clone git@github.com:andreasonny83/the-wall-of-quotes.git
```

## Usage

### Generating and serving the project via a development server

```bash
npm start
```

Navigate to `http://localhost:8100/`. The app will automatically reload
if you change any of the source files.

### Unit tests

```bash
npm test
```

This task will trigger the unit test task using Karma. All files ending with
`.spec.ts` will be automatically included in the test queue.

### E2E tests

```bash
npm run e2e
```

This task will run a series of E2E test using Protractor. All files ending with
`.e2e-spec.ts` will be automatically included in the test queue.
The task is aimed to verify that all the elements and components are correctly
rendered on the user's screen on different browsers / screen sizes.

### Creating a build

```bash
npm build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D


## Changelog

Changelog available [here](https://github.com/andreasonny83/the-wall-of-quotes/blob/master/CHANGELOG.md)

## License

[MIT License](https://github.com/andreasonny83/the-wall-of-quotes/blob/master/LICENSE)
© Andrea SonnY
