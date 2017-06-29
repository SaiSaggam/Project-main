exports.requestMapping = function(request){
  var getMemberFamilyOilRequest = {
    "getMemberFamilyRequest": {
	     "identifier": "",
       "identifierType": "SRK",
       "groupNumber": "",
       "membershipEffectiveDate": ""
     }
   };
    logger.debug('>>> getMemberFamily Request mapping from BEACH to OIL  >>>');
   var base = getMemberFamilyOilRequest.getMemberFamilyRequest;
   base.identifier = request.surrogateKey;
   base.groupNumber = request.groupNo;
   base.membershipEffectiveDate = request.effectiveDate;
    logger.debug('<<< getMemberFamily Request mapping from BEACH to OIL  <<<');
  return getMemberFamilyOilRequest;
}


exports.responseMapping = function(getMemberFamilyResponse){
  var familyTemplate = {
    "memberFamily": []
  };
    logger.debug('>>> getMemberFamily Response mapping from OIL to BEACH >>>');
  var base = getMemberFamilyResponse.getMemberFamilyResponse.individual;

  for(var i = 0; i < base.length; i++){
    var familyMember = {
      "surrogateKey": "",
      "memberId": "",
      "firstName": "",
      "lastName": "",
      "middleName": "",
      "dob": "",
      "gender": "",
      "relationship": "",
      "address": ""
    };
    if(base[i].hasOwnProperty("name")){
      familyMember.firstName = base[i].name.firstName;
      familyMember.lastName = base[i].name.lastName;
      familyMember.middleName = base[i].name.middleName;
    }
    familyMember.dob = base[i].birthDate;
    familyMember.gender = base[i].genderCode;
    familyMember.relationship = base[i].relationshipDescription;

    if(base[i].hasOwnProperty("address")){
      var addressHeirarchy = ["HOM", "BILL", "MAIL", "WRK"];

      loop1:
       for(var k = 0; k < addressHeirarchy.length; k++){
         for(var l = 0; l < base[i].address.length; l++){
          var addressBase = base[i].address[l];

          if(addressHeirarchy[k] === addressBase.typeCode){
            var space = '';
            if(addressBase.addressLine2 != ''){
              space = ' ';
            }
            var address = addressBase.addressLine1 + space + addressBase.addressLine2 + ", " + addressBase.city + ", " + addressBase.stateCode + " " + addressBase.postalCode + ", " + addressBase.countryCode;
            familyMember.address = address;
            break loop1;
          }
        }
      }
    }
      if(base[i].hasOwnProperty("identifiers")) {
          for (var j = 0; j < base[i].identifiers.length; j++) {

              if (base[i].identifiers[j].type === 'enrolleeSurrogateKey') {
                  familyMember.surrogateKey = base[i].identifiers[j].id;
              }
              else if (base[i].identifiers[j].type === 'memberIDCardSerialNumber') {
                  familyMember.memberId = base[i].identifiers[j];
              }
          }
      }
    familyTemplate.memberFamily.push(familyMember);
  }
    logger.debug('<<< getMemberFamily Response mapping from OIL to BEACH <<<');
  return familyTemplate;
}
