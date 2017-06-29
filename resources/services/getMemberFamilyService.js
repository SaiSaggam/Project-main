var getMemberFamily = require('./getOilResponse.js');
var familyMapping = require('../mapping/getMemberFamilyMapping.js');
var error = require('../mapping/errorMapping.js');

exports.ResponseforFrontEnd = function(req){
  return new Promise(function(resolve, reject){
    var startTime = new Date().getTime();
    logger.debug('>>> getMemberFamily OIL service call  >>>');
    getMemberFamily.response(req, 'getMemberFamily').then(function(familyResult){
      var diff = new Date().getTime() - startTime;
      logger.info('Time Taken for GetMemberFamily Oil Call - ' + diff/1000 + ' seconds.');
      var mappedFamily = familyMapping.responseMapping(familyResult);
      resolve(mappedFamily);
      logger.debug('<<< getMemberFamily OIL service call  <<<');
    }, function(err){
      var errorResult = error.errorMapping(err, 'GetMemberFamilyService');
      reject(errorResult);
      logger.error('<<< getMemberFamily OIL service call '+ JSON.stringify(err) +' <<<');
    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'GetMemberFamilyService');
      reject(exResult);
      logger.error('<<< getMemberFamily OIL service call '+ JSON.stringify(ex) +' <<<');
    });
  });
}
