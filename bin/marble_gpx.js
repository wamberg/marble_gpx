#!/usr/bin/env node
var marbleGpx = require('../lib/marble_gpx');
var optimist = require('optimist')
var path = require('path');
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

// parse arguments for different strategies
optimist = optimist.check(function(argv) {
  switch (argv.strategy) {
    case LOCAL_LINEAR_LEAST_SQUARES:
    default:
      optimist = optimist
        .alias('l', 'locality')
        .describe('l', '+/- points around current point')
        .default('l', 3);
      strategy_function = strategy.local_linear_least_squares;
      break;
  }
});

var argv = optimist.argv;

// TODO: !file_exists
var file_exists = path.existsSync(argv.file)

new marbleGpx.marble(argv.file, strategy_function, argv).smoothGpx();
