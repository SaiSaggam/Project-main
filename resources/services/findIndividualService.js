var findIndividual = require('./getOilResponse.js');
var individualMapping = require('../mapping/findIndividualMapping.js');
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
    logger.debug('>>> findIndividual OIL service call  >>>');
    var startTime = new Date().getTime();
    var searchId = req.findIndividualsRequest.searchId;
    findIndividual.response(req, 'findIndividual').then(function(individualResult){
      var diff = new Date().getTime() - startTime;
      logger.info('--- Time Taken for FindIndividual Oil Call - ' + diff/1000 + ' seconds.---');
      individualResult.searchId = searchId;
      var mappedIndividual = individualMapping.responseMapping(individualResult);
        resolve(mappedIndividual);
      logger.debug('<<< findIndividual OIL service call  <<<');

    }, function(err){
        var errorResult = error.errorMapping(err, 'FindIndividualService');
      reject(errorResult);
      logger.error('<<< findIndividual OIL service call '+ JSON.stringify(err) +' <<<');
    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'FindIndividualService');
      reject(exResult);
      logger.error('<<< findIndividual OIL service call '+ ex +' <<<');
    });
  });
}
