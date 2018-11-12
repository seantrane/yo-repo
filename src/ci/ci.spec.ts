import { expect, should } from 'chai';
import * as fs from 'fs-extra';
import * as mocha from 'mocha';
import * as path from 'path';
import * as sh from 'shelljs';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoCiGenerator } from './';

const tempPath = path.resolve('temp');

describe('yo repo ci', function() {

  describe('RepoCiGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoCiGenerator).to.respondTo('initializing');
      expect(RepoCiGenerator).to.respondTo('prompting');
      expect(RepoCiGenerator).to.respondTo('configuring');
      expect(RepoCiGenerator).to.respondTo('writing');
    });

  });

  describe('the generator without prompts', function() {

    before(function(done) {
      setTimeout(done, 600);
      helpers.run(RepoCiGenerator)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should not generate a .travis.yml file', function() {
      assert.noFile(tempPath + '/.travis.yml');
    });

  });

  describe('the generator with prompts', function() {

    before(function(done) {
      setTimeout(done, 600);
      helpers.run(RepoCiGenerator)
        .withPrompts({ cicd: 'travis' })
        .then(function(dir) {
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a .travis.yml file with expected contents', function() {
      assert.file(tempPath + '/.travis.yml');
    });

  });

});
