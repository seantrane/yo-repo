import { resolve as pathResolve } from 'path';
import YoRepoPrompts from '../shared/yo-repo-prompts';

export async function prompting(yo) {
  const {
    destination,
  } = await new YoRepoPrompts(yo).prompt({
    destination: true,
  });
  yo.answers = {
    destination,
  };
  yo.context = { ...yo.context, ...yo.answers };
}

export default prompting;
