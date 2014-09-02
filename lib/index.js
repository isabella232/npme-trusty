var _ = require('lodash');
  fs = require('fs'),
  Ansible = require('npme-ansible'),
  Apt = require('./apt'),
  async = require('async'),
  mkdirp = require('mkdirp');
  Service = require('./service'),
  logger = require('./logger');

module.exports = function(opts) {
  var apt = new Apt(),
    ansible = new Ansible(),
    service = new Service();

  async.series([
    function(cb) {
      apt.installPackages(cb);
    },
    function(cb) {
      // populate .npmrc with information required for license auth.
      fs.writeFileSync('/home/ubuntu/.npmrc', "//enterprise.npmjs.com/:_password=" + (new Buffer(opts.licenseKey)).toString('base64')
        + "\n//enterprise.npmjs.com/:username=" + opts.userEmail
        + "\n@npm:registry=https://enterprise.npmjs.com/\n");

      return cb();
    },
    function(cb) {
      ansible.install(cb);
    },
    function(cb) {
      // write the license to disk.
      // we need Ansible to have created the file.
      fs.writeFileSync('/etc/npme/.license.json', JSON.stringify(opts.license, null, 2));

      return cb();
    },
    function(cb) {
      service.generateConfiguration(cb);
    },
    function(cb) {
      ansible.configure(service.getBinaryDirectory(), cb);
    },
    function(cb) {
      service.chownPackageDirectory().then(function() {
        return service.installPackages(cb);
      });
    },
    function(cb) {
      service.installServices(cb);
    }
  ], function() {
    logger.success('npmE is now up and running!');
  });
};
