# Developing Yeoman Generators

## Quick Links:

- [Getting started](http://yeoman.io/authoring/index.html)
- [Running Context](http://yeoman.io/authoring/running-context.html)
- [User Interactions](http://yeoman.io/authoring/user-interactions.html)
- [Composability](http://yeoman.io/authoring/composability.html)
- [Managing Dependencies](http://yeoman.io/authoring/dependencies.html)
- [Interacting with the file system](http://yeoman.io/authoring/file-system.html)
- [Storing user configs](http://yeoman.io/authoring/storage.html)
- [Unit testing](http://yeoman.io/authoring/testing.html)
- [Debugging Generators](http://yeoman.io/authoring/debugging.html)
- [Integrating Yeoman in other tools](http://yeoman.io/authoring/integrating-yeoman.html)
- [Full API documentation](http://yeoman.io/generator/)

## File structure

In an example project, a directory tree could look like this:

```text
generator-name/
 ├─ package.json
 └─ generators/
     ├─ app/
     │   └─ index.js
     └─ router/
         └─ index.js
```

This generator will expose `yo name` and `yo name:router` commands.

## The run loop

The available priorities are (in running order):

1. `initializing` - Your initialization methods (checking current project state, getting configs, etc)
2. `prompting` - Where you prompt users for options (where you'd call `this.prompt()`)
3. `configuring` - Saving configurations and configure the project (creating `.editorconfig` files and other metadata files)
4. `default` - If the method name doesn't match a priority, it will be pushed to this group.
5. `writing` - Where you write the generator specific files (routes, controllers, etc.)
6. `conflicts` - Where conflicts are handled (used internally)
7. `install` - Where installations are run (npm, bower)
8. `end` - Called last, cleanup, say good bye, etc.

Follow these priorities guidelines and your generator will play nice with others.

---

## Prompts

Prompts are the main way a generator interacts with a user. The prompt module is provided by [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) and you should refer [to its API](https://github.com/SBoudrias/Inquirer.js) for a list of available prompt options.

The `prompt` method is asynchronous and returns a promise. You'll need to return the promise from your task in order to wait for its completion before running the next one. ([learn more about asynchronous task](http://yeoman.io/authoring/running-context.html))

### Using user answers at a later stage

A very common scenario is to use the the user answers at a later stage, e.g. in writing queue. This can be easily achieved by adding them to this context:

```javascript
module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
      type    : 'confirm',
      name    : 'cool',
      message : 'Would you like to enable the Cool feature?'
    }]);
  }

  writing() {
    this.log('cool feature', this.answers.cool); // user answer `cool` used
  }
};
```

### Remembering user preferences

A user may give the same input to certain questions every time they run your generator. For these questions, you probably want to remember what the user answered previously and use that answer as the new `default`.

Yeoman extends the Inquirer.js API by adding a `store` property to question objects. This property allows you to specify that the user provided answer should be used as the default answer in the future. This can be done as follows:

```javascript
this.prompt({
  type    : 'input',
  name    : 'username',
  message : 'What\'s your GitHub username',
  store   : true
});
```

_Note:_ Providing a default value will prevent the user from returning any empty answers.

If you're only looking to store data without being directly tied to the prompt, make sure to checkout [the Yeoman storage documentation](http://yeoman.io/authoring/storage.html).

---

## Arguments

To notify the system that we expect an argument, we use the `this.argument()` method. This method accepts a `name` (String) and an optional hash of options.

The `name` argument will then be available as: `this.options[name]`.

The options hash accepts multiple key-value pairs:

- `desc` Description for the argument
- `required` Boolean whether it is required
- `type` String, Number, Array (can also be a custom function receiving the raw string value and parsing it)
- `default` Default value for this argument

This method must be called inside the constructor method. Otherwise Yeoman won't be able to output the relevant help information when a user calls your generator with the help option: e.g. `yo webapp --help`.

Here is an example:

```javascript
module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    // And you can then access it later; e.g.
    this.log(this.options.appname);
  }
};
```

Argument of type `Array` will contain all remaining arguments passed to the generator.

---

## Options

Options look a lot like arguments, but they are written as command line flags.

```sh
yo webapp --coffee
```

To notify the system that we expect an option, we use the `this.option()` method. This method accepts a `name` (String) and an optional hash of options.

The `name` value will be used to retrieve the option at the matching key `this.options[name]`.

The options hash (the second argument) accepts multiple key-value pairs:

- `description` Description for the option
- `alias` Short name for option
- `type` Either Boolean, String or Number (can also be a custom function receiving the raw string value and parsing it)
- `default` Default value
- `hide` Boolean whether to hide from help

Here is an example:

```javascript
module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    // This method adds support for a `--coffee` flag
    this.option('coffee');
    // And you can then access it later; e.g.
    this.scriptSuffix = (this.options.coffee ? '.coffee' : '.js');
  }
};
```

---

## Outputting Information

Outputting information is handled by the `this.log` module.

The main method you'll use is simply `this.log` (e.g. `this.log('Hey! Welcome to my awesome generator'))`. It takes a string and outputs it to the user; basically it mimics `console.log()` when used inside of a terminal session. You can use it like so:

```javascript
module.exports = class extends Generator {
  myAction() {
    this.log('Something has gone wrong!');
  }
};
```

---

## Manage Dependencies

### Manage npm dependencies programmatically

You can programmatically create or extend your `package.json` file if you don't want to use a template but like to have fixed versions of your dependencies. Yeomans file system tools can help you to get this job done.

Example defining `eslint` as dev dependency and `react` as dependency:

```javascript
class extends Generator {
  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install() {
    this.npmInstall();
  }
};
```

### Using other tools

Yeoman provides an abstraction to allow users to `spawn` any CLI commands. This abstraction will normalize to command so it can run seamlessly in Linux, Mac and Windows system.

For example, if you're a PHP aficionado and wished to run `composer`, you'd write it this way:

```javascript
class extends Generator {
  install() {
    this.spawnCommand('composer', ['install']);
  }
}
```

Make sure to call the `spawnCommand` method inside the `install` queue. Your users don't want to wait for an installation command to complete.
