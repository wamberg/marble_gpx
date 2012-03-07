#!/usr/bin/env node
var colors = require('../lib/colors');
var marbleGpx = require('../lib/marble_gpx');
var optimist = require('optimist')
var exists = require('path').exists;
var strategy = require('../lib/strategy');
var strategy_function = undefined;

// available strategies
var LOCAL_LINEAR_LEAST_SQUARES = 'local linear least squares'

// parse arguments
optimist = optimist.usage('Usage: $0');
optimist = optimist
  .demand('f')
  .alias('f', 'file')
  .describe('f', 'Load a file');
optimist = optimist
  .alias('s', 'strategy')
  .describe('s', 'Smoothing strategy')
  .default('s', LOCAL_LINEAR_LEAST_SQUARES);
optimist = optimist
  .alias('l', 'locality')
  .describe('l', '+/- points around current point')
  .default('l', 3);
var argv = optimist.argv;

// select strategy
switch (argv.strategy) {
  case LOCAL_LINEAR_LEAST_SQUARES:
  default:
    strategy_function = strategy.local_linear_least_squares;
    break;
};

exists(argv.file, function(isExistant) {
  if (isExistant) {
    new marbleGpx.marble(argv.file, strategy_function, argv).smoothGpx();
  } else {
    console.error(colors.red('ERROR:') + ' "%s" does not exist.', argv.file)
  }
});

