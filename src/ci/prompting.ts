import { resolve as pathResolve } from 'path';
import YoRepoPrompts from '../shared/yo-repo-prompts';

export async function prompting(yo) {
  const {
    profileName,
    repositoryName,
    destination,
    authorName,
    authorEmail,
    cicd,
  } = await new YoRepoPrompts(yo).prompt({
    profileName: true,
    repositoryName: true,
    destination: true,
    authorName: true,
    authorEmail: true,
    cicd: true,
  });
  yo.answers = {
    authorName,
    authorEmail,
    cicd,
    destination,
    profileName,
    repositoryName,
  };
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
