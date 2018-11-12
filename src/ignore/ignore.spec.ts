import { expect, should } from 'chai';
import * as fs from 'fs-extra';
import * as mocha from 'mocha';
import * as path from 'path';
import * as sh from 'shelljs';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoIgnoreGenerator } from './';

const tempPath = path.resolve('temp');

describe('yo repo ignore', function() {

  describe('RepoIgnoreGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoIgnoreGenerator).to.respondTo('initializing');
      expect(RepoIgnoreGenerator).to.respondTo('prompting');
      expect(RepoIgnoreGenerator).to.respondTo('configuring');
      expect(RepoIgnoreGenerator).to.respondTo('writing');
    });

  });

  describe('the generator', function() {

    before(function(done) {
      setTimeout(done, 1000);
      helpers.run(RepoIgnoreGenerator)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a .gitignore file with expected contents', function() {
      assert.file(tempPath + '/.gitignore');
    });

    it('should generate a .npmignore file with expected contents', function() {
      assert.file(tempPath + '/.npmignore');
    });

  });

});
