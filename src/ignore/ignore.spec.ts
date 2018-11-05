import { expect, should } from 'chai';
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoIgnoreGenerator } from './';

describe.skip('yo repo ignore', function() {

  describe('RepoIgnoreGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoIgnoreGenerator).to.respondTo('initializing');
      expect(RepoIgnoreGenerator).to.respondTo('prompting');
      expect(RepoIgnoreGenerator).to.respondTo('configuring');
      expect(RepoIgnoreGenerator).to.respondTo('writing');
    });

  });

  describe('the generator', function() {

    it('should generate .gitignore and .npmignore files with expected contents', function(done) {
      setTimeout(done, 300);
      helpers.run(RepoIgnoreGenerator)
        // .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('.gitignore');
          assert.file('.npmignore');
        })
        .catch(done);
    });

    // it.skip('should generate a .gitignore file with expected contents', function(done) {
    //   setTimeout(done, 300);
    //   helpers.run(RepoIgnoreGenerator)
    //     .then(function(dir) {
    //       assert.file('.gitignore');
    //     })
    //     .catch(done);
    // });

    // it.skip('should generate a .npmignore file with expected contents', function(done) {
    //   setTimeout(done, 300);
    //   helpers.run(RepoIgnoreGenerator)
    //     .then(function(dir) {
    //       assert.file('.npmignore');
    //     })
    //     .catch(done);
    // });

  });

});
