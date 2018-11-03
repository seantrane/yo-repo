import chalk from 'chalk';
import { resolve as pathResolve } from 'path';

import fetch from './yo-repo-fetch';
import YoRepoInterface from './yo-repo.interface';

export interface YoRepoPromptsInterface {
  authorEmail?: string;
  authorName?: string;
  authorUrl?: string;
  cicd?: string;
  demoUrl?: string;
  description?: string;
  destination?: string;
  homepageUrl?: string;
  installation?: string;
  license?: string;
  packageName?: string;
  profileName?: string;
  repositoryName?: string;
  repositoryUrl?: string;
  username?: string;
  version?: string;
}

export type arrayOfObjectsWithNameAndUrl = Array<{name: string, url: string}>;

/**
 * Output a prompt message using Yo Repo! style
 *
 * @param {string} question Human-friendly question
 * @param {string} [key] Option/Prompt name
 * @param {string} [hint] Helpful hints, examples
 * @returns {string} Yo Repo! formatted prompt message
 * @memberof YoRepoPrompts
 */
export function promptMessage(question: string, key?: string, hint?: string): string {
  let msg = '\n\n' + chalk.reset.magentaBright('> ' + question) + '\n\n  ';
  if (typeof hint !== 'undefined') {
    msg += chalk.reset.gray.italic(hint) + '\n\n  ';
  }
  if (typeof key !== 'undefined') {
    msg += chalk.reset.white.bold.underline(key);
  }
  return msg;
}

/**
 * Yo Repo Prompts!
 *
 * A prompt support utility for Yo Repo!
 *
 * @export
 * @class YoRepoPrompts
 * @implements {YoRepoPromptsInterface}
 */
export class YoRepoPrompts implements YoRepoPromptsInterface {

  authorEmail?: string;
  authorName?: string;
  authorUrl?: string;
  cicd?: string;
  demoUrl?: string;
  description?: string;
  destination?: string;
  homepageUrl?: string;
  installation?: string;
  license?: string;
  packageName?: string;
  profileName?: string;
  repositoryName?: string;
  repositoryUrl?: string;
  username?: string;
  version?: string;

  _prompt = promptMessage;

  constructor(public yo: YoRepoInterface) {}

  /**
   * Dependencies Option/Prompt
   *
   * @returns {Promise<arrayOfObjectsWithNameAndUrl>}
   * @memberof YoRepoPrompts
   */
  static async dependenciesPrompt(yo: YoRepoInterface): Promise<arrayOfObjectsWithNameAndUrl> {
    const dependencies: arrayOfObjectsWithNameAndUrl = [];
    yo.log(promptMessage('What dependencies are required by this repo/package?'));
    while (true) {
      const { dependencyName } = await yo.prompt([
        {
          type: 'input',
          name: 'dependencyName',
          message: 'Dependency:',
        },
      ]);
      if (dependencyName === '') break;
      const { dependencyUrl } = await yo.prompt([
        {
          type: 'input',
          name: 'dependencyUrl',
          message: 'Dependency URL:',
          default: 'https://example.com',
        },
      ]);
      dependencies.push({
        name: dependencyName,
        url: dependencyUrl,
      });
    }
    return dependencies;
  }

  /**
   * Features Option/Prompt
   *
   * @returns {Promise<string[]>}
   * @memberof YoRepoPrompts
   */
  static async featuresPrompt(yo: YoRepoInterface): Promise<string[]> {
    const features: string[] = [];
    yo.log(promptMessage('What features are available with this repo/package?'));
    while (true) {
      const { feature } = await yo.prompt([
        {
          type: 'input',
          name: 'feature',
          message: 'Feature:',
        },
      ]);
      if (feature === '') break;
      features.push(feature);
    }
    return features;
  }

  /**
   * Keywords Option/Prompt
   *
   * @returns {Promise<string[]>}
   * @memberof YoRepoPrompts
   */
  static async keywordsPrompt(yo: YoRepoInterface): Promise<string[]> {
    const keywords: string[] = [];
    yo.log(promptMessage('Are there keywords associated with this repo/package?'));
    while (true) {
      const { keyword } = await yo.prompt([
        {
          type: 'input',
          name: 'keyword',
          message: 'Keyword:',
        },
      ]);
      if (keyword === '') break;
      keywords.push(keyword);
    }
    return keywords;
  }

