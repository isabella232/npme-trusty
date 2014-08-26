// install the minimum viable set of
// apt packages required to perform an
// npmE install on Ubuntu trusty.
var _ = require('lodash'),
  async = require('async'),
  Util = require('./util');

function Apt(opts) {
  _.extend(this, {
    logger: require('./logger'),
    util: new Util(),
    packages: ['ansible'],
    installPrefix: 'sudo apt-get install'
  }, opts)
}

Apt.prototype.installPackages = function(cb) {
  var _this = this;

  async.each(this.packages, function(package, callback) {
    _this.logger.success('installing', package);

    _this.util.exec(_this.installPrefix + " " + package, function() {
      callback();
    });
  }, function() {
    cb();
  });
};

module.exports = Apt;
