exports.requestMapping = function(request){

    /*
    Desc: Maps the request parameters from the UI and creates a OIL friendly request format
    Params: request : The request JSON from the front end
    Status: Stable
    Notes: DO NOT MAKE ANY CHANGES
    */

  var getMembershipOilRequest = {
  	"getMembershipRequest" : {
  		"identifier" : "",
  		"identifierType" : "SRK",
  		"groupNumber" : ""
  	}
  };
    logger.debug('>>> getMembership Request mapping from BEACH to OIL >>>')
  var base = getMembershipOilRequest.getMembershipRequest;

  base.identifier = request.surrogateKey;
  base.groupNumber = request.groupNo;
    logger.debug('<<< getMembership Request mapping from BEACH to OIL <<<');
  return getMembershipOilRequest;
}

exports.responseMapping = function(getMembershipResponse){

    /*
    Desc: Maps the parameters from the Oil response to flatened out UI friendly json.
    Params: getMembershipResponse : The Oil response.
    Status: Stable
    Notes: DO NOT MAKE ANY CHANGES
    */
    var getMembershipTemplate = {
      "benefitBundleOptionId": "",
      "benefitBundleOptionDesc": "",
      "startDate": "",
      "stopDate": ""
    };
    logger.debug('>>> getMembership Response mapping from OIL to BEACH >>>')
    var base =  getMembershipResponse.getMembershipResponse.membership.coverages[0].bundleOptions[0].benefits[0];
    getMembershipTemplate.benefitBundleOptionId = base.benefitBundleOptionId;
    getMembershipTemplate.benefitBundleOptionDesc = base.benefitBundleOptionDescription;
    getMembershipTemplate.startDate = base.benefitEffectiveDate;
    getMembershipTemplate.stopDate = base.benefitExpirationDate;
    logger.debug('<<< getMembership Response mapping from OIL to BEACH <<<');
    return getMembershipTemplate;

}
