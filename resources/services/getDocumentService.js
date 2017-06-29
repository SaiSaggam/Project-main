var getDocument = require('./getOilResponse.js');
var error = require('../mapping/errorMapping.js');
var path = require('path');
var mime = require('mime');
  /*
  Desc: Calls the Oil service with the formatted Oil request and returns the response in a flatened out UI friendly format.
  Params: req : The Oil formatted request JSON.
          res: The callback function it needs to trigger when the mapping is complete.
  Status: Stable
  Notes: DO NOT MAKE ANY CHANGES
  */

exports.ResponseforFrontEnd = function(req){
  return new Promise(function(resolve, reject){
    var startTime = new Date().getTime();
    // getDocument.response(req, 'getDocument').then(function(documentResult){
    var documentResult = require('../offlineJsonFiles/getDocument.json');
      var diff = new Date().getTime() - startTime;
      logger.info('Time Taken for getDocument Oil Call - ' + diff/1000 + ' seconds.');
      var filename = documentResult.MultipartBody.allAttachments[0].object.getDocumentResponse.filename;
      var base64Encoded = documentResult.MultipartBody.allAttachments[1].object;
      var doc = {};
      doc.bytes = new Buffer(base64Encoded, 'base64');
      doc.name = path.basename(filename);
      doc.mimetype = mime.lookup(filename);
      resolve(doc);

    // }, function(err){
    //     var errorResult = error.errorMapping(err, 'getDocumentService');
    //     logger.error('error ' + JSON.stringify(errorResult));
    //   reject(errorResult);
    // }).catch(function(ex){
    //   var exResult = error.errorMapping(ex, 'getDocumentService');
    //   logger.error('ex ' + JSON.stringify(exResult));
    //   reject(exResult);
    // });
  });
}
