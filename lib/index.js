var _ = require('lodash');
  Ansible = require('./ansible'),
  Apt = require('./apt'),
  async = require('async'),
  logger = require('./logger');

module.exports = function() {
  var apt = new Apt(),
    ansible = new Ansible();

  async.series([
    function(cb) {
      apt.installPackages(cb);
    },
    function(cb) {
      ansible.run(cb);
    }
  ], function() {
    logger.success('npmE is now up and running!');
  });
};
