/*
Desc: Error Mapping, which maps the error which it gets from Oil to the flatten out UI friendly error JSON format.
Params: errorResponse: The Oil formatted error,
        type: String format, which service is calling the errorMapping function.
        mapper: the callback function it will execute once the error mapping is completed.
Status: Working stable for findIndividual Service as of now, FindMembership is still underprocess.
Notes: DO NOT MAKE ANY CHANGES; Need to accomodate with getSubscriptionBenefit.
*/
exports.errorMapping = function(errorResponse, type){

  var errorTemplate = {
    "errors": {
      "code": "",
      "name": "",
      "severity": "",
      "origin": "",
      "description": "",
      "service": ""
    }
  };
  logger.debug('>>> error mapping for Response mapping OIL to BEACH >>> ');
  if(errorResponse.hasOwnProperty("ErrorID")){
    errorTemplate.errors.code = 500;
    errorTemplate.errors.name = errorResponse.ErrorID;
    // errorTemplate.errors.severity = errorResponse.severity;
    // errorTemplate.errors.origin = errorResponse.origin;
    errorTemplate.errors.description = errorResponse.ErrorMessage;
    errorTemplate.errors.Advice = errorResponse.Advice;
    errorTemplate.errors.service = type;
  }
  else{
    for(var i in errorResponse){
      if(errorResponse.hasOwnProperty(i)){
        if(errorResponse[i].hasOwnProperty("errors")){
          var base = errorResponse[i].errors[0];
        }
        else if(errorResponse[i].hasOwnProperty("messages")){
          var base = errorResponse[i].messages[0];
        }
        errorTemplate.errors.code = base.code;
        errorTemplate.errors.name = base.name;
        errorTemplate.errors.severity = base.severity;
        errorTemplate.errors.origin = base.origin;
        errorTemplate.errors.description = base.description;
        errorTemplate.errors.service = type;
        return errorTemplate;
      }
    }
    errorTemplate.errors.name = errorResponse.toString();
    errorTemplate.errors.code = 500;
    errorTemplate.errors.service = type;

  }
  logger.debug('<<< error mapping for Response mapping OIL to BEACH <<< ');
  return errorTemplate;
}

exports.exceptionMapping = function(ex, type){
  var errorTemplate = {
    "errors": {
      "code": "",
      "name": "",
      "service": ""
    }
  };
  errorTemplate.errors.name = ex.toString();
  errorTemplate.errors.code = 500;
  errorTemplate.errors.service = type;

  return errorTemplate;
}
