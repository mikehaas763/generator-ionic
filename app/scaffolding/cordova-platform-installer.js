'use strict';
var os = require('os');
var cordova = require('cordova');

function CordovaPlatformInstaller() {
  this.platformsToInstall = [];
}

CordovaPlatformInstaller.prototype.install = function () {

};

/**
 * Return a list of all cordova platforms that are compatible with the host operating system.
 * @returns {string[]}
 */
CordovaPlatformInstaller.prototype.getCompatiblePlatforms = function () {
  // Should be develop for these platforms on anything
  var compatible = ['android', 'blackberry10', 'firefoxos'];

  if (os.platform() === 'darwin') {
    compatible.push('ios');
  }

  if (os.platform() === 'win32') {
    compatible.push('wp7');
    compatible.push('wp8');
    compatible.push('windows8');
  }

  if (os.platform() === 'linux') {
    compatible.push('ubuntu');
  }

  return compatible;
};

module.exports = CordovaPlatformInstaller;