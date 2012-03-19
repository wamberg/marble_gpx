var async = require('async');
var colors = require('./colors');
var exists = require('path').exists;
var fs = require('fs');
var util = require('util');
var xml = require('libxmljs');

exports.marble = function(inputPath, outputPath, strategy, args) {
  this.inputPath = inputPath;
  this.outputPath = outputPath;
  this.strategy = strategy;
  this.args = args;
};

exports.marble.prototype.smoothGpx = function () {
  var that = this;
  async.waterfall([
    function (cb) {
      // open file
      exists(that.inputPath, function(isExistent) {
        cb(isExistent ? null : new Error(colors.red(that.inputPath) + ' does not exist.'));
      });
    },
    function (cb) {
      fs.readFile(that.inputPath, cb);
    },
    function (data, cb) {
      // parse xml data
      xmlDoc = xml.parseXmlString(data);
      cb(xmlDoc);
    },
    function (xmlDoc, cb) {
      // run strategy
      that.strategy(xmlDoc, cb);
    },
    function (smoothXmlDoc, cb) {
      // write modified data to file
      fs.writeFile(that.outputPath, smoothXmlDoc.toString(), cb)
    }
  ], function (err) {
    if (err) throw err;
  });
};
