var getMembership = require('./getOilResponse.js');
var getMemMapping = require('../mapping/getMembershipMapping.js');
var error = require('../mapping/errorMapping.js');
  /*
  Desc: Calls the findMembership service, then maps the elements required for calling getSubscriptionBenefit service and then maps the two services'
        response into a single UI friendly JSON format.
  Params: req : The Oil formatted request JSON.
          res: The callback function it needs to trigger when the mapping is complete.
  Status: Stable
  Notes: DO NOT MAKE ANY CHANGES
  */

exports.ResponseforFrontEnd = function(req){
  return new Promise(function(resolve, reject){
    var start = new Date().getTime();
    logger.debug('>>> getMembership OIL service call  >>>');
    getMembership.response(req, 'getMembership').then(function(membershipResult){
      var diff = new Date().getTime() - start;
      logger.info('Time Taken for GetMembership Oil Call - ' + diff/1000 + ' seconds.');
      var mappedMembership = getMemMapping.responseMapping(membershipResult);
      resolve(mappedMembership);
      logger.debug('<<< getMembership OIL service call  <<<');
    }, function(err){
        var errorResult = error.errorMapping(err, 'GetMembershipService');
      logger.error('<<< getMembership OIL service call '+ JSON.stringify(err) +' <<<');
      reject(errorResult);
    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'GetMembershipService');
      reject(exResult);
      logger.error('<<< getMembership OIL service call '+ JSON.stringify(ex) +' <<<');
    });
  });
}
