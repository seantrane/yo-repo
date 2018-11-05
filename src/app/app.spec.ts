import { expect, should } from 'chai';
import * as fs from 'fs-extra';
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoGenerator } from './';

// Ensure other unit tests are run first:
require('../shared/yo-repo-fetch.spec');
require('../shared/yo-repo-prompts.spec');
require('../ci/ci.spec');
require('../contributing/contributing.spec');
require('../ignore/ignore.spec');
require('../readme/readme.spec');
require('../roadmap/roadmap.spec');

const appSpec = require('./app.spec.json');
const tempDirPath = path.join(__dirname, '../../temp');
const deps = [
  [helpers.createDummyGenerator(), 'license'],
  [helpers.createDummyGenerator(), 'repo:ci'],
  [helpers.createDummyGenerator(), 'repo:contributing'],
  [helpers.createDummyGenerator(), 'repo:ignore'],
  [helpers.createDummyGenerator(), 'repo:readme'],
  [helpers.createDummyGenerator(), 'repo:roadmap'],
];

describe('yo repo:app', function() {

  describe('RepoGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoGenerator).to.respondTo('initializing');
      expect(RepoGenerator).to.respondTo('prompting');
      expect(RepoGenerator).to.respondTo('configuring');
      expect(RepoGenerator).to.respondTo('default');
      expect(RepoGenerator).to.respondTo('writing');
      expect(RepoGenerator).to.respondTo('conflicts');
      expect(RepoGenerator).to.respondTo('install');
      expect(RepoGenerator).to.respondTo('end');
    });

  });

  describe('the generator', function() {

    it('should generate .editorconfig file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        // .withOptions({ foo: 'bar' })          // Mock options passed in
        // .withArguments(['name', ''])          // Mock the arguments
        .withPrompts(appSpec.answers.default) // Mock the prompt answers
        // .withLocalConfig({ lang: 'en' })      // Mock the local config
        // .withGenerators(deps as any)
        .then(function(dir) {
          assert.file('.editorconfig');
          assert.fileContent('.editorconfig', /indent\_style \= space/);
        })
        .catch(done);
    });

    it('should generate .gitignore file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('.gitignore');
        })
        .then(done)
        .catch(done);
    });

    it('should generate .npmignore file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('.npmignore');
        })
        .catch(done);
    });

    it('should generate LICENSE file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('LICENSE');
          assert.fileContent('LICENSE', /MIT License/);
        })
        .catch(done);
    });

    it('should generate CODE_OF_CONDUCT.md file with expected contents', function(done) {
      setTimeout(done, 400);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('CODE\_OF\_CONDUCT.md');
        })
        .catch(done);
    });

    it('should generate CONTRIBUTING.md file with expected contents', function(done) {
      setTimeout(done, 400);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('CONTRIBUTING.md');
        })
        .catch(done);
    });

    it('should generate STYLE_GUIDES.md file with expected contents', function(done) {
      setTimeout(done, 400);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('STYLE\_GUIDES.md');
        })
        .catch(done);
    });

    it('should generate README.md file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('README.md');
        })
        .catch(done);
    });

    it('should generate ROADMAP.md file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('ROADMAP.md');
        })
        .catch(done);
    });

  });

});
