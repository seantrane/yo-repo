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
  yo.answers = {
    authorEmail,
    authorName,
    authorUrl,
    description,
    destination,
    homepageUrl,
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
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
