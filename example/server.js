var zetta = require('zetta');
var MeterInterfaceUnit = require('../index');
var argv = require('minimist')(process.argv.slice(2));


var COLLECTER_ID = argv['c'] || 0;

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
    SyncNumAlarms: 1
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
    SyncNumAlarms: 1
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
    SyncNumAlarms: 1
  }
];


zetta()
  .use(MeterInterfaceUnit)
  .properties(collectors[COLLECTER_ID])
  .name(collectors[COLLECTER_ID].CollectorName)
  .link('http://dev.zettaapi.org')
  .listen(1337);