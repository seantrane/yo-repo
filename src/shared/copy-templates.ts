import RepoBaseGenerator from './base-generator';
import copyTpl from './copy-tpl';

export async function copyTemplates(yo: RepoBaseGenerator) {
  yo.templates.forEach((path) => {
    copyTpl(yo, path);
  });
}

export default copyTemplates;
