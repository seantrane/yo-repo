import { resolve as pathResolve } from 'path';
import * as Base from 'yeoman-generator';

import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import prompting from './prompting';

export class RepoCiGenerator extends Base {

  answers: Base.Answers;
  context: {};
  optionOrPrompt: any;

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
      this.fs.copyTpl(
        this.templatePath('.travis.yml'),
        this.destinationPath('.travis.yml'),
        this.context,
      );
    }
  }

}

export default RepoCiGenerator;
