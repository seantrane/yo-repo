import { expect, should } from 'chai';
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoCiGenerator } from './';

describe.skip('yo repo ci', function() {

  describe('RepoCiGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoCiGenerator).to.respondTo('initializing');
      expect(RepoCiGenerator).to.respondTo('prompting');
      expect(RepoCiGenerator).to.respondTo('configuring');
      expect(RepoCiGenerator).to.respondTo('writing');
    });

  });

  describe('the generator', function() {

    it('should generate a .travis.yml file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoCiGenerator)
        .withPrompts({ cicd: 'travis' })
        .then(function(dir) {
          assert.file('.travis.yml');
          // assert.fileContent('.travis.yml', /.*/);
        })
        .catch(done);
    });

    it('should generate no files by default, without prompt', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoCiGenerator)
        .then(function(dir) {
          assert.noFile('.travis.yml');
        })
        .catch(done);
    });

  });

});
