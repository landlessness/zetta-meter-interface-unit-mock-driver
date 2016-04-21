var zetta = require('zetta');
var MeterInterfaceUnit = require('../index');
var argv = require('minimist')(process.argv.slice(2));


var COLLECTER_ID = argv['c'] || 0;
var PORT = argv['p'] || 1337;

var collectors = [
  {
    CollectorID: '12345_0000',
    CollectorName: 'Test 00',
    CollectorStatus: 'up',
    CollectorLatitude: 32.62455,
    CollectorLongitude: -85.39496,
    NumReadings: 999,
    NumOwned: 1500,
    NumOwnedHeard: 800,
    LastSyncTime: '2010/01/01 08:24',
    SyncNumReads: 100,
    SyncNumProfiles: 99,
    SyncNumConfigs: 5,
    SyncNumAlarms: 1,
    style: {
      properties: {
        foregroundColor: {
          decimal: {
            red: 171,
            green: 182,
            blue: 191
          },
          hex: "#ABB6BF"
        },
        backgroundColor: {
          decimal: {
            red: 0,
            green: 80,
            blue: 154
          },
          hex: "#00509A"
        }
      }
    }
  },
  {
    CollectorID: '12345_0001',
    CollectorName: 'Test 01',
    CollectorStatus: 'up',
    CollectorLatitude: 32.62455,
    CollectorLongitude: -85.39496,
    NumReadings: 999,
    NumOwned: 1500,
    NumOwnedHeard: 800,
    LastSyncTime: '2010/01/01 08:24',
    SyncNumReads: 100,
    SyncNumProfiles: 99,
    SyncNumConfigs: 5,
    SyncNumAlarms: 1,
    style: {
      properties: {
        foregroundColor: {
          decimal: {
            red: 255,
            green: 255,
            blue: 255
          },
          hex: "#FFFFFF"
        },
        backgroundColor: {
          decimal: {
            red: 224,
            green: 111,
            blue: 44
          },
          hex: "#E06F2C"
        }
      }
    }
  },
  {
    CollectorID: '12345_0002',
    CollectorName: 'Test 02',
    CollectorStatus: 'up',
    CollectorLatitude: 32.62455,
    CollectorLongitude: -85.39496,
    NumReadings: 999,
    NumOwned: 1500,
    NumOwnedHeard: 800,
    LastSyncTime: '2010/01/01 08:24',
    SyncNumReads: 100,
    SyncNumProfiles: 99,
    SyncNumConfigs: 5,
    SyncNumAlarms: 1,
    style: {
      properties: {
        backgroundColor: {
          decimal: {
            red: 255,
            green: 255,
            blue: 255
          },
          hex: "#FFFFFF"
        },
        foregroundColor: {
          decimal: {
            red: 224,
            green: 111,
            blue: 44
          },
          hex: "#E06F2C"
        }
      }
    }
  }
];

var collector = collectors[COLLECTER_ID];
var SERVER_NAME = collector.CollectorName;

zetta()
  .use(MeterInterfaceUnit)
  .properties(collector)
  .name(SERVER_NAME)
  .link('http://dev.zettaapi.org')
  .listen(PORT, function(){
    console.log('Zetta server ' + SERVER_NAME + ' is running at http://127.0.0.1:' + PORT);
});
