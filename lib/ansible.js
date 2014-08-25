// run the npme ansible role bootstrapping:
// nginx, couchdb, ndm, npm, etc.
var _ = require('lodash'),
  path = require('path'),
  Util = require('./util');

function Ansible(opts) {
  _.extend(this, {
    logger: require('./logger'),
    util: new Util()
  }, opts)
}

Ansible.prototype.run = function(cb) {
  var _this = this;

  this.logger.success('Installing OS dependencies with Ansible.')

  this.util.exec('ansible-playbook ./install-npme-play.yml -i inventory', {
    cwd: path.resolve(__dirname, '../ansible')
  }, function() {
    _this.logger.success('Ansible run complete.');
    cb();
  });
};

module.exports = Ansible;
