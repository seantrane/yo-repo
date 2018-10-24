# Contributing

> Thank you for contributing. Contributions are always welcome, no matter how large or small.

## Table of Contents

- [Guidelines](#guidelines)
- [Pull Requests](#pull-requests)
- [Clone the Repository](#clone-repo)
- [Install Dependencies](#install-dependencies)
- [File Structure](#file-structure)

---

## Guidelines <a id="guidelines"></a>

As a contributor, here are the guidelines you should follow:

- [Code of conduct](https://github.com/seantrane/engineering/blob/master/CODE_OF_CONDUCT.md)
- [How can I contribute?](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#how-can-i-contribute)
- [Using the issue tracker](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#using-the-issue-tracker)
- [Submitting a Pull Request](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#submitting-a-pull-request)
- [Coding rules](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#coding-rules)
- [Working with code](https://github.com/seantrane/engineering/blob/master/CONTRIBUTING.md#working-with-code)

We also recommend to read [How to Contribute to Open Source](https://opensource.guide/how-to-contribute).

---

## Pull Requests <a id="pull-requests"></a>

Thank you for contributing.

- Create your branch from `master`.
- Ensure your [git commit messages follow the required format](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#git-commit-messages).
- Ensure your scripts are well-formed, well-documented and object-oriented.
- Ensure your scripts are stateless and can be reused by all.
- Update your branch, and resolve any conflicts, before making pull request.
- Fill in [the required template](https://github.com/seantrane/engineering/blob/master/PULL_REQUEST_TEMPLATE.md).
- Do not include issue numbers in the PR title.
- Include screenshots and animated GIFs in your pull request whenever possible.
- Follow the [style guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md) [applicable to the language](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#languages) or task.
- Include thoughtfully-worded, well-structured tests/specs. See the [Tests/Specs Style Guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#tests).
- Document new code based on the [Documentation Style Guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#documentation).
- End all files with a newline.

---

## Clone the Repository <a id="clone-repo"></a>

```bash
git clone https://github.com/seantrane/yo-repo.git yo-repo && cd yo-repo
```

## Install Dependencies <a id="install-dependencies"></a>

```bash
# Install dependecies:
npm install
# Link npm package to your global namespace:
npm link
```

---

## Dependency Links <a id="dependency-links"></a>

- [Chalk](https://github.com/chalk/chalk): Terminal string styling done right
- [Commander.js](https://github.com/tj/commander.js): Node.js command-line interfaces made easy
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js): A collection of common interactive command line user interfaces.
- [ShellJS](https://github.com/shelljs/shelljs): Unix shell commands for Node.js
- [Build An Interactive Command-Line Application with Node.js](https://scotch.io/tutorials/build-an-interactive-command-line-application-with-nodejs)

---

## File Structure <a id="file-structure"></a>

```text
yo-repo/
 ├─ generators/                * compiled: the directory containing generators
 │   ├─ app/                   * compiled: the primary generator command (yo name)
 │   │   ├─ templates/         * compiled: yeoman generator templates directory (optional)
 │   │   ├─ index.d.js         * compiled: typescript definition file
 │   │   ├─ index.js           * compiled: yeoman generator javascript file
 │   │   └─ index.js.map       * compiled: javascript source map
 │   │
 │   ├─ <subcommand>/          * compiled: a generator sub-command (yo name:subcommand)
 │   │   ├─ templates/         * compiled: yeoman generator templates directory (optional)
 │   │   ├─ index.d.js         * compiled: typescript definition file
 │   :   ├─ index.js           * compiled: yeoman generator javascript file
 │   :   └─ index.js.map       * compiled: javascript source map
 │
 ├─ src/                       * source: the directory containing generators source code
 │   ├─ app/                   * source: the primary generator command (yo name)
 │   │   ├─ templates/         * source: yeoman generator templates directory (optional)
 │   │   ├─ index.spec.ts      * source: yeoman generator unit tests
 │   │   └─ index.ts           * source: yeoman generator typescript file
 │   │
 │   ├─ <subcommand>/          * source: a generator sub-command (yo name:subcommand)
 │   │   ├─ templates/         * source: yeoman generator templates directory (optional)
 │   :   ├─ index.spec.ts      * source: yeoman generator unit tests
 │   :   └─ index.ts           * source: yeoman generator typescript file
 │
 ├─ temp/                      * tests: directory for run e2e tests
 │
 ├─ .markdownlint.yaml         * markdown lint rules and config
 ├─ .npmignore                 * npm publish ignore rules
 ├─ CONTRIBUTING.md            * contributing guidelines
 ├─ CHANGLOG.md                * changelog autogenerated by `@semantic-release/changelog`
 ├─ mocha.opts                 * mocha config
 ├─ package-lock.json          * npm package dependency lock file
 ├─ package.json               * npm package config
 ├─ README.md                  * package readme
 ├─ ROADMAP.md                 * package roadmap
 ├─ tsconfig.json              * typescript compiler config
 ├─ tslint.json                * typescript lint config
 └─ typedoc.json               * typescript documentation generator config
```

---

#### Happy coding!
