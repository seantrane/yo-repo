import { expect, should } from 'chai';
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoReadmeGenerator } from './';

const appSpec = require('../app/app.spec.json');

describe.skip('yo repo readme', function() {

  describe('RepoReadmeGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoReadmeGenerator).to.respondTo('initializing');
      expect(RepoReadmeGenerator).to.respondTo('prompting');
      expect(RepoReadmeGenerator).to.respondTo('configuring');
      expect(RepoReadmeGenerator).to.respondTo('writing');
    });

  });

  describe('the generator', function() {

    it('should generate README.md file with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoReadmeGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('README.md');
        })
        .then(done)
        .catch(done);
    });

    it('should generate README.md file by default, without prompts', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoReadmeGenerator)
        .then(function(dir) {
          assert.file('README.md');
        })
        .then(done)
        .catch(done);
    });

  });

});
