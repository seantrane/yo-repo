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
  yo.answers = {
    destination,
    repositoryUrl,
  };
  if (yo.options['features'] === undefined) {
    yo.answers.features = await YoRepoPrompts.featuresPrompt(yo);
  } else {
    yo.answers.features = yo.options['features'];
  }
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
