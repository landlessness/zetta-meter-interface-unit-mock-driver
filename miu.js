var Device = require('zetta-device');
var util = require('util');

var TIMEOUT = 3000;

var MeterInterfaceUnit = module.exports = function() {
  Device.call(this);
  
  var miuProperties = Object.keys(arguments[0]);
  for (i = 0; i < miuProperties.length; i++) {
    this[miuProperties[i]] = arguments[0][miuProperties[i]];
  }
  
};
util.inherits(MeterInterfaceUnit, Device);

MeterInterfaceUnit.prototype.init = function(config) {
  var state = this.MeterActive === 'Y' ? 'Active' : 'Inactive';
  config
    .name('MIU ' + this.MiuId)
    .state(state)
    .type('miu')
    .when('disarmed', {allow: ['arm-stay', 'arm-away']})
    .when('armed-stay', {allow: ['disarm']})
    .when('armed-away', {allow: ['disarm']})
    .when('arming-stay', {allow: []})
    .when('arming-away', {allow: []})
    .when('disarming', {allow: []})
    .map('arm-stay', this.armStay)
    .map('arm-away', this.armAway)
    .map('disarm', this.disarm);

  this.style = {properties: {stateImage: {
    tintMode: 'original',
    url: 'http://www.necowater.com/wp-content/uploads/2015/09/R900-ed.jpg'
  }}};

};

MeterInterfaceUnit.prototype.armStay = function(cb) {
  
  this.state = 'arming-stay';
  cb();

  var self = this;
  setTimeout(function(){
    self.state = 'armed-stay';
    cb();
  }, TIMEOUT);

}

MeterInterfaceUnit.prototype.armAway = function(cb) {

  this.state = 'arming-away';
  cb();

  var self = this;
  setTimeout(function(){
    self.state = 'armed-away';
    cb();
  }, TIMEOUT);

}

MeterInterfaceUnit.prototype.disarm = function(cb) {

  this.state = 'disarming';
  cb();

  var self = this;
  setTimeout(function(){
    self.state = 'disarmed';
    cb();
  }, TIMEOUT);

}