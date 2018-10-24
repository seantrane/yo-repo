import chalk from 'chalk';

export async function writing(yo) {
  yo.log('\n\n\n' + chalk.bold.cyanBright('Writing files...'));
  yo.fs.copyTpl(yo.templatePath('.editorconfig'), yo.destinationPath('.editorconfig'));
}

export default writing;
