'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var IonicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
//        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Ionic generator.'));

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
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appId = props.appId;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('platforms');
    this.mkdir('plugins');
    this.mkdir('.cordova');

    this.template('.cordova/_config.json', '.cordova/config.json');
  },

  projectFiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = IonicGenerator;