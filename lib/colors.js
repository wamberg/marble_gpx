var RED, GREEN, YELLOW, RESET;
RED = '31';
GREEN = '32';
YELLOW = '33';
RESET = '0';

function colorize (msg, color) {
  return msg ? "\u001b["+color+"m"+msg+"\u001b[0m" : "";
}

exports.red = function(msg) {
  return colorize(msg, RED);
}

exports.green = function(msg) {
  return colorize(msg, GREEN);
}

exports.yellow = function(msg) {
  return colorize(msg, YELLOW);
}
