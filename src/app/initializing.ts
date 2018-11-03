import chalk from 'chalk';
import * as figlet from 'figlet';
import yoOptionOrPrompt from '../shared/yo-option-or-prompt';
import YoRepoInterface from '../shared/yo-repo.interface';

const yosay = require('yosay');

export async function initializing(yo: YoRepoInterface) {
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
  try {
    if (yo.context.user.email.indexOf('@') !== -1 && yo.context.user.email.indexOf('github') !== -1) {
      yo.context.user.githubUsername = yo.context.user.email.substr(0, yo.context.user.email.indexOf('@'));
    } else {
      await yo.user.github.username()
        .then((res) => {
          yo.context.user.githubUsername = res;
        })
        .catch((err) => {
          // yo.log('\n\n' + chalk.bold.redBright('There was an error fetching GitHub username...') + '\n\n');
          // console.dir(err);
        });
    }
  } catch (error) {
    // do nothing
  }
  yo.optionOrPrompt = yoOptionOrPrompt;
}

export default initializing;
