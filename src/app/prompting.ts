import { resolve } from 'path';
import YoRepoPrompts from '../shared/yo-repo-prompts';

export async function prompting(yo) {
  const {
    username,
    profileName,
    repositoryName,
    packageName,
    destination,
    description,
    version,
    license,
    authorName,
    authorEmail,
    authorUrl,
    repositoryUrl,
    homepageUrl,
  } = await new YoRepoPrompts(yo).prompt({
    username: true,
    profileName: true,
    repositoryName: true,
    packageName: true,
    destination: true,
    description: true,
    version: true,
    license: true,
    authorName: true,
    authorEmail: true,
    authorUrl: true,
    repositoryUrl: true,
    homepageUrl: true,
  });
  const keywords = await YoRepoPrompts.keywordsPrompt(yo);
  const features = await YoRepoPrompts.featuresPrompt(yo);
  const dependencies = await YoRepoPrompts.dependenciesPrompt(yo);
  yo.answers = {
    authorEmail,
    authorName,
    authorUrl,
    dependencies,
    description,
    destination,
    features,
    homepageUrl,
    keywords,
    license,
    packageName,
    profileName,
    repositoryName,
    repositoryUrl,
    username,
    version,
  };
  if (yo.options['generators'].indexOf('ignore') !== -1) {
    yo.composeWith('repo:ignore', {
      packageName: yo.answers.packageName,
      destination: yo.answers.destination,
    });
  }
  if (yo.options['generators'].indexOf('license') !== -1) {
    yo.composeWith(require.resolve('generator-license'), {
      email: yo.answers.authorEmail || yo.answers.username + '@users.noreply.github.com',
      license: yo.answers.license,
      name: yo.answers.authorName || yo.answers.username,
      output: resolve(yo.answers.destination, 'LICENSE'),
      website: yo.answers.homepageUrl || yo.answers.authorUrl,
    });
  }
  if (yo.options['generators'].indexOf('readme') !== -1) {
    yo.composeWith('repo:readme', {
      authorEmail: yo.answers.authorEmail,
      authorName: yo.answers.authorName,
      authorUrl: yo.answers.authorUrl,
      dependencies: yo.answers.dependencies,
      description: yo.answers.description,
      destination: yo.answers.destination,
      features: yo.answers.features,
      homepageUrl: yo.answers.homepageUrl,
      license: yo.answers.license,
      packageName: yo.answers.packageName,
      profileName: yo.answers.profileName || yo.answers.username,
      repositoryName: yo.answers.repositoryName || yo.answers.packageName,
      repositoryUrl: yo.answers.repositoryUrl,
      username: yo.answers.username,
    });
  }
  if (yo.options['generators'].indexOf('contributing') !== -1) {
    yo.composeWith('repo:contributing', {
      destination: yo.answers.destination,
      packageName: yo.answers.packageName,
      profileName: yo.answers.profileName || yo.answers.username,
      repositoryName: yo.answers.repositoryName || yo.answers.packageName,
      repositoryUrl: yo.answers.repositoryUrl,
      username: yo.answers.username,
    });
  }
  if (yo.options['generators'].indexOf('roadmap') !== -1) {
    yo.composeWith('repo:roadmap', {
      destination: yo.answers.destination,
      features: yo.answers.features,
      packageName: yo.answers.packageName,
      profileName: yo.answers.profileName || yo.answers.username,
      repositoryName: yo.answers.repositoryName || yo.answers.packageName,
      repositoryUrl: yo.answers.repositoryUrl,
      username: yo.answers.username,
    });
  }
  if (yo.options['generators'].indexOf('ci') !== -1) {
    yo.composeWith('repo:ci', {
      // cicd: yo.answers.cicd,
      destination: yo.answers.destination,
      packageName: yo.answers.packageName,
      profileName: yo.answers.profileName || yo.answers.username,
      repositoryName: yo.answers.repositoryName || yo.answers.packageName,
      repositoryUrl: yo.answers.repositoryUrl,
      username: yo.answers.username,
    });
  }
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
