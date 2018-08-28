import chalk from 'chalk';

const yosay = require('yosay');

export async function end(yo) {
  yo.log('\n\n' + chalk.bold.green('Success!') + '\n\n');
  yo.log({ context: yo.context });
  yo.log(yosay(chalk.bold.magentaBright('Thank you for using\nYo Repo!')));
}

export default end;
