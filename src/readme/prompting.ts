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
  });
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
  const { installation } = await yo.prompt([
    {
      type: 'input',
      name: 'installation',
      message: 'Installation command:',
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
    demoUrl,
    dependencies,
    description,
    destination,
    features,
    homepageUrl,
    installation,
    license,
    packageName,
    profileName,
    repositoryName,
    repositoryUrl,
    username,
  };
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