  async prompt(prompts): Promise<YoRepoPromptsInterface> {
    const result: YoRepoPromptsInterface = {};
    if (!prompts || prompts.username) {
      this.username = result.username = await this.usernamePrompt();
    }
    if (!prompts || prompts.profileName) {
      this.profileName = result.profileName = await this.profileNamePrompt();
    }
    if (!prompts || prompts.repositoryName) {
      this.repositoryName = result.repositoryName = await this.repositoryNamePrompt();
    }
    if (!prompts || prompts.packageName) {
      this.packageName = result.packageName = await this.packageNamePrompt();
    }
    if (!prompts || prompts.destination) {
      this.destination = result.destination = await this.destinationPrompt();
    }
    if (!prompts || prompts.description) {
      this.description = result.description = await this.descriptionPrompt();
    }
    if (!prompts || prompts.version) {
      this.version = result.version = await this.versionPrompt();
    }
    if (!prompts || prompts.license) {
      this.license = result.license = await this.licensePrompt();
    }
    if (!prompts || prompts.authorName) {
      this.authorName = result.authorName = await this.authorNamePrompt();
    }
    if (!prompts || prompts.authorEmail) {
      this.authorEmail = result.authorEmail = await this.authorEmailPrompt();
    }
    if (!prompts || prompts.authorUrl) {
      this.authorUrl = result.authorUrl = await this.authorUrlPrompt();
    }
    if (!prompts || prompts.repositoryUrl) {
      this.repositoryUrl = result.repositoryUrl = await this.repositoryUrlPrompt();
    }
    if (!prompts || prompts.homepageUrl) {
      this.homepageUrl = result.homepageUrl = await this.homepageUrlPrompt();
    }
    if (!prompts || prompts.demoUrl) {
      this.demoUrl = result.demoUrl = await this.demoUrlPrompt();
    }
    if (!prompts || prompts.installation) {
      this.installation = result.installation = await this.installationPrompt();
    }
    if (!prompts || prompts.cicd) {
      this.cicd = result.cicd = await this.cicdPrompt();
    }
    return result;
  }

