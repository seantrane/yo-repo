import { resolve as pathResolve } from 'path';

import RepoBaseGenerator from '../shared/base-generator';
import configuring from './configuring';
import conflicts from './conflicts';
import runDefault from './default';
import end from './end';
import initializing from './initializing';
import install from './install';
import prompting from './prompting';
import writing from './writing';

export class RepoGenerator extends RepoBaseGenerator {

  constructor(args, opts) {
    super(args, opts);
    this.sourceRoot(pathResolve(__dirname, './templates'));
    // `-d, --debug` option flag
    // this.option('debug', {
    //   type: String,
    //   default: false,
    //   alias: 'd',
    //   description: 'Yo Repo! Debug',
    // });
    // `--generators = ...` argument
    this.argument('generators', {
      type: Array,
      default: [
        'gitinit', 'create', 'ignore', 'license', 'readme', 'contributing', 'roadmap', 'package', 'ci', 'gitpush',
      ],
      required: false,
      description: 'Custom list of generators to use. Example: yo repo gitinit readme contributing',
    });
  }

  async initializing() {
    return initializing(this);
  }

  async prompting() {
    return prompting(this);
  }

  async configuring() {
    return configuring(this);
  }

  async default() {
    return runDefault(this);
  }

  async writing() {
    return writing(this);
  }

  async conflicts() {
    return conflicts(this);
  }

  async install() {
    return install(this);
  }

  async end() {
    return end(this);
  }

}

export default RepoGenerator;
