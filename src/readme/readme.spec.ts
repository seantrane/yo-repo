import { expect, should } from 'chai';
import * as fs from 'fs-extra';
import * as mocha from 'mocha';
import * as path from 'path';
import * as sh from 'shelljs';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoReadmeGenerator } from './';

const appSpec = require('../app/app.spec.json');

const tempPath = path.resolve('temp');

describe('yo repo readme', function() {

  describe('RepoReadmeGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoReadmeGenerator).to.respondTo('initializing');
      expect(RepoReadmeGenerator).to.respondTo('prompting');
      expect(RepoReadmeGenerator).to.respondTo('configuring');
      expect(RepoReadmeGenerator).to.respondTo('writing');
    });

  });

  describe('the generator without prompts', function() {

    before(function(done) {
      setTimeout(done, 600);
      helpers.run(RepoReadmeGenerator)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a README.md file with expected contents', function() {
      assert.file(tempPath + '/README.md');
    });

  });

  describe('the generator with prompts', function() {

    before(function(done) {
      setTimeout(done, 600);
      helpers.run(RepoReadmeGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a README.md file with expected contents', function() {
      assert.file(tempPath + '/README.md');
    });

  });

});