  /**
   * Author Email Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async authorEmailPrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'authorEmail',
      message: this._prompt(
        'What is the email address of the repo/package author?',
        'Author Email:',
        'Example: <%= user_name %>@users.noreply.github.com\n' +
        '  Reference: require(package.json).author.email',
      ),
    });
  }

  /**
   * Author Name Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async authorNamePrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'authorName',
      message: this._prompt(
        'Who is the author of this repo/package?',
        'Author Name:',
        'Example: ' + `@${this.username}\n` +
        '  Reference: require(package.json).author.name',
      ),
      default: fetch.authorName(`@${this.username}`),
    });
  }

  /**
   * Author URL Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async authorUrlPrompt(): Promise<string> {
    if (!this.username) this.username = await this.usernamePrompt();
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'authorUrl',
      message: this._prompt(
        'What is the URL of the repo/package author\'s website?',
        'Author URL:',
        'Example: https://github.com/<%= user_name %>\n' +
        '  Reference: require(package.json).author.url',
      ),
    });
  }

  /**
   * CI/CD Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async cicdPrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'list',
      name: 'cicd',
      message: this._prompt(
        'Which of the following CI/CD config options are best for your repo/package?',
        'Choose a CI/CD product:',
        'Example: Travis CI, Circle CI, Jenkins, etc.',
      ),
      choices: [
        { name: 'Travis CI', value: 'travis' },
        { name: 'Circle CI', value: 'circleci' },
        { name: 'Jenkins', value: 'jenkins' },
      ],
      default: 'Travis CI',
    });
  }

  /**
   * Demo URL Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async demoUrlPrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'demoUrl',
      message: this._prompt(
        'Is there a URL for the demonstration of this repo/package?',
        'Demo URL:',
      ),
    });
  }

  /**
   * Repo/Package Description Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async descriptionPrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'description',
      message: this._prompt(
        'How would you describe your repo/package?',
        'Package Description:',
      ),
      default: fetch.packageDescription(),
    });
  }

  /**
   * Destination directory Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async destinationPrompt(): Promise<string> {
    if (!this.packageName) this.packageName = await this.packageNamePrompt();
    const destination = await this.yo.optionOrPrompt({
      type: 'input',
      name: 'destination',
      message: this._prompt(
        'What is the name of, or path to, your repo/package directory?',
        'Destination directory:',
        'Default is the current directory.',
      ),
      default: fetch.packageDestination(this.packageName),
    });
    return pathResolve(destination);
  }

  /**
   * Homepage URL Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async homepageUrlPrompt(): Promise<string> {
    if (!this.repositoryUrl) this.repositoryUrl = await this.repositoryUrlPrompt();
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'homepageUrl',
      message: this._prompt(
        'What is the homepage URL of this repo/package?',
        'Homepage URL:',
        'Example: https://github.com/<%= profile_name %>/<%= repository_name %>#readme\n' +
        '  Reference: require(package.json).homepage',
      ),
      default: this.repositoryUrl + '#readme',
    });
  }

  /**
   * Installation command Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async installationPrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'installation',
      message: this._prompt(
        'Is there an installation command for this repo/package?',
        'Installation command:',
        'Example: npm install',
      ),
    });
  }

  /**
   * License Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async licensePrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'list',
      name: 'license',
      message: this._prompt(
        'Which of the following licenses are best for your repo/package?',
        'Choose a License:',
        'Reference: require(package.json).license\n' +
        '  For private software, use; \'No License (Copyrighted)\' - UNLICENSED\n' +
        '  For more info; https://choosealicense.com',
      ),
      choices: [
        { name: 'MIT', value: 'MIT' },
        { name: 'Apache 2.0', value: 'Apache-2.0' },
        { name: 'Mozilla Public License 2.0', value: 'MPL-2.0' },
        {
          name: 'BSD 2-Clause (FreeBSD) License',
          value: 'BSD-2-Clause-FreeBSD',
        },
        { name: 'BSD 3-Clause (NewBSD) License', value: 'BSD-3-Clause' },
        { name: 'Internet Systems Consortium (ISC) License', value: 'ISC' },
        { name: 'GNU AGPL 3.0', value: 'AGPL-3.0' },
        { name: 'GNU GPL 3.0', value: 'GPL-3.0' },
        { name: 'GNU LGPL 3.0', value: 'LGPL-3.0' },
        { name: 'Unlicense', value: 'unlicense' },
        { name: 'No License (Copyrighted)', value: 'UNLICENSED' },
      ],
      default: 'MIT',
    });
  }

  /**
   * Package Name Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async packageNamePrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'packageName',
      message: this._prompt(
        'What is the name of your package?',
        'Package Name:',
        '- Slugified (e.g. snake-case)\n' +
        '  - Scoped, if applicable (e.g. @org/repo)\n\n' +
        '  Reference: require(package.json).name\n' +
        '  For more info; https://docs.npmjs.com/files/package.json#name',
      ),
      default: fetch.packageName(),
    });
  }

  /**
   * Profile Name Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async profileNamePrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'profileName',
      message: this._prompt(
        'What profile (user/org) will host this repo/package?',
        'GitHub Profile:',
        'Example: https://github.com/<%= profile_name %>',
      ),
      default: this.username,
    });
  }

  /**
   * Repository Name Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async repositoryNamePrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'repositoryName',
      message: this._prompt(
        'What is the name of your repo?',
        'Repository Name:',
        'Example: https://github.com/<%= profile_name %>/<%= repository_name %>',
      ),
      default: fetch.packageName(),
    });
  }

  /**
   * Repository URL Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async repositoryUrlPrompt(): Promise<string> {
    if (!this.username) this.username = await this.usernamePrompt();
    if (!this.packageName) this.packageName = await this.packageNamePrompt();
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'repositoryUrl',
      message: this._prompt(
        'What is the URL to this repository?',
        'Repository URL:',
        'Example: https://github.com/<%= profile_name %>/<%= repository_name %>\n' +
        '  Reference: require(package.json).repostiory.url',
      ),
      default: `https://github.com/${this.profileName}/${this.repositoryName}`,
    });
  }

  /**
   * Username Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async usernamePrompt(): Promise<string> {
    let githubUsername: string;
    await this.yo.user.github.username().then((res) => {
      githubUsername = res;
    }).then(() => {
      if (typeof githubUsername === 'undefined') githubUsername = fetch.username();
    });
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'username',
      message: this._prompt(
        'What is your username?',
        'GitHub Username:',
        'Example: https://github.com/<%= user_name %>',
      ),
      default: githubUsername,
    });
  }

  /**
   * Repo/Package Version Option/Prompt
   *
   * @returns {Promise<string>}
   * @memberof YoRepoPrompts
   */
  async versionPrompt(): Promise<string> {
    return this.yo.optionOrPrompt({
      type: 'input',
      name: 'version',
      message: this._prompt(
        'What semantic-version will you initiate your repo/package at?',
        'Package Version:',
        'Example: \'1.0.0\', \'0.0.0\', \'0.0.0-development\', \n' +
        '  Reference: require(package.json).version\n' +
        '  For more info; https://semver.org',
      ),
      default: fetch.packageVersion('0.0.0'),
    });
  }

}

export default YoRepoPrompts;
