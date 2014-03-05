'use strict';
var os = require('os');
var cordova = require('cordova');
var NotArrayException = require('../exceptions/not-array-exception');

function CordovaPlatformInstaller() {
}

CordovaPlatformInstaller.prototype.install = function (platforms) {
  if (!Array.isArray(platforms)) {
    throw new NotArrayException('The list of platforms you pass to CordovaPlatformInstaller.install() should be an array.');
  }

  platforms.forEach(function (platform) {
    cordova.platform('add', platform);
  });
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