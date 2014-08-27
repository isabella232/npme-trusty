var _ = require('lodash');
  Ansible = require('./ansible'),
  Apt = require('npme-ansible'),
  async = require('async'),
  Service = require('./service'),
  logger = require('./logger');

module.exports = function() {
  var apt = new Apt(),
    ansible = new Ansible(),
    service = new Service();

  async.series([
    function(cb) {
      apt.installPackages(cb);
    },
    function(cb) {
      ansible.install(cb);
    },
    function(cb) {
      service.generateConfiguration(cb);
    },
    function(cb) {
      ansible.configure(cb);
    }
  ], function() {
    logger.success('npmE is now up and running!');
  });
};
