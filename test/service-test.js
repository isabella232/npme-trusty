var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Service = require('../lib/service');

lab.experiment('Service', function() {

  lab.experiment('generateConfiguration', function() {
    lab.it('execs appropriate command to generate config', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(command).to.eql('npme-service-installer generate-config');
            done();
          }
        }
      });

      service.generateConfiguration();
    });
  });

  lab.experiment('getBinaryDirectory', function() {
    lab.it('parses service.json and returns the appropriate binary directory', function(done) {
      var service = new Service({
        installDirectory: './test/fixtures'
      });

      Lab.expect(service.getBinaryDirectory()).to.eql('/home/ubuntu/packages');
      done();
    });
  });

});
