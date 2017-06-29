var getLanguage = require('./getOilResponse.js');
var languageMapping = require('../mapping/getBenefitLanguageMapping.js');
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
    logger.debug('>>> getBenefitLanguage OIL service call  >>>');
    getLanguage.response(req, 'getBenefitLanguage').then(function(languageResult){
      var diff = new Date().getTime() - startTime;
      logger.info('Time Taken for GetBenefitLanguage Oil Call - ' + diff/1000 + ' seconds.');
      var mappedBenefitLanguage = languageMapping.responseMapping(languageResult);
        resolve(mappedBenefitLanguage);
      logger.debug('<<< getBenefitLanguage OIL service call  <<<');
    }, function(err){
        var errorResult = error.errorMapping(err, 'GetBenefitLanguageService');
      reject(errorResult);
      logger.error('<<< getBenefitLanguage OIL service call '+ JSON.stringify(err) +' <<<');
    }).catch(function(ex){
      var exResult = error.exceptionMapping(ex, 'GetBenefitLanguageService');
      reject(exResult);
      logger.error('<<< getBenefitLanguage OIL service call '+ JSON.stringify(ex) +' <<<');
    });
  });
}
