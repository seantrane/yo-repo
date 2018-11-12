import { expect, should } from 'chai';
import * as fs from 'fs-extra';
import * as mocha from 'mocha';
import * as path from 'path';
import * as sh from 'shelljs';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoContributingGenerator } from './';

const appSpec = require('../app/app.spec.json');

const tempPath = path.resolve('temp');

describe('yo repo contributing', function() {

  describe('RepoContributingGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoContributingGenerator).to.respondTo('initializing');
      expect(RepoContributingGenerator).to.respondTo('prompting');
      expect(RepoContributingGenerator).to.respondTo('configuring');
      expect(RepoContributingGenerator).to.respondTo('writing');
    });

  });

  describe('the generator without prompts', function() {

    before(function(done) {
      setTimeout(done, 2000);
      helpers.run(RepoContributingGenerator)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a CODE_OF_CONDUCT.md file with expected contents', function() {
      assert.file(tempPath + '/CODE\_OF\_CONDUCT.md');
    });

    it('should generate a CONTRIBUTING.md file with expected contents', function() {
      assert.file(tempPath + '/CONTRIBUTING.md');
    });

    it('should generate a STYLE_GUIDES.md file with expected contents', function() {
      assert.file(tempPath + '/STYLE\_GUIDES.md');
    });

  });

  describe('the generator with prompts', function() {

    before(function(done) {
      setTimeout(done, 2000);
      helpers.run(RepoContributingGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a CODE_OF_CONDUCT.md file with expected contents', function() {
      assert.file(tempPath + '/temp/CODE\_OF\_CONDUCT.md');
    });

    it('should generate a CONTRIBUTING.md file with expected contents', function() {
      assert.file(tempPath + '/temp/CONTRIBUTING.md');
    });

    it('should generate a STYLE_GUIDES.md file with expected contents', function() {
      assert.file(tempPath + '/temp/STYLE\_GUIDES.md');
    });

  });

});
