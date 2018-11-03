import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mocha from 'mocha';
import * as helpers from 'yeoman-test';

import handleError from './handle-error';
import { promptMessage, YoRepoPrompts } from './yo-repo-prompts';

chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe('promptMessage function', function() {

  const msg = {
    question: {
      in: 'Question',
      out: '\n\n\u001b[0m\u001b[95m> Question\u001b[39m\u001b[0m\n\n  ',
    },
    key: {
      in: 'Key',
      out: '\u001b[0m\u001b[37m\u001b[1m\u001b[4mKey\u001b[24m\u001b[22m\u001b[39m\u001b[0m',
    },
    hint: {
      in: 'Hint',
      out: '\u001b[0m\u001b[90m\u001b[3mHint\u001b[23m\u001b[39m\u001b[0m\n\n  ',
    },
  };

  it('should format a question as expected', function() {
    expect(promptMessage(msg.question.in)).to.equal(msg.question.out);
  });

  it('should format a question + key as expected', function() {
    expect(promptMessage(msg.question.in, msg.key.in))
      .to.equal([msg.question.out, msg.key.out].join(''));
  });

  it('should format a question + key + hint as expected', function() {
    expect(promptMessage(msg.question.in, msg.key.in, msg.hint.in))
      .to.equal([msg.question.out, msg.hint.out, msg.key.out].join(''));
  });

  it('should format a question + hint as expected', function() {
    expect(promptMessage(msg.question.in, undefined, msg.hint.in))
      .to.equal([msg.question.out, msg.hint.out].join(''));
  });

});

describe('Yo Repo Prompts', function() {

  let yo;
  let prompts: YoRepoPrompts;

  before(function() {
    yo = helpers.createDummyGenerator();
    yo.log = function(str) {
      return str;
    };
    yo.prompt = async function(arr: Array<{}>) {
      return arr;
    };
    prompts = new YoRepoPrompts(yo);
  });

  describe('YoRepoPrompts class', function() {

    it('should have expected methods', function() {
      expect(prompts).to.respondTo('_prompt');
      expect(YoRepoPrompts).itself.to.respondTo('dependenciesPrompt');
    });

  });

  describe('dependenciesPrompt function', function() {

    it('should exist', function() {
      expect(YoRepoPrompts).itself.to.respondTo('dependenciesPrompt');
    });

    it.skip('should generate and return dependencies prompt', function() {
      // const dependencies = YoRepoPrompts.dependenciesPrompt(yo);
      // console.dir(dependencies);
      // YoRepoPrompts.dependenciesPrompt(yo).then((res) => {
      //   expect(res).should.eventually.be.an('array');
      // });
      return YoRepoPrompts.dependenciesPrompt(yo).should.eventually.be.an('array');
    });

  });

});
