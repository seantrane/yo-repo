import { resolve as pathResolve } from 'path';

import RepoBaseGenerator from '../shared/base-generator';
import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import prompting from './prompting';

export class RepoContributingGenerator extends RepoBaseGenerator {


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
      this.templatePath('CODE_OF_CONDUCT.md'),
      this.destinationPath('CODE_OF_CONDUCT.md'),
      this.context,
    );
    this.fs.copy(
      this.templatePath('CONTRIBUTING.md'),
      this.destinationPath('CONTRIBUTING.md'),
    );
    this.fs.copyTpl(
      this.templatePath('STYLE_GUIDES.md'),
      this.destinationPath('STYLE_GUIDES.md'),
      this.context,
    );
    }

}

export default RepoContributingGenerator;
