exports.requestMapping = function(request){

    /*
    Desc: Maps the request parameters from the UI and creates a OIL friendly request format
    Params: request : The request JSON from the front end
    Status: Stable
    Notes: DO NOT MAKE ANY CHANGES
    */

  var findEmployerGroupOilRequest = {
	   "findEmployerGroupsRequest": {
       "groupNumber": "",
       "groupName": "",
       "state": ""
     }
  };
  logger.debug('>>> findEmployerGroup Request mapping from BEACH to OIL  >>>');
  var base = findEmployerGroupOilRequest.findEmployerGroupsRequest;

  base.groupNumber = request.groupNo;
  base.groupName = request.groupName;
  base.state = request.state;
  logger.debug('<<< findEmployerGroup Request mapping from BEACH to OIL  <<<');
  return findEmployerGroupOilRequest;
}

exports.responseMapping = function(findGroupResponse){

    /*
    Desc: Maps the parameters from the Oil response to flatened out UI friendly json.
    Params: findMembershipResponse : The Oil response.
            mapper: The callback function it needs to trigger when the mapping is complete.
    Status: Stable
    Notes: DO NOT MAKE ANY CHANGES
    */

  var findGroupTemplate = {
    "groups": []
  };
  logger.debug('>>> findEmployerGroup Response mapping from OIL to BEACH  >>>');
  var groupBase = findGroupResponse.findEmployerGroupsResponse;
  for(var i = 0; i < groupBase.employerGroup.length; i++){
    var groupInfo = {
      "groupName": "",
      "groupNo": "",
      "tel": "",
      "address": "",
      "state": "",
      "sizeDef": "",
      "effectiveStartDate": ""
    }

    groupInfo.groupName = groupBase.employerGroup[i].groupName;
    groupInfo.groupNo = groupBase.employerGroup[i].groupNumber;
    if(groupBase.employerGroup[i].hasOwnProperty("phone")){
      for(var j = 0; j < groupBase.employerGroup[i].phone.length; j++){
        var phoneBase = groupBase.employerGroup[i].phone[j];
        if(phoneBase.primaryIndicator == 0){
          groupInfo.tel = phoneBase.phoneNumber;
          break;
        }
      }
    }
    if(groupBase.employerGroup[i].hasOwnProperty("address")){
      var addressBase = groupBase.employerGroup[i].address;
      var space = '';
      if(addressBase.addressLine2){
        space = ' ';
      }
      groupInfo.address = addressBase.addressLine1 + space + addressBase.addressLine2 + ', ' + addressBase.city + ', ' + addressBase.stateCode + ' ' + addressBase.postalCode;
      groupInfo.state = addressBase.stateCode;
    }

    if(groupBase.employerGroup[i].hasOwnProperty("sizeDefinition")){
      groupInfo.sizeDef = groupBase.employerGroup[i].sizeDefinition.desc;

    }

    if(groupBase.employerGroup[i].hasOwnProperty("groupContract")){
      groupInfo.effectiveStartDate = groupBase.employerGroup[i].groupContract.startDate;
    }



    findGroupTemplate.groups.push(groupInfo);
  }
  logger.debug('<<< findEmployerGroup Response mapping OIL to BEACH  <<<');
  return findGroupTemplate;
}
