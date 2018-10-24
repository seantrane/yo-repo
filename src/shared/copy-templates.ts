import RepoBaseGenerator from './base-generator';
import copyTpl from './copy-tpl';

export async function copyTemplates(yo: RepoBaseGenerator) {
  await yo.templates.forEach((path) => {
    copyTpl(yo, path);
  });
}

export default copyTemplates;
