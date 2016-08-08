'use strict';

var pipeSensor = require('./pipe-sensor');

module.exports = function(device) {

  // device = device || process.stdin;

  var type = device.constructor.name;

  console.log(type);

  return pipeSensor();
};