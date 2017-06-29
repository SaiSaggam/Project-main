var getSubscription = require('./getOilResponse.js');
var serviceBenefitMapping = require('../mapping/getSubscriptionServiceBenefitMapping.js');
var error = require('../mapping/errorMapping.js');
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
    logger.debug('>>> getSubscriptionServiceBenefit OIL service call  >>>');
    getSubscription.response(req, 'getSubscriptionServiceBenefit').then(function(serviceBenefitResult){
      var diff = new Date().getTime() - startTime;
      logger.info('Time Taken for GetSubscriptionServiceBenefit Oil Call - ' + diff/1000 + ' seconds.');
      var mappedServiceBenefit = serviceBenefitMapping.responseMapping(serviceBenefitResult);
        resolve(mappedServiceBenefit);
      logger.debug('<<< getSubscriptionServiceBenefit OIL service call  <<<');
    }, function(err){
        var errorResult = error.errorMapping(err, 'GetSubscriptionServiceBenefitService');
      reject(errorResult);
      logger.error('<<< getSubscriptionServiceBenefit OIL service call '+ JSON.stringify(err) +' <<<');
    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'GetSubscriptionServiceBenefitService');
      reject(exResult);
      logger.error('<<< getSubscriptionServiceBenefit OIL service call '+ JSON.stringify(ex) +' <<<');
    });
  });
}
