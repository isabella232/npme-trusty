// prompt user about their environment,
// and install npmE service dependencies.
var _ = require('lodash'),
  async = require('async'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('bluebird'),
  Util = require('./util');

function Service(opts) {
  _.extend(this, {
    user: 'ubuntu',
    group: 'ubuntu',
    sudo: true,
    installDirectory: '/etc/npme',
    logger: require('./logger'),
    util: new Util()
  }, opts)
}

Service.prototype.generateConfiguration = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec('npme-service-installer generate-config --user ' + _this.user + ' --group ' + _this.group + ' --sudo ' + _this.sudo, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.installPackages = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec('npme-service-installer install-packages --user ' + _this.user + ' --group ' + _this.group + ' --sudo ' + _this.sudo, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.chownPackageDirectory = function(cb) {
  var _this = this,
    command = 'chown ' + this.user + ':' + this.group + ' -R /home/' + this.user + '/.npm';

  if (this.sudo) command = 'sudo ' + command;

  return new Promise(function(resolve, reject) {
    _this.util.exec(command, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.installServices = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec('npme-service-installer install-services --user ' + _this.user + ' --group ' + _this.group + ' --sudo ' + _this.sudo, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.getBinaryDirectory = function() {
  var serviceJson = JSON.parse(fs.readFileSync(
    path.resolve(this.installDirectory, 'service.json'),
    'utf-8'
  ));

  return serviceJson.args['--binary-directory'];
};


module.exports = Service;
