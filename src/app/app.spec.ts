import { expect, should } from 'chai';
import * as fs from 'fs-extra';
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoGenerator } from './';

const appSpec = require('./app.spec.json');

const tempDirPath = path.join(__dirname, '../../temp');

// Ensure Fetch unit tests are run first:
require('../shared/yo-repo-fetch.spec');

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
        .then(function(dir) {
          assert.file('.editorconfig');
          assert.fileContent('.editorconfig', /indent\_style \= space/);
          done();
        })
        .catch(done);
    });

    it('should generate .gitignore and .npmignore files with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('.gitignore');
          assert.file('.npmignore');
          done();
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
          done();
        })
        .catch(done);
    });

    it('should generate contributing-info files with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('CODE\_OF\_CONDUCT.md');
          assert.file('CONTRIBUTING.md');
          assert.file('STYLE\_GUIDES.md');
          done();
        })
        .catch(done);
    });

    it('should generate README.md file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('README.md');
          done();
        })
        .catch(done);
    });

    it('should generate ROADMAP.md file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('ROADMAP.md');
          done();
        })
        .catch(done);
    });

  });

});
