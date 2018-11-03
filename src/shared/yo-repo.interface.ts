import * as Generator from 'yeoman-generator';

export interface YoRepoInterface extends Generator {
  context: {[key: string]: any};
  optionOrPrompt: ((prompts: any) => Promise<any>);
}

export default YoRepoInterface;
