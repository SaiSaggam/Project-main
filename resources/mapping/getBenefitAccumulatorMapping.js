exports.requestMapping = function(request){
  var getBenefitAccumulatorOilRequest = {
   "benefitAccumulatorRSRequest": {
	   "getBenefitsAccumulatorRequest":    {
	      "benefitBundleOptionId": "",
	      "enrolleeIdentifier": {
	        "type": "SRK",
	         "id": ""
	      },
	      "effectiveStartDate": "",
	      "effectiveEndDate": ""
	   }
	}
};

  logger.debug('>>> getBenefitAccumulator Request mapping from BEACH to OIL >>>')
  var base = getBenefitAccumulatorOilRequest.benefitAccumulatorRSRequest.getBenefitsAccumulatorRequest;
  base.benefitBundleOptionId = request.benefitBundleOptionId;
  base.enrolleeIdentifier.id = request.surrogateKey;
  base.effectiveStartDate = request.startDate;
  base.effectiveEndDate = request.stopDate;

  logger.debug('<<< getBenefitAccumulator Request mapping from BEACH to OIL <<<');
  return getBenefitAccumulatorOilRequest;

}

exports.responseMapping = function(getBenefitAccumulatorResponse){
  var accumulatorTemplate = {
    "INN": {
      "individualDeductibleMax": "",
      "individualDeductibleYTD": "",
      "individualDeductibleRem": "",
      "familyDeductibleMax": "",
      "familyDeductibleYTD": "",
      "familyDeductibleRem": "",
      "individualOOPMax": "",
      "individualOOPYTD": "",
      "individualOOPRem": "",
      "familyOOPMax": "",
      "familyOOPYTD": "",
      "familyOOPRem": ""
    },
    "OON": {
      "individualDeductibleMax": "",
      "individualDeductibleYTD": "",
      "individualDeductibleRem": "",
      "familyDeductibleMax": "",
      "familyDeductibleYTD": "",
      "familyDeductibleRem": "",
      "individualOOPMax": "",
      "individualOOPYTD": "",
      "individualOOPRem": "",
      "familyOOPMax": "",
      "familyOOPYTD": "",
      "familyOOPRem": ""
    }
  };
  logger.debug('>>> getBenefitAccumulator Response mapping from OIL to BEACH >>>')

  var base = getBenefitAccumulatorResponse.benefitAccumulatorRSResult.getBenefitsAccumulatorResponse.benefitsAccumulator.membership[0].benefitPlan[0]; //Hardcoded for Day-1 need to change this logic for future releases.
  var tierConversion = {"1": "INN", "2": "OON"};
  for(var i = 0; i < base.planTier.length; i++){
    var tierValue = tierConversion[base.planTier[i].tierTypeCode];
    accumulatorTemplate[tierValue].individualDeductibleMax = Number(base.planTier[i].primaryIndividualDeductibleMaximum);
    accumulatorTemplate[tierValue].individualDeductibleYTD = Number(base.planTier[i].primaryIndividualDeductibleYTD);
    accumulatorTemplate[tierValue].individualDeductibleRem = accumulatorTemplate[tierValue].individualDeductibleMax - accumulatorTemplate[tierValue].individualDeductibleYTD;
    accumulatorTemplate[tierValue].familyDeductibleMax = Number(base.planTier[i].primaryFamilyDeductibleMaximum);
    accumulatorTemplate[tierValue].familyDeductibleYTD = Number(base.planTier[i].primaryFamilyDeductibleYTD);
    accumulatorTemplate[tierValue].familyDeductibleRem = accumulatorTemplate[tierValue].familyDeductibleMax - accumulatorTemplate[tierValue].familyDeductibleYTD;
    accumulatorTemplate[tierValue].individualOOPMax = Number(base.planTier[i].primaryIndividualOOPMaximum);
    accumulatorTemplate[tierValue].individualOOPYTD = Number(base.planTier[i].primaryIndividualOOPYTD);
    accumulatorTemplate[tierValue].individualOOPRem = accumulatorTemplate[tierValue].individualOOPMax - accumulatorTemplate[tierValue].individualOOPYTD;
    accumulatorTemplate[tierValue].familyOOPMax = Number(base.planTier[i].primaryFamilyOOPMaximum);
    accumulatorTemplate[tierValue].familyOOPYTD = Number(base.planTier[i].primaryFamilyOOPYTD);
    accumulatorTemplate[tierValue].familyOOPRem = accumulatorTemplate[tierValue].familyOOPMax - accumulatorTemplate[tierValue].familyOOPYTD;
  }

  logger.debug('<<< getBenefitAccumulator Response mapping from OIL to BEACH <<<');
  return accumulatorTemplate;

}
