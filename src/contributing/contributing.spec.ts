import { expect, should } from 'chai';
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoContributingGenerator } from './';

const appSpec = require('../app/app.spec.json');

describe.skip('yo repo contributing', function() {

  describe('RepoContributingGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoContributingGenerator).to.respondTo('initializing');
      expect(RepoContributingGenerator).to.respondTo('prompting');
      expect(RepoContributingGenerator).to.respondTo('configuring');
      expect(RepoContributingGenerator).to.respondTo('writing');
    });

  });

  describe('the generator', function() {

    it('should generate contributing-info files with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoContributingGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('CODE\_OF\_CONDUCT.md');
          assert.file('CONTRIBUTING.md');
          assert.file('STYLE\_GUIDES.md');
          done();
        })
        .catch(done);
    });

    it('should generate contributing-info files by default, without prompts', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoContributingGenerator)
        .then(function(dir) {
          assert.file('CODE\_OF\_CONDUCT.md');
          assert.file('CONTRIBUTING.md');
          assert.file('STYLE\_GUIDES.md');
          done();
        })
        .catch(done);
    });

  });

});
