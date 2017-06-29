angular.module('masterApp').controller('memberResultCtrl', memberResultCtrl);
memberResultCtrl.$inject = ['$scope', '$rootScope', 'serverPostReqSrv', 'serverGetReqSrv', 'TimerService', 'ERROR_MESSAGE'];

function memberResultCtrl($scope, $rootScope, serverPostReqSrv, serverGetReqSrv, TimerService, ERROR_MESSAGE) {


    $rootScope.$on("memberData", function(event, indv) {
        $scope.isMemberSearch = true;
        $scope.isGroupSearch = false;
        $scope.surrogateKey = _.get(indv, 'surrogateKey');
        getCoverageInformation(indv);
    });

    $rootScope.$on("getMembershipForDependents", function(event, individual) {
        // init();
        getCoverageInformation(individual);
    });

    $rootScope.$on('reset', function() {
        $scope.showMembership = false;

    });

    $rootScope.$on("groupData", function(event, grp) {
        $scope.isMemberSearch = false;
        $scope.isGroupSearch = true;
        getGroupCoverageInformation(grp);
    });

    function extendContract(contract, req) {
        var result = {};
        for (var key in contract) {
            for (var i in req) {
                if (key == i) {
                    result[key] = req[i];
                }
            }
        }
        return result;
    }


    function getCoverageInformation(req) {
        initializeServiceCall();
        $scope.showMembership = true;
        $scope.beachSpinner = true;
        var serverBackendCall = "member/findMembership";

        var membershipJsonContract = {
            "surrogateKey": "",
            "startDate": "",
            "stopDate": ""
        };
        var userReq = extendContract(membershipJsonContract, req);
        TimerService.init();
        console.log('Coverage Information Request Obj', JSON.stringify(userReq));
        serverPostReqSrv.send(serverBackendCall, userReq).async().then(function(d) {
            TimerService.log('Find membership Response got in');
            console.log('Coverage Information Response Obj', JSON.stringify(d));
            $scope.beachSpinner = false;
            $scope.membershipRes = d.memberships;
            $scope.submitCoverageType($scope.membershipRes[0], 0);

        }).catch(function(err) {
            $scope.beachSpinner = false;
            $scope.coverageInfoErr = ERROR_MESSAGE.findMembership[err.status];
            $scope.showCoverageInfoError = true;
        });
    };

    $scope.submitCoverageType = function(memDetails, index) {
        initializeServiceCall('submit');
        $scope.beachSpinner = true;
        $scope.selectedRow = index;
        $scope.selectedItem = memDetails;
        //getting memeber Realtion details
        $rootScope.$emit('getMemberFamilyDetails', memDetails);
        if (memDetails.systemCode === 'CR') {
            var serverBackendCall = "member/getMembership";
            var getMemJsonContract = {
                "surrogateKey": "",
                "groupNo": ""
            };
            var userGetReq = extendContract(getMemJsonContract, memDetails);
            TimerService.init();
            console.log('Coverage Type Req', JSON.stringify(userGetReq));
            serverPostReqSrv.send(serverBackendCall, userGetReq).async().then(function(d) {
                TimerService.log('Get membership Response got in');
                console.log('Coverage Type Response', JSON.stringify(d));
                $scope.showPanels = true;
                $scope.getMemRes = d;
                $scope.getMemRes.surrogateKey = memDetails.surrogateKey;
                getSubscriptionServiceBenefit($scope.getMemRes);
                getDeductiblesOOPS($scope.getMemRes);
                getBenefitLanguageData($scope.getMemRes);
            }).catch(function(err) {
                $scope.beachSpinner = false;
                $scope.memberInfoErr = ERROR_MESSAGE.getMembership[err.status];
                $scope.getMembershipErr = true;
                $scope.showPanels = false;
            });
        }
    };


    function getGroupCoverageInformation(grp) {
        initializeServiceCall();
        $scope.showMembership = true;
        $scope.beachSpinner = true;

        var groupSearchJson = {
            "groupNo": "",
            "benefitBundleOptionId": "",
            "startDate": "",
            "stopDate": ""
        };
        var userReq = extendContract(groupSearchJson, grp);
        var groupSearchServiceName = "group/getEmployerGroup";
        TimerService.init();
        serverPostReqSrv.send(groupSearchServiceName, userReq).async().then(function(d) {
            TimerService.log('Get Employer Group Response Got in');
            $scope.groupRes = d;
            $scope.grpDetails.employeeCounts = d.employeeCount;
            $scope.beachSpinner = false;
            $scope.submitGroupCoverageType($scope.groupRes.benefitBundles[0], 0);
        }).catch(function(err) {
            $scope.beachSpinner = false;
            $scope.GroupCoverageInfoError = ERROR_MESSAGE.getEmployerGroup[err.status];
            $scope.showGroupCoverageInfoErr = true;
        });
        //getBenefitLanguageData(grp);
    };

    $scope.submitGroupCoverageType = function(grpCoverage, index) {
        initializeServiceCall('submit');
        $scope.beachSpinner = true;
        $scope.grpRiderLoading = true;
        $scope.selectedRow = index;
        $scope.selectedItem = grpCoverage;
        $scope.showPanels = true;
        getSubscriptionServiceBenefit(grpCoverage);
        getBenefitLanguageData(grpCoverage);
    };

    function getSubscriptionServiceBenefit(coverageDetails) {
        $scope.deducatableOOPLoading = true;
        $scope.memRiderLoading = true;
        var coverageOverViewServiceName = "member/getSubscriptionServiceBenefit";
        var coverageOverViewReqObj = {
            "benefitBundleOptionId": "",
            "startDate": "",
            "stopDate": ""
        };
        var userReq = extendContract(coverageOverViewReqObj, coverageDetails);
        // userReq.benefitBundleOptionId = '35567894';
        TimerService.init();
        serverPostReqSrv.send(coverageOverViewServiceName, userReq).async().then(function(d) {
            TimerService.log('Get subscription service benefit response got in');
            $scope.riderData = d;
            $scope.memRiderLoading = false;
            $scope.deducatableOOPLoading = false;
            stopSpinner();

        }).catch(function(err) {
            $scope.riderInfoErr = ERROR_MESSAGE.getSubscriptionServiceBenefit[err.status];
            $scope.memRiderLoading = false;
            $scope.riderError = true;
            $scope.deducatableOOPLoading = false;
            if($scope.isGroupSearch){
              $scope.deducatableOOPErrInfo = ERROR_MESSAGE.getSubscriptionServiceBenefit[err.status];
              $scope.deducatableOOPErr = true;
            }
            stopSpinner();
        });
    }

    function getDeductiblesOOPS(coverageDetails) {
        $scope.deducatableOOPLoading = true;
        var surrogateKey = angular.copy($scope.surrogateKey);
        var deductableOOPsReqName = "member/getBenefitAccumulator";
        var deductableOOPsReqObj = {
            "benefitBundleOptionId": "",
            "surrogateKey": "",
            "startDate": "",
            "stopDate": ""

        };
        var userReq = extendContract(deductableOOPsReqObj, coverageDetails);
        TimerService.init();
        serverPostReqSrv.send(deductableOOPsReqName, userReq).async().then(function(d) {
            TimerService.log('Get subscription service benefit response got in');
            $scope.deducatableOOPData = d;
            $scope.deducatableOOPLoading = false;
            stopSpinner();

        }).catch(function(err) {
            $scope.deducatableOOPErrInfo = ERROR_MESSAGE.getBenefitAccumulator[err.status];
            $scope.deducatableOOPLoading = false;
            $scope.deducatableOOPErr = true;
            stopSpinner();
        });
    }

    function getBenefitLanguageData(coverageInfo) {
        $scope.benifitLangLoading = true;
        var langReqName = "member/getBenefitLanguage";
        var languageReqObj = {
            "benefitBundleOptionId": "",
            "startDate": "",
            "stopDate": ""
        };

        var userReq = extendContract(languageReqObj, coverageInfo);
        TimerService.init();
        serverPostReqSrv.send(langReqName, userReq).async().then(function(d) {
            TimerService.log('Language Response got in');
            $scope.benefitLangReq = d;
            $scope.benifitLangLoading = false;
            stopSpinner();
            getDisabledLetter(d.benefits);


        }).catch(function(err) {
            $scope.benefitInfoError = ERROR_MESSAGE.getBenefitLanguage[err.status];
            $scope.benefitError = true;
            $scope.benifitLangLoading = false;
            stopSpinner();
        });
    }

    function stopSpinner() {
        if (!$scope.benifitLangLoading && !$scope.memRiderLoading) {
            $scope.beachSpinner = false;
        }
    }

    function initializeServiceCall(flag) {
        $scope.showPanels = false;
        if (!flag) {
            //findMembership (coverageInformation)
            $scope.membershipRes = null;
            $scope.groupRes = null;
            //getEmployerGroup (getGroupCoverageInformation)
            $scope.showCoverageInfoError = false;
            $scope.showGroupCoverageInfoErr = false;
        }
        //getMembership (submitCoverageType)
        $scope.getMemRes = null;
        $scope.getMembershipErr = false;
        //getSubscriptionServiceBenefit (getSubscriptionServiceBenefit)
        $scope.riderData = null;
        $scope.riderError = false;
        // get Accumulators
        $scope.deducatableOOPData = null;
        $scope.deducatableOOPErr = false;
        //getBenefitLanguage (getBenefitLanguageData)
        $scope.benefitLangReq = null;
        $scope.benefitError = false;
    }

    $scope.oneAtATime = true;

    var str = "abcdefghijklmnopqrstuvwxyz";
    $scope.alphabet = str.toUpperCase().split("");

    $scope.activeLetter = '';

    $scope.activateLetter = function(letter) {
        $scope.activeLetter = letter;

        // $scope.showspan = true;
    }

    $scope.returnActive = function(letter) {
        if ($scope.activeLetter == letter) {
            return {
                style: 'border-active',
                bool: true
            };
        }
        return false;
    }
    $scope.emptyLetters = [];

    getDisabledLetter = function(benefitReq) {
        for (var i = 0; i < $scope.alphabet.length; i++) {
            var letter = $scope.alphabet[i];
            var letterMatch = new RegExp(letter, 'i');
            for (var j = 0; j < benefitReq.length; j++) {
                if (letterMatch.test(benefitReq[j].benefitName.substring(0, 1))) {
                    break;
                } else if (j === (benefitReq.length - 1)) {
                    $scope.emptyLetters.push(letter);
                }
            }
            $scope.benifitLangLoading = false;


        }
    }

    $scope.isDisabled = function(l) {
        for (var i = 0; i < $scope.emptyLetters.length; i++) {
            if (l === $scope.emptyLetters[i]) {
                return {
                    toggle: 'enable',
                    boolean: true
                };
            }
        }
        // $scope.colorClass = "disable"; //#D7D7D7
        return {
            toggle: 'disable',
            boolean: false
        };
    }

};

angular.module('masterApp').filter('startsWithLetter', function() {
    return function(items, letter) {
        var filtered = [];
        var letterMatch = new RegExp(letter, 'i');
        if (items != null) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.benefitName.substring(0, 1))) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };
});
