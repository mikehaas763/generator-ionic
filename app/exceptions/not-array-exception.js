'use strict';

function NotArrayException(message) {
  this.message = message;
}

NotArrayException.prototype.toString = function () {
  return 'NotArrayException: ' + this.message;
};

module.exports = NotArrayException;