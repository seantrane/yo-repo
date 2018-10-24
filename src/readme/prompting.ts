import { resolve as pathResolve } from 'path';
import YoRepoPrompts from '../shared/yo-repo-prompts';

export async function prompting(yo) {
  const {
    username,
    profileName,
    repositoryName,
    packageName,
    destination,
    description,
    license,
    authorName,
    authorEmail,
    authorUrl,
    repositoryUrl,
    homepageUrl,
    demoUrl,
    installation,
  } = await new YoRepoPrompts(yo).prompt({
    username: true,
    profileName: true,
    repositoryName: true,
    packageName: true,
    destination: true,
    description: true,
    license: true,
    authorName: true,
    authorEmail: true,
    authorUrl: true,
    repositoryUrl: true,
    homepageUrl: true,
    demoUrl: true,
    installation: true,
  });
  yo.answers = {
    authorEmail,
    authorName,
    authorUrl,
    demoUrl,
    description,
    destination,
    homepageUrl,
    installation,
    license,
    packageName,
    profileName,
    repositoryName,
    repositoryUrl,
    username,
  };
  if (yo.options['features'] === undefined) {
    yo.answers.features = await YoRepoPrompts.featuresPrompt(yo);
  } else {
    yo.answers.features = yo.options['features'];
  }
  if (yo.options['dependencies'] === undefined) {
    yo.answers.dependencies = await YoRepoPrompts.dependenciesPrompt(yo);
  } else {
    yo.answers.dependencies = yo.options['dependencies'];
  }
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
