exports.requestMapping = function(request){
  console.log(request);
  var getEmployerGroupOilRequest = {
  	"getEmployerGroup": {
  		"getEmployerGroupRequest": {
  			"groupNumber": ""
  		}
  	},
    "data": {
      "startDate": "",
      "stopDate": "",
      "benefitBundleOptionId": ""
    }
  };

  getEmployerGroupOilRequest.getEmployerGroup.getEmployerGroupRequest.groupNumber = request.groupNo;
  getEmployerGroupOilRequest.data.startDate = request.startDate;
  getEmployerGroupOilRequest.data.stopDate = request.stopDate;
  getEmployerGroupOilRequest.data.benefitBundleOptionId = request.benefitBundleOptionId;
  return getEmployerGroupOilRequest;
}

exports.responseMapping = function(getGroupResponse){
  var customStartDate = new Date(getGroupResponse.startDate);
  var customStopDate = new Date(getGroupResponse.stopDate);
  var getGroupTemplate = {
    "employeeCount": "",
    "benefitBundles": []
  }
  var base = getGroupResponse.getEmployerGroup.getEmployerGroupResponse.employerGroup;


  var count = 0;
  for(var z = 0; z < base.employeeCounts.length; z++){
    count += Number(base.employeeCounts[z].employeeCount);
  }
  getGroupTemplate.employeeCount = count;

  for(var i = 0; i < base.customerAccount.length; i++){
    for(var j = 0; j < base.customerAccount[i].customerPurchase.length; j++){
      var benefitBundleTemplate = {
        "basePlanDesc": "",
        "basePlanNo" : "",
        "metallicLevel": "",
        "networkScheduleId": "",
        "coverageStartDate": "",
        "coverageExpiryDate": "",
        "benefitBundleOptionId": ""
      };
      var bundleBase = base.customerAccount[i].customerPurchase[j];
      var coverageStartDate = new Date(bundleBase.coverageStartDate);
      var coverageStopDate = new Date(bundleBase.coverageExpirationDate);
      if((coverageStartDate.getTime() < customStopDate.getTime()) && (coverageStopDate.getTime() > customStartDate.getTime())){

        benefitBundleTemplate.basePlanDesc = bundleBase.benefitPlanDescription;
        benefitBundleTemplate.basePlanNo = bundleBase.benefitBasePlan;
        benefitBundleTemplate.metallicLevel = bundleBase.metallicLevel;
        // benefitBundleTemplate.networkScheduleId = bundleBase.networkScheduleId[0];
        benefitBundleTemplate.coverageStartDate = bundleBase.coverageStartDate;
        benefitBundleTemplate.coverageExpiryDate = bundleBase.coverageExpirationDate;
        benefitBundleTemplate.benefitBundleOptionId = bundleBase.benefitBundleOptionID;
        if(getGroupResponse.benefitBundleOptionId){
          if(getGroupResponse.benefitBundleOptionId === benefitBundleTemplate.benefitBundleOptionId){
            getGroupTemplate.benefitBundles.push(benefitBundleTemplate);
          }
        }
        else {
          getGroupTemplate.benefitBundles.push(benefitBundleTemplate);
        }
      }
    }
  }

  return getGroupTemplate;

}
