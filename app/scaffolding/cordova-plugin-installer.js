'use strict';
var cordovaCli = require('cordova');

function CordovaPluginInstaller() { }

CordovaPluginInstaller.prototype.installDefaults = function () {
  cordovaCli.plugin('add', 'org.apache.cordova.device');
  cordovaCli.plugin('add', 'org.apache.cordova.console');
  cordovaCli.plugin('add', 'org.apache.cordova.statusbar');
};

module.exports = CordovaPluginInstaller;