import * as Base from 'yeoman-generator';

export class RepoBaseGenerator extends Base {

  answers: Base.Answers;
  context: {};
  optionOrPrompt: any;
  templates: string[];

  constructor(args, opts) {
    super(args, opts);
  }

}

export default RepoBaseGenerator;
