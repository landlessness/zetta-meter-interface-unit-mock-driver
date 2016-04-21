var Device = require('zetta-device');
var util = require('util');

var MeterInterfaceUnit = module.exports = function() {
  Device.call(this);
  
  var miuProperties = Object.keys(arguments[0]);
  for (i = 0; i < miuProperties.length; i++) {
    this[miuProperties[i]] = arguments[0][miuProperties[i]];
  }
  
  this.LeakState = 0;
  this.BackflowState = 0;
  this.Reading = 111111;
  this.AlarmType = 0;
  this._increment = 15;
  this._timeOut = null;
  this._counter = 0;
};
util.inherits(MeterInterfaceUnit, Device);

MeterInterfaceUnit.prototype.init = function(config) {
  var state = this.MeterActive === 'Y' ? 'Active' : 'Inactive';
  config
    .name('MIU ' + this.MiuId)
    .state(state)
    .type('miu')
    .when('Active', {allow: ['make-inactive', '_throw-alarm']})
    .when('Inactive', {allow: ['make-active']})
    .map('make-inactive', this.makeInactive)
    .map('make-active', this.makeActive)
    .map('_throw-alarm', this._throwAlarm, [{name: 'AlarmType', type: 'text'}])
    .monitor('AlarmType')
    .monitor('LeakState')
    .monitor('BackflowState')
    .monitor('Reading');

    this.style = {
      properties: {
        stateImage: {
          tintMode: 'original',
          url: 'http://www.necowater.com/wp-content/uploads/2015/09/R900-ed.jpg'
        }
      },
      actions: {'_throw-alarm': {display: 'none'}}
    };

  if (state === 'Active') {
    this._startMockData();
  }

};


MeterInterfaceUnit.prototype.makeActive = function(cb) {
  this.state = 'Active';
  this._startMockData();
  cb();
}

MeterInterfaceUnit.prototype.makeInactive = function(cb) {
  this.state = 'Inactive'
  this._stopMockData();
  cb();
}

MeterInterfaceUnit.prototype._startMockData = function(cb) {
  var self = this;
  this._timeOut = setInterval(function() {
    self.Reading = self.Reading + 51234;
  }, 100);
  this._alarmTimeOut = setInterval(function() {
    if (self.available('_throw-alarm')) {
      self.call('_throw-alarm', Math.floor(Math.random() * 4));
    }
  }, 1000);
}

MeterInterfaceUnit.prototype._stopMockData = function(cb) {
  clearTimeout(this._timeOut);
  clearTimeout(this._alarmTimeOut);
}

MeterInterfaceUnit.prototype._throwAlarm = function(alarmType, cb) {
  this.AlarmType = alarmType;
  if (alarmType === 0) {
    this.LeakState = 0;
    this.BackflowState = 0;
  } else if (alarmType === 1) {
    this.LeakState = 0;
    this.BackflowState = 1;
  } else if (alarmType === 2) {
    this.LeakState = 0;
    this.BackflowState = 2;
  } else if (alarmType === 3) {
    this.LeakState = 1;
    this.BackflowState = 0;
  }
  cb();
}