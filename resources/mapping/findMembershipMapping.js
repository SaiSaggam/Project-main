exports.requestMapping = function(request) {

  /*
  Desc: Maps the request parameters from the UI and creates a OIL friendly request format
  Params: request : The request JSON from the front end
          oilMemberRequest: The callback function it needs to trigger when the mapping is complete.
  Status: Stable
  Notes: DO NOT MAKE ANY CHANGES
  */

  var findMembershipOilRequest = {
    "findMembershipsRequest": {
      "identifier": "",
      "identifierType": "SRK",
      "effectiveStartDate": "",
      "effectiveEndDate": ""
    }
  };
  logger.debug('>>> findMembership Request mapping from BEACH to OIL  >>>');
  var base = findMembershipOilRequest.findMembershipsRequest;

  base.identifier = request.surrogateKey;
  base.effectiveStartDate = request.startDate;
  base.effectiveEndDate = request.stopDate;

  logger.debug('<<< findMembership Request mapping from BEACH to OIL  <<<');


  return findMembershipOilRequest;
}

exports.responseMapping = function(findMembershipResponse) {

  /*
  Desc: Maps the parameters from the Oil response to flatened out UI friendly json.
  Params: findMembershipResponse : The Oil response.
          mapper: The callback function it needs to trigger when the mapping is complete.
  Status: Stable
  Notes: DO NOT MAKE ANY CHANGES
  */

  var membershipTemplate = {
    "memberships": []
  };

  var membershipBasename = findMembershipResponse.findMembershipsResponse;
  logger.debug('>>> findMembership Response mapping from OIL to BEACH >>>');
  for (var i = 0; i < membershipBasename.memberships.length; i++) {
    for (var j = 0; j < membershipBasename.memberships[i].coverages.length; j++) {
      var memberInfo = {
        "surrogateKey": "",
        "systemCode": "",
        "coverageType": "",
        "plan": "",
        "planNo": "",
        "relationship": "",
        "group": "",
        "groupNo": "",
        "startDate": "",
        "stopDate": ""
      }
      memberInfo.systemCode = membershipBasename.memberships[i].sourceSysCode;
      memberInfo.coverageType = membershipBasename.memberships[i].coverages[j].coverageTypeDescription;
      if (membershipBasename.memberships[i].coverages[j].hasOwnProperty("benefit")) {
        memberInfo.plan = membershipBasename.memberships[i].coverages[j].benefit.benefitPlanName;
        memberInfo.planNo = membershipBasename.memberships[i].coverages[j].benefit.benefitPlanId;
      }
      // memberInfo.relationship = membershipBasename.memberships[i].coverages[j].relationshipDescription;
      var relationshipTranslator = require('./relationshipCodeMapping.js');
      var relationshipCode = membershipBasename.memberships[i].coverages[j].relationshipCode;
      memberInfo.relationship = relationshipTranslator.translate(relationshipCode);
      memberInfo.group = membershipBasename.memberships[i].coverages[j].groupName;
      memberInfo.groupNo = membershipBasename.memberships[i].coverages[j].groupNumber;
      memberInfo.startDate = membershipBasename.memberships[i].coverages[j].membershipEffectiveDate;
      memberInfo.stopDate = membershipBasename.memberships[i].coverages[j].membershipExpirationDate;
      for (var k = 0; k < membershipBasename.memberships[i].coverages[j].subscriberSystemSpecificIdentifiers.length; k++) {
        var systemIndentifierBase = membershipBasename.memberships[i].coverages[j].subscriberSystemSpecificIdentifiers[k];
        if (systemIndentifierBase.type === 'subscriberSurrogateKey') {
          memberInfo.surrogateKey = systemIndentifierBase.id;
          break;
        }
      }
      membershipTemplate.memberships.push(memberInfo);
    }
  }
  logger.debug('<<< findMembership Response mapping from OIL to BEACH  <<<');
  return membershipTemplate;
}
