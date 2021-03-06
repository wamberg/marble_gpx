exports.local_linear_least_squares = function(xmlDoc, context, cb) {
  // NOTE: <trkpt> should be the only element this deep. I wish there
  // was a better way to use xpath and libxmljs but I couldn't find it
  var trkpts = xmlDoc.find('/*/*/*/*'); 
  var locality = context.args.l; //locality

  for (var i = locality; i < (trkpts.length - locality); i++) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var x = 0;
    var y = 0;
    var count = 0;

    for (var localI = (i - locality); localI <= (i + locality); localI++) {
      x = parseFloat(trkpts[localI].attr('lon').value());
      y = parseFloat(trkpts[localI].attr('lat').value());
      sum_x += x;
      sum_y += y;
      sum_xx += x*x;
      sum_xy += x*y;
      count++;
    }

    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;


    // Take the average of our local longitudes for x
    x = sum_x / count;
    y = x * m + b;

    trkpts[i].attr('lon', x);
    trkpts[i].attr('lat', y);

  }
  cb(null, xmlDoc);

};
