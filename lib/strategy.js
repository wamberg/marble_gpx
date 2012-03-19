exports.local_linear_least_squares = function(xmlDoc, cb) {
  // cb(err, smoothXmlDoc)
  
  // NOTE: <trkpt> should be the only element this deep. I wish there
  // was a better way to use xpath and libxmljs but I couldn't find it
  var trkpts = xmlDoc.find('/*/*/*/*'); 
};
