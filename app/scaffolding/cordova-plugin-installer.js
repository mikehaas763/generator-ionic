'use strict';
var cordova = require('cordova');

function CordovaPluginInstaller() {
  this.pluginDefaults = [
    'org.apache.cordova.device',
    'org.apache.cordova.console',
    'org.apache.cordova.statusbar'
  ];
}

CordovaPluginInstaller.prototype.installDefaults = function () {
  this.pluginDefaults.forEach(function (plugin) {
    cordova.plugin('add', plugin);
  });
};

module.exports = CordovaPluginInstaller;