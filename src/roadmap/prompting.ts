import { resolve as pathResolve } from 'path';
import YoRepoPrompts from '../shared/yo-repo-prompts';

export async function prompting(yo) {
  const {
    destination,
    repositoryUrl,
  } = await new YoRepoPrompts(yo).prompt({
    destination: true,
    repositoryUrl: true,
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
  yo.answers = {
    destination,
    features,
    repositoryUrl,
  };
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
