exports.requestMapping = function(request) {

  var benefitLanguageRequest = {
    "getBenefitLanguage": {
      "getBenefitLanguageRequest": {
        "benefitBundleOptionId": ""
      }
    }
  }
  benefitLanguageRequest.getBenefitLanguage.getBenefitLanguageRequest.benefitBundleOptionId = request.benefitBundleOptionId;

  return benefitLanguageRequest;
}

exports.responseMapping = function(benefitLanguageResponse) {
  var languageTemplate = {
    "benefits" : []
  };

  var languageBase = benefitLanguageResponse.getBenefitLanguageResponse.getBenefitLanguageResponse;

  for(var i = 0; i < languageBase.benefitSection.length; i++){
    var benefitSectionTemplate = {
      "benefitName": "",
      "benefitCode": "",
      "benefitSubsection" : []
    };
    benefitSectionTemplate.benefitName = languageBase.benefitSection[i].benefitName;
    benefitSectionTemplate.benefitCode = languageBase.benefitSection[i].benefitCode;
    languageTemplate.benefits.push(benefitSectionTemplate);
    if(languageBase.benefitSection[i].hasOwnProperty("benefitSubsection")){
      for(var j = 0; j < languageBase.benefitSection[i].benefitSubsection.length; j++){
        var benefitSubsectionBase = languageBase.benefitSection[i].benefitSubsection[j];

        var benefitSubsectionTemplate = {
          "general" : "",
          "INN" : "",
          "OON" : ""
        }

        if(benefitSubsectionBase.parStatusType == 1){
          benefitSubsectionTemplate.general = benefitSubsectionBase.benefitCodeGeneralLanguage;
          benefitSubsectionTemplate.INN = benefitSubsectionBase.benefitCodeLanguage;
        }
        else if(benefitSubsectionBase.parStatusType == 2){
          benefitSubsectionTemplate.OON = benefitSubsectionBase.benefitCodeLanguage;
        }
        benefitSectionTemplate.benefitSubsection.push(benefitSubsectionTemplate);
      }
    }
  }
  return languageTemplate;
}
