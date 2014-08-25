// install the minimum viable set of
// apt packages required to perform an
// npmE install on Ubuntu trusty.
var _ = require('underscore');

function Apt(opts) {
  _.extend(this, {
    logger: require('./logger'),
    util: (new require('./util')()),
    packages: ['ansible'],
    installPrefix: 'sudo apt-get install'
  }, opts)
}

Apt.prototype.installPackages = function() {
  var _this = this;

  this.packages.forEach(function(package) {
    _this.util.exec(_this.installPrefix + " " + package);
  });
};

module.exports = Apt;
