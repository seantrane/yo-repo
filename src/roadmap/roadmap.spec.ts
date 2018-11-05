import { expect, should } from 'chai';
import * as mocha from 'mocha';
import * as path from 'path';
import * as assert from 'yeoman-assert';
import * as helpers from 'yeoman-test';

import { RepoRoadmapGenerator } from './';

const appSpec = require('../app/app.spec.json');

describe.skip('yo repo roadmap', function() {

  describe('RepoRoadmapGenerator class', function() {

    it('should have expected methods', function() {
      expect(RepoRoadmapGenerator).to.respondTo('initializing');
      expect(RepoRoadmapGenerator).to.respondTo('prompting');
      expect(RepoRoadmapGenerator).to.respondTo('configuring');
      expect(RepoRoadmapGenerator).to.respondTo('writing');
    });

  });

  describe('the generator', function() {

      setTimeout(done, 300);
    it('should generate a ROADMAP.md file with expected contents', function(done) {
      helpers.run(RepoRoadmapGenerator)
        .withPrompts(appSpec.answers.default)
        .then(function(dir) {
          assert.file('ROADMAP.md');
        })
        .then(done)
        .catch(done);
    });

      setTimeout(done, 300);
    it('should generate a ROADMAP.md file by default, without prompts', function(done) {
      helpers.run(RepoRoadmapGenerator)
        .then(function(dir) {
          assert.file('ROADMAP.md');
        })
        .then(done)
        .catch(done);
    });

  });

});
