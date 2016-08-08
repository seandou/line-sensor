var through = require('through');
var Decoder = require('string_decoder').StringDecoder;

var decoder = new Decoder();

var next = function(stream, buffer) {
  var pieces = ('' + buffer).split(/\r?\n/);
  pieces.pop();

  for (var i = 0; i < pieces.length; i++) {
    var piece = pieces[i];
    if (piece) {
      stream.queue(piece);
    }
  }
};

module.exports = through(function(data) {
  next(this, decoder.write(data));
}, function() {
  if(decoder.end) {
    next(this, decoder.end());
  }
  this.queue(null);
});  