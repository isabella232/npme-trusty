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
    installDirectory: '/etc/npme',
    logger: require('./logger'),
    util: new Util()
  }, opts)
}

Service.prototype.generateConfiguration = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec('npme-service-installer generate-config', {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.installPackages = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec('npme-service-installer install-packages', {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.chownPackageDirectory = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec('sudo chown ubuntu:ubuntu -R /home/ubuntu/.npm', {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.installServices = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec('npme-service-installer install-services', {cwd: _this.installDirectory}, function() {
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