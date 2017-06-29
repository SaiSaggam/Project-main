var findMembership = require('./getOilResponse.js');
var findMemMapping = require('../mapping/findMembershipMapping.js');
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
    logger.debug('>>> findMembership OIL service call  >>>');
    findMembership.response(req, 'findMembership').then(function(membershipResult){
      var diff = new Date().getTime() - start;
      logger.info('Time Taken for FindMembership Oil Call - ' + diff/1000 + ' seconds.');
      var mappedMembership = findMemMapping.responseMapping(membershipResult);
      resolve(mappedMembership);
      logger.debug('<<< findMembership OIL service call  <<<');
    }, function(err){
        var errorResult = error.errorMapping(err, 'FindMembershipService');
      reject(errorResult);
      logger.error('<<< findMembership OIL service call '+ JSON.stringify(err) +' <<<');
    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'FindMembershipService');
      reject(exResult);
      logger.error('<<< findMembership OIL service call '+ ex +' <<<');
    });
  });
}
