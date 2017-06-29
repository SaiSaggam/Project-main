var getGroup = require('./getOilResponse.js');
var getGroupMapping = require('../mapping/getEmployerGroupMapping.js');
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
    var startDate = req.data.startDate;
    var stopDate = req.data.stopDate;
    var benefitBundleOptionId = req.data.benefitBundleOptionId;
    req.data = undefined;
    getGroup.response(req, 'getEmployerGroup').then(function(groupResult){
      var diff = new Date().getTime() - startTime;
      logger.info('Time Taken for GetEmployerGroup Oil Call - ' + diff/1000 + ' seconds.');
      groupResult.startDate = startDate;
      groupResult.stopDate = stopDate;
      groupResult.benefitBundleOptionId = benefitBundleOptionId;
      var mappedGroup = getGroupMapping.responseMapping(groupResult);
        resolve(mappedGroup);

    }, function(err){
        var errorResult = error.errorMapping(err, 'GetEmployerGroupService');
        reject(errorResult);

    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'GetEmployerGroupService');
      reject(exResult);
    });
  });
}
