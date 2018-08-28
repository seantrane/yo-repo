import { resolve as pathResolve } from 'path';
import YoRepoPrompts from '../shared/yo-repo-prompts';

export async function prompting(yo) {
  const {
    profileName,
    repositoryName,
    packageName,
    destination,
    repositoryUrl,
  } = await new YoRepoPrompts(yo).prompt({
    profileName: true,
    repositoryName: true,
    packageName: true,
    destination: true,
    repositoryUrl: true,
  });
  yo.answers = {
    destination,
    packageName,
    profileName,
    repositoryName,
    repositoryUrl,
  };
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
