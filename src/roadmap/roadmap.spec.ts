import { expect, should } from 'chai';
import * as fs from 'fs-extra';
import * as mocha from 'mocha';
import * as path from 'path';
import * as sh from 'shelljs';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoRoadmapGenerator } from './';

const appSpec = require('../app/app.spec.json');

describe.skip('yo repo roadmap', function() {
const tempPath = path.resolve('temp');


  describe('RepoRoadmapGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoRoadmapGenerator).to.respondTo('initializing');
      expect(RepoRoadmapGenerator).to.respondTo('prompting');
      expect(RepoRoadmapGenerator).to.respondTo('configuring');
      expect(RepoRoadmapGenerator).to.respondTo('writing');
    });

  });

  describe('the generator without prompts', function() {

    before(function(done) {
      setTimeout(done, 600);
      helpers.run(RepoRoadmapGenerator)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a ROADMAP.md file with expected contents', function() {
      assert.file(tempPath + '/ROADMAP.md');
    });

  });

  describe('the generator with prompts', function() {

    before(function(done) {
      setTimeout(done, 600);
      helpers.run(RepoRoadmapGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          sh.rm('-rf', tempPath);
          fs.copySync(dir, tempPath);
        })
        .then(done)
        .catch(done);
    });

    it('should generate a ROADMAP.md file with expected contents', function() {
      assert.file(tempPath + '/ROADMAP.md');
    });

  });

});
