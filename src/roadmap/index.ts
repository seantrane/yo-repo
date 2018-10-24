import { resolve as pathResolve } from 'path';

import RepoBaseGenerator from '../shared/base-generator';
import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import prompting from './prompting';

export class RepoRoadmapGenerator extends RepoBaseGenerator {


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
      this.templatePath('ROADMAP.md'),
      this.destinationPath('ROADMAP.md'),
      this.context,
    );
  }

}

export default RepoRoadmapGenerator;
