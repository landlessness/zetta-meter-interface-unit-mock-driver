var Scout = require('zetta-scout');
var util = require('util');
var MeterInterfaceUnit = require('./miu');

var MeterInterfaceUnitScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(MeterInterfaceUnitScout, Scout);

MeterInterfaceUnitScout.prototype.init = function(next) {
  var miuDevices = [
    {  
      MiuId: 123456789,
      PremiseID: 123435,
      MeterNumber: 12345678,
      MeterActive: 'Y',
      MeterType: '5/8"',
      PremiseAccount: 12345,
      PremiseAddress: '1234 Main',
      PremiseLatitude: 35.55,
      PremiseLongitude: -86.27,
      Multiplier: 1,
      UOM: 'Gallons'
    },
    {  
      MiuId: 987654321,
      PremiseID: 54321,
      MeterNumber: 87654321,
      MeterActive: 'Y',
      MeterType: '5/8"',
      PremiseAccount: 54321,
      PremiseAddress: '4321 Main',
      PremiseLatitude: 35.56,
      PremiseLongitude: -86.28,
      Multiplier: 1,
      UOM: 'Gallons'
    },
    {  
      MiuSiteId: 382571,
      MiuId: 'E000007494-KWH',
      PremiseID: '000042897000009628',
      MeterNumber: 'E000007494',
      MeterActive: 'N',
      MeterType: '0004',
      PremiseAccount: '42897-9628',
      PremiseAddress: '105 VENTOURA',
      PremiseCity: '',
      PremiseState: '',
      PremiseZip: '',
      PremiseLatitude: '',
      PremiseLongitude: '',
      Multiplier: '',
      UOM: ''
    }
  ];

  var self = this;
  for (i=0; i<miuDevices.length; i++) {
    var miuDevice = miuDevices[i];
    (function(miuDevice){
      var query = self.server.where({type: 'miu', MiuId: miuDevice.MiuId});
      self.server.find(query, function(err, results) {
        if (results[0]) {
          self.provision(results[0], MeterInterfaceUnit, miuDevice);
        } else {
          self.discover(MeterInterfaceUnit, miuDevice);
        }
      });
    })(miuDevice);
  }
  next();
}