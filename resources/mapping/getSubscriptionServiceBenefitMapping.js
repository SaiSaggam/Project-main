exports.requestMapping = function(request){
  var getSubscriptionServiceBenefitOilRequest = {
    "getSubscriptionServiceBenefit": {
      "getSubscriptionServiceBenefitRequest": {
		      "benefitBundleOptionId": "",
	        "effectiveStartDate": "",
          "effectiveEndDate": ""
	    }
    }
  };
  logger.debug('>>> getSubscriptionServiceBenefit Request mapping from BEACH to OIL >>>')
  var base = getSubscriptionServiceBenefitOilRequest.getSubscriptionServiceBenefit.getSubscriptionServiceBenefitRequest;
  base.benefitBundleOptionId = request.benefitBundleOptionId;
  base.effectiveStartDate = request.startDate;
  base.effectiveEndDate = request.endDate;
  logger.debug('<<< getSubscriptionServiceBenefit Request mapping from BEACH to OIL <<<');
  return getSubscriptionServiceBenefitOilRequest;

}

exports.responseMapping = function(getSubscriptionServiceBenefitResponse){
  var serviceBenefitTemplate = {
    "groupNumber": "",
    "groupName": "",
    "planMetallicLevel": "",
    "benefitBundleOptionId": "",
    "basePlan": "",
    "riderPlan": []
    // ,
    // "coinsurance": ""
  };
  logger.debug('>>> getSubscriptionServiceBenefit Response mapping from OIL to BEACH >>>')
  var base = getSubscriptionServiceBenefitResponse.getSubscriptionServiceBenefit.getSubscriptionServiceBenefitResponse.serviceBenefit;
  if(base.hasOwnProperty("memberGroup")){
    serviceBenefitTemplate.groupNumber = base.memberGroup.groupNumber;
    serviceBenefitTemplate.groupName = base.memberGroup.groupName;
  }
  var base = base.memberGroupContractPlanOption;
  serviceBenefitTemplate.planMetallicLevel = base.planMetallicLevel;
  serviceBenefitTemplate.benefitBundleOptionId = base.benefitBundleOptionId;

  for(var i = 0; i < base.benefitPlan.length; i++){
    if(base.benefitPlan[i].riderOnlyFlag == 0){
      var basePlanInfo = {
        "INNPrimaryIndividualDeductibleMaximum": "",
        "INNPrimaryFamilyDeductibleMaximum": "",
        "OONPrimaryIndividualDeductibleMaximum": "",
        "OONPrimaryFamilyDeductibleMaximum": "",
        "INNPrimaryIndividualOOPMaximum": "",
        "INNPrimaryFamilyOOPMaximum": "",
        "OONPrimaryIndividualOOPMaximum": "",
        "OONPrimaryFamilyOOPMaximum": ""
      };
      for(var j = 0; j < base.benefitPlan[i].planTier.length; j++){
        var planTierBase = base.benefitPlan[i].planTier[j];
        var tierConversion = {"1": "INN", "2": "OON"};
        var tier = tierConversion[planTierBase.tierTypeCode];
        basePlanInfo[tier + 'PrimaryIndividualDeductibleMaximum'] = planTierBase.primaryIndividualDeductibleMaximum;
        basePlanInfo[tier + 'PrimaryFamilyDeductibleMaximum'] = planTierBase.primaryFamilyDeductibleMaximum;
        basePlanInfo[tier + 'PrimaryIndividualOOPMaximum'] = planTierBase.primaryIndividualOOPMaximum;
        basePlanInfo[tier + 'PrimaryFamilyOOPMaximum'] = planTierBase.primaryFamilyOOPMaximum;
      }
      serviceBenefitTemplate.basePlan = basePlanInfo;
    }
    else{
      var riderPlanInfo = {
        "benefitPlanId": "",
        "coverageType": "",
        "gatedProductIndicator": "",
        "legalName": "",
        "networkScheduleId": "",
        "productName": "",
        "productId": "",
        "planTypeCode": "",
        "customerFacingPlanName": ""
      };
      riderPlanInfo.benefitPlanId = base.benefitPlan[i].benefitPlanId;
      riderPlanInfo.coverageType = base.benefitPlan[i].coverageType;
      riderPlanInfo.gatedProductIndicator = base.benefitPlan[i].gatedProductIndicator;
      riderPlanInfo.legalName = base.benefitPlan[i].legalEntityName;
      riderPlanInfo.productName = base.benefitPlan[i].productName;
      riderPlanInfo.productId = base.benefitPlan[i].productId;
      riderPlanInfo.planTypeCode = base.benefitPlan[i].planTypeCode;
      riderPlanInfo.customerFacingPlanName = base.benefitPlan[i].customerFacingPlanName;
      // riderPlanInfo.networkScheduleId = base.benefitPlan[i].;

      serviceBenefitTemplate.riderPlan.push(riderPlanInfo);
    }
    // var st = new Date().getTime();
    // console.log(st/1000);
    // console.log('Finding benefitCode AMBULANCE_GROUND');
    // console.log('Benefit Code Length: ' + base.benefitPlan[i].benefitCode.length);
    // loop1: for(var k = 0; k < base.benefitPlan[i].benefitCode.length; k++){
    //   if(base.benefitPlan[i].benefitCode[k].benefitCode === 'AMBULANCE_GROUND'){
    //     console.log('found benefitCode AMBULANCE_GROUND');
    //     for(var l = 0; l < base.benefitPlan[i].benefitCode[k].benefitCostShare.length; l++){
    //       var costShareBase = base.benefitPlan[i].benefitCode[k].benefitCostShare[l];
    //       if(costShareBase.costShareType === 'Member Coinsurance' && costShareBase.coverageLevel === 'Family'){
    //         serviceBenefitTemplate.coinsurance = costShareBase.benefitMaximumUnit;
    //         var s = new Date().getTime();
    //         console.log(s/1000);
    //         var diff = ((s - st)/1000);
    //         console.log('Time taken to retrieve value: ' + diff);
    //         break loop1;
    //       }
    //     }
    //   }
    // }

  }
  logger.debug('<<< getSubscriptionServiceBenefit Response mapping from OIL to BEACH <<<');
  return serviceBenefitTemplate;

}
