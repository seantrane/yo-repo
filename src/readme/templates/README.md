# <%= packageName %>

> <%= description %>

<%
if (typeof badges !== 'undefined' && badges.length > 0) {
  %><%
  if (badges.indexOf('travis') !== -1) {
    %>[![Build Status](https://travis-ci.com/<%= profile %>/<%= repositoryName %>.svg?branch=master)](https://travis-ci.com/<%= profile %>/<%= repositoryName %>)&nbsp;<%
  } %><%
  if (badges.indexOf('codecov') !== -1) {
    %>[![codecov](https://codecov.io/gh/<%= profile %>/<%= repositoryName %>/branch/master/graph/badge.svg)](https://codecov.io/gh/<%= profile %>/<%= repositoryName %>)&nbsp;<%
  } %><%
  if (badges.indexOf('coveralls') !== -1) {
    %>[![Coverage Status](https://coveralls.io/repos/github/<%= profile %>/<%= repositoryName %>/badge.svg?branch=master)](https://coveralls.io/github/<%= profile %>/<%= repositoryName %>?branch=master)&nbsp;<%
  } %><%
  if (badges.indexOf('david') !== -1) {
    %>[![Dependencies Status](https://david-dm.org/<%= profile %>/<%= repositoryName %>/status.svg)](https://david-dm.org/<%= profile %>/<%= repositoryName %>)&nbsp;<%
  } %><%
  if (badges.indexOf('davidDev') !== -1) {
    %>[![devDependencies Status](https://david-dm.org/<%= profile %>/<%= repositoryName %>/dev-status.svg)](https://david-dm.org/<%= profile %>/<%= repositoryName %>?type=dev)&nbsp;<%
  } %><%
  if (badges.indexOf('greenkeeper') !== -1) {
    %>[![Greenkeeper badge](https://badges.greenkeeper.io/<%= profile %>/<%= repositoryName %>.svg)](https://greenkeeper.io/)&nbsp;<%
  } %><%
  if (badges.indexOf('commitizen') !== -1) {
    %>[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)&nbsp;<%
  } %><%
  if (badges.indexOf('semantic-release') !== -1) {
    %>[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)&nbsp;<%
  } %>

<%
  if (badges.indexOf('npm') !== -1) {
    %>[![npm latest version](https://img.shields.io/npm/v/<%= scopedEncoded || repositoryName %>/latest.svg)](https://www.npmjs.com/package/<%= scopedEncoded || repositoryName %>)&nbsp;[![npm next version](https://img.shields.io/npm/v/<%= scopedEncoded || repositoryName %>/next.svg)](https://www.npmjs.com/package/<%= scopedEncoded || repositoryName %>)&nbsp;[![npm downloads per week](https://img.shields.io/npm/dw/<%= scopedEncoded || repositoryName %>.svg)](https://www.npmjs.com/package/<%= scopedEncoded || repositoryName %>)&nbsp;[![npm total downloads](https://img.shields.io/npm/dt/<%= scopedEncoded || repositoryName %>.svg)](https://www.npmjs.com/package/<%= scopedEncoded || repositoryName %>)&nbsp;<%
  } %><%
  if (badges.indexOf('gitter') !== -1) {
    %>[![Join the chat at https://gitter.im/<%= profile %>](https://badges.gitter.im/<%= profile %>.svg)](https://gitter.im/<%= profile %>?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)&nbsp;<%
  } %><%
} %>

## Table of Contents

- [About](#about)<% if (typeof features !== 'undefined' && features.length > 0) { %>
  - [Features](#features)<% } %><% if (typeof demoUrl !== 'undefined' && demoUrl.length > 0) { %>
  - [Demo](#demo)<% } %><% if (typeof installation !== 'undefined' && installation.length > 0) { %>
- [Install](#install)<% } %><% if (typeof dependencies !== 'undefined' && dependencies.length > 0) { %>
  - [Dependencies](#dependencies)<% } %>
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## About the App <a id="about"></a>
<% if (typeof features !== 'undefined' && features.length > 0) { %>
### Features <a id="features"></a>

<% for (var i in features) { %>
- <%= features[i] %><% } %>
<% } %><% if (typeof demoUrl !== 'undefined' && demoUrl.length > 0) { %>
### Demo <a id="demo"></a>

See a [demo](<%= demoUrl %>)

<% } %>
<% if (typeof installation !== 'undefined' && installation.length > 0) { %>
## Install <a id="install"></a>

```sh
<%= installation %>
```
<% } %>
<% if (typeof dependencies !== 'undefined' && dependencies.length > 0) { %>
### Dependencies <a id="dependencies"></a>

<% for (var i in dependencies) { %>
- [<%= dependencies[i].name %>](<%= dependencies[i].url %>)<% } %>
<% } %>

## Usage <a id="usage"></a>

```sh
# CLI:
```

> :point_up: _more instructions coming soon._

---

## Support <a id="support"></a>

[Submit an issue](<%= repositoryUrl %>/issues/new), in which you should provide as much detail as necessary for your issue.

## Contributing <a id="contributing"></a>

Contributions are always appreciated. Read [CONTRIBUTING.md](<%= repositoryUrl %>/blob/master/CONTRIBUTING.md) documentation to learn more.

## Changelog <a id="changelog"></a>

Release details are documented in the [CHANGELOG.md](<%= repositoryUrl %>/blob/master/CHANGELOG.md) file, and on the [GitHub Releases page](<%= repositoryUrl %>/releases).

---

## License <a id="license"></a>

[<%= license %> License](<%= repositoryUrl %>/blob/master/LICENSE)

Copyright (c) <%= new Date().getFullYear() %> [<%= authorName || username %>](<%= authorUrl || repositoryUrl %>)
