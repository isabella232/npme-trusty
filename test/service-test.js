var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Service = require('../lib/service');

lab.experiment('Service', function() {

  lab.experiment('interview', function() {
    lab.it('execs appropriate command to generate config', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(command).to.match(/ndm interview/);
            done();
          }
        }
      });

      service.interview();
    });
  });

  lab.experiment('installServices', function() {
    lab.it('execs appropriate command to install services', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(command).to.eql('sudo ndm generate --uid=ubuntu --gid=ubuntu');
            done();
          }
        }
      });

      service.installServices();
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

  lab.experiment('printFinishMessage', function() {
    lab.it('prints the finish message', function(done) {
      var service = new Service({
        installDirectory: './test/fixtures',
        logger: {
          warn: function() {},
          success: function() {},
          error: function(msg) {
            // npm loves you!
            Lab.expect(msg).to.match(/♥♥♥♥         ♥♥♥♥     ♥♥♥♥                  ♥♥♥♥         ♥♥♥♥♥    ♥♥♥♥♥    ♥♥♥♥♥/);
            done();
          }
        }
      });

      service.printFinishMessage();
    });
  });

});
