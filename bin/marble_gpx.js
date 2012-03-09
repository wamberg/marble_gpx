#!/usr/bin/env node
var marbleGpx = require('../lib/marble_gpx');
var optimist = require('optimist')
var strategy = require('../lib/strategy');
var strategy_function = undefined;

// available strategies
var LOCAL_LINEAR_LEAST_SQUARES = 'local linear least squares'

// parse arguments
optimist = optimist.usage('Usage: $0');
optimist = optimist
  .demand('f')
  .alias('f', 'file')
  .describe('f', 'Input GPX path');
optimist = optimist
  .demand('o')
  .alias('o', 'output')
  .describe('o', 'Output GPX path');
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

new marbleGpx.marble(argv.file, argv.output, strategy_function, argv).smoothGpx();
