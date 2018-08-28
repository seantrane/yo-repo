import chalk from 'chalk';
import * as figlet from 'figlet';
import yoOptionOrPrompt from '../shared/yo-option-or-prompt';

const yosay = require('yosay');

export async function initializing(yo) {
  yo.log('\n\n\n' + chalk.bold.magentaBright(
    figlet.textSync('Yo Repo!', { font: 'Roman' }),
  ));
  yo.log(yosay('Welcome to Yo Repo!\n...\nLet\'s start the show') + '\n\n');
  yo.log(
    '' +
    '\n\n',
  );

  yo.context = {
    user: {
      name: yo.user.git.name(),
      email: yo.user.git.email(),
    },
  };
  yo.user.github.username().then((res) => {
    yo.context.user.githubUsername = res;
  });
  yo.optionOrPrompt = yoOptionOrPrompt;
}

export default initializing;
