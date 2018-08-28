import { resolve as pathResolve } from 'path';
import YoRepoPrompts from '../shared/yo-repo-prompts';

export async function prompting(yo) {
  const {
    destination,
    cicd,
  } = await new YoRepoPrompts(yo).prompt({
    destination: true,
    cicd: true,
  });
  yo.answers = {
    cicd,
    destination,
  };
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
