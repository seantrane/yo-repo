import { assert, expect, should } from 'chai';
// import * as fs from 'fs';
import * as mocha from 'mocha';
import * as path from 'path';
import * as sinon from 'sinon';

import { Fetch } from './yo-repo-fetch';

// afterEach(() => {
//   // Restore the default sandbox here
//   sinon.restore();
// });

describe('Yo Repo Fetch', function() {

  let fetch: Fetch;

  beforeEach(function() {
    fetch = new Fetch();
    fetch.resetPackageJsonPath(path.join(__dirname, '../../package.json'));
  });

  describe('Fetch class', function() {

    it('should have expected methods', function() {
      expect(fetch).to.respondTo('authorName');
      expect(fetch).to.respondTo('authorEmail');
    });

  });

  describe('_getFromPackage function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('_getFromPackage');
    });

    it('should fetch name property from package.json', function() {
      expect(fetch._getFromPackage('name')).to.equal('generator-repo');
    });

    it('should return a default value when property is not found', function() {
      expect(fetch._getFromPackage('xyz23', 'default')).to.equal('default');
    });

    it('should return a default value when package.json does not exist', function() {
      fetch.resetPackageJsonPath('missing.json');
      expect(fetch._getFromPackage('name', 'default')).to.equal('default');
    });

  });

  describe('authorName function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('authorName');
    });

    it('should fetch author.name property from package.json', function() {
      // expect(fetch.authorName()).to.include('seantrane');
      expect(fetch.authorName()).to.be.a('string');
    });

    it('should fetch author name property from ~/.gitconfig', function() {
      fetch.resetPackageJsonPath('missing.json');
      // expect(fetch.authorName()).to.include('Sean');
      expect(fetch.authorName()).to.be.a('string');
    });

  });

  describe('authorEmail function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('authorEmail');
    });

    it('should fetch author.email property from package.json', function() {
      expect(fetch.authorEmail()).to.include('.com');
    });

    it('should fetch author email property from ~/.gitconfig', function() {
      fetch.resetPackageJsonPath('missing.json');
      expect(fetch.authorEmail()).to.include('.com');
    });

  });

  describe('authorUrl function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('authorUrl');
    });

    it('should fetch author.url property from package.json', function() {
      // expect(fetch.authorUrl()).to.include('seantrane');
      expect(fetch.authorUrl()).to.be.a('string');
    });

  });

  describe('gitEmail function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('gitEmail');
    });

    it('should fetch the git user email address', function() {
      // expect(fetch.gitEmail()).to.include('seantrane');
      expect(fetch.gitEmail()).to.be.a('string');
    });

    // it('should fetch the git user email address from cache', function() {
    //   // const spy = sinon.spy(process, 'cwd');
    //   let email = fetch.gitEmail();
    //   expect(email).to.include('seantrane');
    //   email = fetch.gitEmail();
    //   expect(email).to.include('seantrane');
    //   // assert(spy.calledWith(fetch.gitEmail));
    // });

  });

  describe('githubUsername function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('githubUsername');
    });

    it('should fetch the GitHub username', function() {
      // expect(fetch.githubUsername()).to.include('seantrane');
      expect(fetch.githubUsername()).to.be.a('string');
    });

  });

  describe('gitName function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('gitName');
    });

    it('should fetch the git user name', function() {
      // expect(fetch.gitName()).to.include('Sean Trane');
      expect(fetch.gitName()).to.be.a('string');
    });

  });

  describe('packageDescription function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('packageDescription');
    });

    it('should fetch description property from package.json', function() {
      expect(fetch.packageDescription()).to.include('generator');
    });

    it('should return a default value when package.json does not exist', function() {
      fetch.resetPackageJsonPath('missing.json');
      expect(fetch.packageDescription('default')).to.equal('default');
      expect(fetch.packageDescription('')).to.equal('');
    });

  });

  describe('packageDestination function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('packageDestination');
    });

    it('should fetch destination directory for the repo/package', function() {
      expect(fetch.packageDestination('./')).to.include('/');
    });

  });

  describe('packageLicense function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('packageLicense');
    });

    it('should fetch license property from package.json', function() {
      expect(fetch.packageLicense()).to.equal('M');
    });

    it('should return a default value when package.json does not exist', function() {
      fetch.resetPackageJsonPath('missing.json');
      expect(fetch.packageLicense('MIT')).to.equal('M');
      expect(fetch.packageLicense('')).to.equal('');
    });

  });

  describe('packageName function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('packageName');
    });

    it('should fetch name property from package.json', function() {
      expect(fetch.packageName()).to.include('generator');
    });

    it('should return a default value when package.json does not exist', function() {
      fetch.resetPackageJsonPath('missing.json');
      expect(fetch.packageName('default')).to.equal('default');
      // expect(fetch.packageName('')).to.be.a('string');
    });

  });

  describe('packageRepository function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('packageRepository');
    });

    it('should fetch repository property from package.json', function() {
      expect(fetch.packageRepository()).to.include('yo-repo');
    });

    it('should return a default value when package.json does not exist', function() {
      fetch.resetPackageJsonPath('missing.json');
      expect(fetch.packageRepository('default')).to.include('default');
      expect(fetch.packageRepository('')).to.include('-package');
    });

  });

  describe('packageVersion function', function() {

    it('should exist', function() {
      expect(fetch).to.respondTo('packageVersion');
    });

    it('should fetch version property from package.json', function() {
      // expect(fetch.packageVersion()).to.equal(fetch._getFromPackage('version'));
      expect(fetch.packageVersion()).to.match(/\d+\.\d+\.\d+\-?[\w\d\_\-\.]*/);
    });

    it('should return a default value when package.json does not exist', function() {
      fetch.resetPackageJsonPath('missing.json');
      expect(fetch.packageVersion('0.0.0-development')).to.equal('0.0.0-development');
      expect(fetch.packageVersion('')).to.equal('');
    });

  });

});
