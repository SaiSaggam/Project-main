
/*
Desc: Maps the request and response between the UI and Oil to faciliate data flow smoothly between the two.
*/

exports.requestMapping = function(request){
  /*
  Desc: Maps the request parameters from the UI and creates a OIL friendly request format
  Params: request : The request JSON from the front end
          oilIndividualRequest: The callback function it needs to trigger when the mapping is complete.
  Status: Stable
  Notes: DO NOT MAKE ANY CHANGES
  */
    var findIndividualOilRequest = {
      "findIndividualsRequest": {
    		"searchId": "",
    		"searchTypeCode": "",
    		"firstName": "",
    		"lastName": "",
    		"birthDate": "",
    		"stateCode": "",
    		"postalCode": "",
    		"telephoneNumber": "",
    		"systemSpecificIndicator": ""
    	}
    }
  logger.debug('>>> findIndividual Request mapping from BEACH to OIL  >>>');
    var base = findIndividualOilRequest.findIndividualsRequest;
    //memberId
    base.searchId = request.memberId;
    base.firstName = request.firstName;
    //lastName
    base.lastName = request.lastName;
    //state
    base.stateCode = request.state;
    //dob
    base.birthDate = request.dob;
    //zipCode
    base.postalCode = request.zipCode;
    logger.debug('<<< findIndividual Request mapping from BEACH to OIL  <<<');
    return findIndividualOilRequest;

}

exports.responseMapping = function(findIndividualResponse){
  /*
  Desc: Maps the parameters from the Oil response to flatened out UI friendly json.
  Params: findIndividualResponse : The Oil response.
          mapper: The callback function it needs to trigger when the mapping is complete.
  Status: Stable
  Notes: DO NOT MAKE ANY CHANGES
  */

  /*
  Checks the ID's of the individual for MemberId(pulse - MBR) or Serial ID Card(Cirrus - MCH)
  and determines whether the individual should be displayed on the UI.
  */
  function checkIndividualEligibility(identifier, size){
    var surrogateKey = null;
    var memberId = [];
    var subscriberId = null;
    for(var j = 0; j < identifier.length; j++){
      if(identifier[j].type === 'SRK'){
        surrogateKey = identifier[j].id;
      }

      else if(identifier[j].type === 'MCH' || identifier[j].type === 'MBR'){
        if(findIndividualResponse.searchId){
          if(findIndividualResponse.searchId == identifier[j].id || findIndividualResponse.searchId == identifier[j].id.substring(0,9)){
            memberId.push(identifier[j]);
          }
        }
        else {
          memberId.push(identifier[j]);
        }
      }
    }
    return {
      srk: surrogateKey,
      memberId: memberId
    }
  }

  var individualTemplate = {
     "individual": [],
     "hasMoreResults": false
  };
  logger.debug('>>> findIndividual Response mapping from OIL to BEACH  >>>');
  var basename = findIndividualResponse.findIndividualsResponse;
  if(Number(basename.pagination.totalCount) > Number(basename.pagination.recordCount)){
    individualTemplate.hasMoreResults = true;
  }
  for (var i = 0; i < basename.individuals.length; i++) {
    var memberDemographic = {
      "individualId" : "",
      "surrogateKey" : "",
      "memberId" : "",
      "firstName" : "",
      "middleName" : "",
      "lastName" : "",
      "dob" : "",
      "gender" : "",
      "address" : ""
    };
    var eligibility = checkIndividualEligibility(basename.individuals[i].identifiers, basename.individuals.length);
    if(eligibility.memberId.length != 0){
      memberDemographic.individualId = basename.individuals[i].individualIdentifier;
      memberDemographic.surrogateKey = eligibility.srk;
      memberDemographic.memberId = eligibility.memberId[0];
      if(basename.individuals[i].hasOwnProperty("name")){
        memberDemographic.firstName = basename.individuals[i].name.firstName;
        memberDemographic.middleName = basename.individuals[i].name.middleName;
        memberDemographic.lastName = basename.individuals[i].name.lastName;
      }
      memberDemographic.dob = basename.individuals[i].birthDate;
      memberDemographic.gender = basename.individuals[i].genderCode;

      if(basename.individuals[i].hasOwnProperty("address")){
        var addressBase = basename.individuals[i].address;
        var space = '';
        if(addressBase.addressLine2 != ''){
          space = ' ';
        }
        var address = addressBase.addressLine1 + space + addressBase.addressLine2 + ", " + addressBase.city + ", " + addressBase.stateCode + " " + addressBase.postalCode + ", " + addressBase.countryCode;
        memberDemographic.address = address;
      }
      individualTemplate.individual.push(memberDemographic);
    }
  }
  logger.debug('<<< findIndividual Response mapping OIL to BEACH  <<<');
  return individualTemplate;

}
