import { resolve as pathResolve } from 'path';

import RepoBaseGenerator from '../shared/base-generator';
import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import prompting from './prompting';

export class RepoRoadmapGenerator extends RepoBaseGenerator {

  templates = [
    'ROADMAP.md',
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
    this.templates.forEach((path) => {
      this.fs.copyTpl(
        this.templatePath(path),
        this.destinationPath(path),
        this.context,
      );
    });
  }

}

export default RepoRoadmapGenerator;
