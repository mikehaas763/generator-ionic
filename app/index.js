'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var CordovaPluginInstaller = require('./scaffolding/cordova-plugin-installer.js');
var CordovaPlatformInstaller = require('./scaffolding/cordova-platform-installer.js');


var IonicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'],
        npm: false
      });
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Ionic generator.'));

    var platformChoices = new CordovaPlatformInstaller().getCompatiblePlatforms();

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is the name of your mobile app?',
      default: 'StarterApp'
    }, {
      type: 'input',
      name: 'appId',
      message: 'What ID would you like to give your app?',
      default: 'com.ionicframework.starterapp'
    }, {
      type: 'checkbox',
      name: 'platforms',
      message: 'Would you like to add any of these Cordova platforms?',
      choices: platformChoices
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appId = props.appId;
      this.platforms = props.platforms;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('platforms');
    this.mkdir('plugins');
    this.mkdir('.cordova');

    this.directory('www', 'www');

    this.copy('bowerrc', '.bowerrc');

    this.template('.cordova/_config.json', '.cordova/config.json');
    this.template('_bower.json', 'bower.json');
    this.template('_config.xml', 'www/config.xml');
  },

  scaffoldCordova: function () {
    new CordovaPluginInstaller().installDefaults();
    // todo: because of the async nature of these methods, need to make sure the project folder is scaffolded before adding platforms
    new CordovaPlatformInstaller().install(this.platforms);
  },

  projectFiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = IonicGenerator;