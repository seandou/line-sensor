var events = require('events');
var splitter = require('./splitter');

module.exports = function() {
  var emitter = new events.EventEmitter();

  var onData = function(data) {
    if (data)
      emitter.emit('line', data);
  };

  var onError = function(err) {
    emitter.emit('error', err);
  };

  process.stdin.pipe(splitter)
    .on('data', onData)
    .on('error', onError);

  process.on('uncaughtException', function() {
    process.exit();
  });  

  return emitter;
};
