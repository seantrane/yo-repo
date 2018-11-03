import { sync as emptyDirSync } from 'empty-dir';
import { existsSync } from 'fs-extra';
// import githubUsername = require('github-username');
import { get, isString, startCase, trimEnd } from 'lodash';
import { hostname, userInfo } from 'os';
// import { sync as gitConfigSync } from 'parse-git-config';
import { resolve as pathResolve } from 'path';
import { exec as shExec, which as shWhich } from 'shelljs';
import spdxCorrect = require('spdx-correct');

/**
 * Fetch, a utility for finding common variables and values
 *
 * @export
 * @class Fetch
 */
export class Fetch {

  packageJsonPath: string;

  constructor() {
    this.resetPackageJsonPath();
  }

  resetPackageJsonPath(value = 'package.json') {
    this.packageJsonPath = value;
  }

  /**
   * Fetch author name
   *
   * Try to find author name via;
   * - require(package.json).author.name
   *
   * @param {string} [defaultValue]
   * @returns {string}
   * @memberof Fetch
   */
  authorName(defaultValue?: string): string {
    let name = this._getFromPackage('author.name', this._getFromPackage('author', defaultValue));
    if (isString(name)) name = trimEnd((name.match(/^[^\<\(]+/g) || []).join(''));
    if (!get(name, 'length')) {
      // let config = gitConfigSync();
      // if (typeof config === 'undefined') config = gitConfigSync({ path: '~/.gitconfig' });
      // name = (typeof config.user !== 'undefined') ? config.user.name : null;
      name = this.gitName();
    }
    if (!get(name, 'length')) name = startCase(this.username());
    return name;
  }

  /**
   * Fetch author email
   *
   * Try to find author email via;
   * - require(package.json).author.email
   *
   * @param {string} [defaultEmail]
   * @returns {string}
   * @memberof Fetch
   */
  authorEmail(defaultEmail?: string): string {
    const author = this._getFromPackage('author.name', this._getFromPackage('author', null));
    let email = this._getFromPackage('author.email');
    if (isString(author) && typeof email === 'undefined') {
      email = (author.match(/<[^@]+.+(?=>)/g) || []).join('').substr(1);
    }
    if (!get(email, 'length')) {
      // let config = gitConfigSync();
      // if (typeof config === 'undefined') config = gitConfigSync({ path: '~/.gitconfig' });
      // email = (typeof config.user !== 'undefined') ? config.user.email : null;
      email = this.gitEmail();
    }
    if (!get(email, 'length')) {
      email = defaultEmail || `${userInfo().username}@${hostname()}`;
    }
    return email;
  }

  /**
   * Fetch author URL
   *
   * Try to find author URL via;
   * - require(package.json).author.url
   *
   * @param {*} [username=this.userName()]
   * @param {string} [defaultValue]
   * @returns {string}
   * @memberof Fetch
   */
  authorUrl(username = this.username(), defaultValue?: string): string {
    const author = this._getFromPackage('author.name', this._getFromPackage('author', null));
    let url = this._getFromPackage('author.url', defaultValue);
    if (isString(author) && typeof url === 'undefined') {
      url = (author.match(/\([^\<\>]+(?=\))/g) || []).join('').substr(1);
    }
    if (!get(url, 'length')) url = `https://github.com/${username}`;
    return url;
  }

  /**
   * Fetch git email address
   *
   * Try to find git email address via;
   * - git config --get user.email
   *
   * @returns {string}
   * @memberof Fetch
   */
  gitEmail(): string {
    const emailCache = new Map();
    let email = emailCache.get(process.cwd());
    if (email) {
      return email;
    }
    if (shWhich('git')) {
      email = shExec('git config --get user.email', { silent: true }).stdout.toString().trim();
      emailCache.set(process.cwd(), email);
    }
    return email;
  }

  /**
   * Fetch GitHub Username
   *
   * Try to find GitHub Username via;
   * - sub-string of this.gitEmail()
   *
   * @returns {string}
   * @memberof Fetch
   */
  githubUsername(): string {
    const gitEmail = this.gitEmail();
    if (gitEmail.indexOf('@') !== -1 && gitEmail.indexOf('github') !== -1) {
      return gitEmail.substr(0, gitEmail.indexOf('@'));
    }
    return undefined;
  }

  /**
   * Fetch git name
   *
   * Try to find git name via;
   * - git config --get user.name
   *
   * @returns {string}
   * @memberof Fetch
   */
  gitName(): string {
    const nameCache = new Map();
    let name = nameCache.get(process.cwd());
    if (name) {
      return name;
    }
    if (shWhich('git')) {
      name = shExec('git config --get user.name', { silent: true }).stdout.toString().trim();
      nameCache.set(process.cwd(), name);
    }
    return name;
  }

  /**
   * Fetch package description
   *
   * Try to find package description via;
   * - require(package.json).description
   *
   * @param {string} [defaultValue=`A description for ${this.packageName()}`]
   * @returns {string}
   * @memberof Fetch
   */
  packageDescription(defaultValue = `A description for ${this.packageName()}`): string {
    let description = this._getFromPackage('description', defaultValue);
    if (!get(description, 'length')) description = defaultValue;
    return description;
  }

  /**
   * Fetch package license
   *
   * Try to find package license via;
   * - require(package.json).license
   *
   * @param {string} [defaultValue='MIT']
   * @returns {string}
   * @memberof Fetch
   */
  packageLicense(defaultValue = 'MIT'): string {
    let license = this._getFromPackage('license', defaultValue);
    license = (!get(license, 'length')) ? defaultValue : get(spdxCorrect(license), '0', '');
    if (!get(license, 'length')) license = defaultValue;
    return license;
  }

  /**
   * Fetch package name
   *
   * Try to find package name via;
   * - require(package.json).name
   *
   * @param {string} [defaultValue=`${this.userName()}-package`]
   * @returns {string}
   * @memberof Fetch
   */
  packageName(defaultValue = `${this.username()}-package`): string {
    const name = this._getFromPackage('name', defaultValue);
    if (!get(name, 'length')) {
      if (emptyDirSync(process.cwd()) || existsSync(pathResolve('.git'))) {
        return (process.cwd().match(/[^\/]+$/g) || [defaultValue]).join('');
      }
      return defaultValue;
    }
    return name;
  }

  /**
   * Fetch package destination
   *
   * Try to find package destination (directory or path) via;
   * - resolve path via parameter
   * - current directory
   *
   * @param {string} directoryOrPath
   * @returns {string}
   * @memberof Fetch
   */
  packageDestination(directoryOrPath: string): string {
    if (emptyDirSync(process.cwd()) || existsSync(pathResolve('.git'))) {
      return process.cwd();
    }
    return pathResolve(directoryOrPath);
  }

  /**
   * Fetch package repository URL
   *
   * Try to find package repository URL via;
   * - require(package.json).repository.url
   * - require(package.json).repository
   *
   * @param {*} [username=this.userName()]
   * @param {string} packageName
   * @returns {string}
   * @memberof Fetch
   */
  packageRepository(username = this.username(), packageName: string): string {
    if (!packageName) packageName = this.packageName(`${username}s-package`);
    const defaultValue = `https://github.com/${username}/${packageName}`;
    let repository = this._getFromPackage('repository', defaultValue);
    if (!get(repository, 'length')) repository = defaultValue;
    return repository;
  }

  /**
   * Fetch package version
   *
   * Try to find package version via;
   * - require(package.json).version
   *
   * @param {string} [defaultVersion='0.0.0']
   * @returns {string}
   * @memberof Fetch
   */
  packageVersion(defaultVersion = '0.0.0'): string {
    let version = this._getFromPackage('version', defaultVersion);
    if (!get(version, 'length')) version = defaultVersion;
    return version;
  }

  /**
   * Fetch username
   *
   * Try to find username via;
   * - require(package.json).repository.url
   * - require(package.json).repository
   * - require(package.json).homepage.url
   * - require(package.json).homepage
   * - require(package.json).author.email
   * - require(package.json).author
   *
   * @param {*} [defaultValue=this.githubUsername()]
   * @returns {string}
   * @memberof Fetch
   */
  username(defaultValue = this.githubUsername()): string {
    let username = '';
    if (existsSync(pathResolve('package.json'))) {
      const pkg = require(pathResolve('package.json'));
      username = (
        (
          get(pkg, 'repository.url', pkg.repository) ||
          get(pkg, 'homepage.url', pkg.homepage) ||
          ''
        ).match(/github\.com\/[^\/]+/g) || []
      )
        .join('')
        .substr(11);
    }
    if (username.length >= 1) {
      return username;
    }
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }
    return userInfo().username;
  }

  /**
   * Get value from a property in package.json file
   *
   * @param {string} path
   * @param {*} [defaultValue]
   * @returns {*}
   * @memberof Fetch
   */
  _getFromPackage(path: string, defaultValue?: any): any {
    const packagePath = pathResolve(this.packageJsonPath);
    if (existsSync(packagePath)) {
      return get(require(packagePath), path, defaultValue);
    }
    return defaultValue;
  }

}

export const fetch = new Fetch();

export default fetch;
