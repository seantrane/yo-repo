import { resolve as pathResolve } from 'path';

import RepoBaseGenerator from '../shared/base-generator';
import copyTpl from '../shared/copy-tpl';
import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import prompting from './prompting';

export class RepoCiGenerator extends RepoBaseGenerator {

  templates = [
    '.travis.yml',
  ];

  constructor(args, opts) {
    super(args, opts);
    this.sourceRoot(pathResolve(__dirname, './templates'));
  }

  async initializing() {
    this.optionOrPrompt = yoOptionOrPrompt;
  }

  async prompting() {
    return prompting(this);
  }

  async configuring() {
    this.destinationRoot(this.answers.destination);
  }

  async writing() {
    if (this.answers.cicd.indexOf('travis') !== -1) {
      copyTpl(this, '.travis.yml');
    }
  }

}

export default RepoCiGenerator;
