import RepoBaseGenerator from './base-generator';

export async function copyTpl(yo: RepoBaseGenerator, path: string, newPath?: string) {
  yo.fs.copyTpl(
    yo.templatePath(path),
    yo.destinationPath(newPath || path),
    yo.context,
  );
}

export default copyTpl;
