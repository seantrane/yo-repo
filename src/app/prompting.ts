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
  const keywords = [];
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
  const features = [];
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
  const { installation, demo } = await yo.prompt([
    {
      type: 'input',
      name: 'installation',
      message: 'Installation command:',
    },
    {
      type: 'input',
      name: 'demo',
      message: 'Demo URL:',
    },
  ]);
  const dependencies = [];
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
  yo.answers = {
    authorEmail,
    authorName,
    authorUrl,
    demo,
    dependencies,
    description,
    destination,
    features,
    homepageUrl,
    installation,
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
      demo: yo.answers.demo,
      dependencies: yo.answers.dependencies,
      description: yo.answers.description,
      destination: yo.answers.destination,
      features: yo.answers.features,
      homepageUrl: yo.answers.homepageUrl,
      installation: yo.answers.installation,
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
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
