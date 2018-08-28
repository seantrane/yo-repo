export async function writing(yo) {
  yo.fs.copyTpl(yo.templatePath('.editorconfig'), yo.destinationPath('.editorconfig'));
}

export default writing;
