![Yo Repo! A Yeoman generator for awesome repositories](https://raw.githubusercontent.com/seantrane/yo-repo/master/src/_resources/header.png)

[![Build Status](https://travis-ci.com/seantrane/yo-repo.svg?branch=master)](https://travis-ci.com/seantrane/yo-repo) [![Dependencies Status](https://david-dm.org/seantrane/yo-repo/status.svg)](https://david-dm.org/seantrane/yo-repo) [![devDependencies Status](https://david-dm.org/seantrane/yo-repo/dev-status.svg)](https://david-dm.org/seantrane/yo-repo?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/seantrane/yo-repo.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![npm latest version](https://img.shields.io/npm/v/seantrane/generator-repo/latest.svg)](https://www.npmjs.com/package/seantrane/generator-repo) [![npm next version](https://img.shields.io/npm/v/seantrane/generator-repo/next.svg)](https://www.npmjs.com/package/seantrane/generator-repo) [![npm downloads per week](https://img.shields.io/npm/dw/seantrane/generator-repo.svg)](https://www.npmjs.com/package/seantrane/generator-repo) [![npm total downloads](https://img.shields.io/npm/dt/seantrane/generator-repo.svg)](https://www.npmjs.com/package/seantrane/generator-repo)

## Table of Contents

- [About the Generator](#about)
  - [Features](#features)
- [Install](#install)
- [Usage](#usage)
  - [Quickstart](#quickstart)
  - [Instructions](#instructions)
- [Support](#support)
- [Contributing](#contributing)
- [Changelog](#changelog)

---

## About the Generator <a id="about"></a>

> _Yo Repo!_ is a [Yeoman](http://yeoman.io) generator, used for generating awesome repositories that exhibit the highest standards of repository management.

### Features <a id="features"></a>

- Complete, one-stop solution for starting any repo/package/etc.
- Opinionated, implementing common standards and [best practices](https://bestpractices.coreinfrastructure.org).
- Helpful, friendly and informative CLI prompts.
- Pre-fill of prompt values using existing resources.

## Install <a id="install"></a>

Install, or update, [Yeoman](http://yeoman.io):

```sh
npm install -g yo
```

Install _Yo Repo!_ generator:

```sh
npm install -g generator-repo
```

## Usage <a id="usage"></a>

### Quickstart <a id="quickstart"></a>

Run _Yo Repo!_ from your project directory:

```sh
cd path/to/your/project/directory
yo repo
```

### Instructions <a id="instructions"></a>

_Yo Repo!_ is developed using what Yeoman calls [_composability_](http://yeoman.io/authoring/composability.html), described as; _"a way to combine smaller parts to make one large thing"_. _Yo Repo!_ is comprised of many sub-generators that are assembled into _recipes_ based on individual requirements. These sub-generators can be called individually and even reused outside of the context of _Yo Repo!_

#### Sub-generators

- [x] **Git Init**: `yo repo gitinit`
- [ ] **Package**: `yo repo package`
- [x] **License**: `yo repo license`
- [x] **Readme**: `yo repo readme`
  - [x] Badges/shields
- [x] **Contributing**: `yo repo contributing`
- [x] **Roadmap**: `yo repo roadmap`
- [x] **Continuous Integration**: `yo repo ci`
  - [x] Travis CI
- [ ] **Dependencies**: `yo repo deps`
  - [ ] Angular
  - [ ] Express
  - [ ] React
  - [ ] TypeScript

### Command-line Interface (CLI) <a id="cli"></a>

```sh
# TBD
```

> :point_up: _more instructions coming soon._

---

## Support <a id="support"></a>

Submit an [issue](https://github.com/seantrane/yo-repo/issues/new)

## Contribute <a id="contribute"></a>

Contributions are always appreciated. Read [CONTRIBUTING.md](https://github.com/seantrane/yo-repo/blob/master/CONTRIBUTING.md) documentation to learn more.

## Changelog <a id="changelog"></a>

Release details are documented in the [CHANGELOG.md](https://github.com/seantrane/yo-repo/blob/master/CHANGELOG.md) file, and on the [GitHub Releases page](https://github.com/seantrane/yo-repo/releases).

---

## License <a id="license"></a>

MIT License

Copyright (c) 2018 Sean Trane Sciarrone

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
