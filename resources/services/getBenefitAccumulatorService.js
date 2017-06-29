var getAccumulator = require('./getOilResponse.js');
var accumulatorMapping = require('../mapping/getBenefitAccumulatorMapping.js');
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
    logger.debug('>>> getBenefitAccumulator OIL service call  >>>');
    getAccumulator.response(req, 'getBenefitAccumulator').then(function(accumulatorResult){
      var diff = new Date().getTime() - startTime;
      logger.info('Time Taken for GetBenefitAccumulator Oil Call - ' + diff/1000 + ' seconds.');
      var mappedAccumulator = accumulatorMapping.responseMapping(accumulatorResult);
        resolve(mappedAccumulator);
      logger.debug('<<< getBenefitAccumulator OIL service call  <<<');
    }, function(err){
        var errorResult = error.errorMapping(err, 'GetBenefitAccumulator');
      reject(errorResult);
      logger.error('<<< getBenefitAccumulator OIL service call '+ JSON.stringify(err) +' <<<');
    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'GetBenefitAccumulator');
      reject(exResult);
      logger.error('<<< getBenefitAccumulator OIL service call '+ JSON.stringify(ex) +' <<<');
    });
  });
}
