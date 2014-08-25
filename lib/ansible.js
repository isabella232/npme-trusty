// run the npme ansible role bootstrapping:
// nginx, couchdb, ndm, npm, etc.
var _ = require('lodash'),
  path = require('path');

function Ansible(opts) {
  _.extend(this, {
    user: 'ubuntu',
    logger: require('./logger'),
    util: (new require('./util')())
  }, opts)
}

Ansible.prototype.run = function(cb) {
  var _this = this;

  this.logger.success('installing OS dependencies with Ansible.')

  this.util.exec('ansible-playbook ./install-npme-ply.yml -i inventory', {
    uid: this.uid,
    cwd: path.resolve(__dirname, '../ansible')
  }, function() {
    _this.logger.success('Ansible run complete.');
    cb();
  });
};

module.exports = Ansible;
