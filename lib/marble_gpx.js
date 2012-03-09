var async = require('async');
var colors = require('./colors');
var exists = require('path').exists;
var fs = require('fs');
var util = require('util');
var xml = require('node-xml');

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
        cb(isExistent ? null : new Error(colors.red('ERROR:') + ' "%s" does not exist.', that.inputPath));
      });
    },
    function (cb) {
      // parse xml file
      var parser = new xml.SaxParser(function (sax) {
        sax.onStartDocument(function() {

        });
        sax.onEndDocument(function() {

        });
        sax.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
            util.log("=> Started: " + elem + " uri="+uri +" (Attributes: " + JSON.stringify(attrs) + " )");
        });
        sax.onEndElementNS(function(elem, prefix, uri) {
            util.log("<= End: " + elem + " uri="+uri + "\n");
        });
        sax.onCharacters(function(chars) {
            //util.log('<CHARS>'+chars+"</CHARS>");
        });
        sax.onCdata(function(cdata) {
            util.log('<CDATA>'+cdata+"</CDATA>");
        });
        sax.onComment(function(msg) {
            util.log('<COMMENT>'+msg+"</COMMENT>");
        });
        sax.onWarning(function(msg) {
            util.log('<WARNING>'+msg+"</WARNING>");
        });
        sax.onError(function(msg) {
            util.log('<ERROR>'+JSON.stringify(msg)+"</ERROR>");
        });
      });
      parser.parseFile(that.inputPath);
    },
    function (cb) {
      // run strategy

    },
    function (cb) {
      // write modified data to file
    }
  ], function (err) {
    if (err) throw err;
  });
};
