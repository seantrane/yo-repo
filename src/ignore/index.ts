import { resolve as pathResolve } from 'path';

import RepoBaseGenerator from '../shared/base-generator';
import copyTemplates from '../shared/copy-templates';
import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import prompting from './prompting';

export class RepoIgnoreGenerator extends RepoBaseGenerator {

  templates = [
    '.gitignore',
    '.npmignore',
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
    copyTemplates(this);
  }

}

export default RepoIgnoreGenerator;
