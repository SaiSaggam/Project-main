var findGroup = require('./getOilResponse.js');
var groupMapping = require('../mapping/findEmployerGroupMapping.js');
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
    logger.debug('>>> findEmployerGroup OIL service call  >>>');
    findGroup.response(req, 'findEmployerGroup').then(function(groupResult){
      var diff = new Date().getTime() - startTime;
      logger.info('Time Taken for FindEmployerGroup Oil Call - ' + diff/1000 + ' seconds.');
      var mappedGroup = groupMapping.responseMapping(groupResult);
        resolve(mappedGroup);
      logger.debug('<<< findEmployerGroup OIL service call  <<<');
    }, function(err){
        var errorResult = error.errorMapping(err, 'FindEmployerGroupService');
      reject(errorResult);
      logger.error('<<< findEmployerGroup OIL service call '+ JSON.stringify(err) +' <<<');

    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'FindEmployerGroupService');
      reject(exResult);
      logger.error('<<< findEmployerGroup OIL service call '+ ex +' <<<');
    });
  });
}
