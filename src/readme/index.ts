import { resolve as pathResolve } from 'path';
import * as Base from 'yeoman-generator';

import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import prompting from './prompting';

export class RepoReadmeGenerator extends Base {

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
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.context,
    );
  }

}

export default RepoReadmeGenerator;
