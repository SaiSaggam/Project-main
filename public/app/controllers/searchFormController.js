angular.module('masterApp').controller('searchFormCtrl', searchFormCtrl);
searchFormCtrl.$inject = ['$scope', '$rootScope', '$sessionStorage', 'serverPostReqSrv', 'TimerService', '$filter', 'US_STATES', 'ERROR_MESSAGE'];

function searchFormCtrl($scope, $rootScope, $sessionStorage, serverPostReqSrv, TimerService, $filter, US_STATES, ERROR_MESSAGE) {

    $scope.showSearchForm = true;
    $scope.searchErrMsg = ERROR_MESSAGE.formErrorMsg;
    $scope.isMemberRole = $sessionStorage.isMemberRole;

    var groupSearchJson = {
        "groupNo": "",
        "groupName": "",
        "state": ""
    };


    $scope.accessMemberTab = function() {
        if (!$scope.isMemberRole) {
            return 'disabledTab';
        }
        return '';
    }
    $scope.grpDropdownValue = function(grpSearchType) {
        $scope.grpSearchType = grpSearchType;
        $sessionStorage.grpSearchType = grpSearchType;
        if ($scope.grpSearchType === 'groupName') {
            $scope.isGroupNoSearch = false;
        } else {
            $scope.isGroupNoSearch = true;
        }

        $sessionStorage.isGroupNoSearch = $scope.isGroupNoSearch;
    }
    $scope.dropdownValue = function(searchType) {
        $scope.searchType = searchType;
        $sessionStorage.searchType = searchType;
        if ($scope.searchType === 'name') {
            $scope.isMemberIdSearch = false;
        } else {
            $scope.isMemberIdSearch = true;
        }
        $sessionStorage.isMemberIdSearch = $scope.isMemberIdSearch;

    }

    $scope.isActive = function(searchWith) {
        if (searchWith === $scope.searchBy) {
            return 'active';
        }
        return '';
    }

    $scope.setActiveData = function(searchVar) {
        $scope.searchBy = searchVar;
        $sessionStorage.searchBy = $scope.searchBy;
    }

    function init() {
        $scope.value = "memberId";
        $scope.val = "groupNo";
        $scope.showErrorMsg = false;
        $scope.showGrpErrorMsg = false;
        $scope.isMemberIdSearch = true;
        $scope.isGroupNoSearch = true;
        $scope.showMemberGrid = false;
        $scope.showGroupGrid = false;
        $scope.showMemberResults = false;
        $scope.showPlanResults = false;
        $scope.showSpinner = false;
        $scope.req = {};
        $sessionStorage.searchData = {};
        $sessionStorage.groupSearchData = {};
        $scope.groupReq = {};
        $scope.searchBy = 'member';
        $scope.dropdownValue($scope.value);
        $scope.grpDropdownValue($scope.val);
        if (!$scope.isMemberRole) {
            $scope.searchBy = 'group';
        }
        if (!_.isUndefined($sessionStorage.memRecentSearch)) {
            $scope.recMemSearches = JSON.parse($sessionStorage.memRecentSearch);
        }
        if (!_.isUndefined($sessionStorage.groupRecentSearch)) {
            $scope.recGroupSearches = JSON.parse($sessionStorage.groupRecentSearch);
        }
    }

    function retrieveModalState() {
        $scope.value = $sessionStorage.searchType;
        $scope.val = $sessionStorage.grpSearchType;
        $scope.searchType = $sessionStorage.searchType;
        $scope.grpSearchType = $sessionStorage.grpSearchType;
        $scope.isMemberIdSearch = $sessionStorage.isMemberIdSearch;
        $scope.isGroupNoSearch = $sessionStorage.isGroupNoSearch;
        $scope.searchBy = $sessionStorage.searchBy;
        $scope.resultsType = $sessionStorage.resultsType;
        $scope.req = $sessionStorage.searchData;
        $scope.groupReq = $sessionStorage.groupSearchData;
        if ($sessionStorage.resSearch) {
            $scope.resSearch = $sessionStorage.resSearch;
            $scope.showMemberResults = true;
        }
        if ($sessionStorage.groupSearch) {
            $scope.groupSearch = $sessionStorage.groupSearch;
            $scope.showPlanResults = true;
        }
        if (!_.isUndefined($sessionStorage.memRecentSearch)) {
            $scope.recMemSearches = JSON.parse($sessionStorage.memRecentSearch);
        }
        if (!_.isUndefined($sessionStorage.groupRecentSearch)) {
            $scope.recGroupSearches = JSON.parse($sessionStorage.groupRecentSearch);
        }
    }

    if ($rootScope.saveState) {
        retrieveModalState();
    } else {
        init();

    }

    function clearData(param) {
        if (param === 'member') {
            $scope.req = {};
            $sessionStorage.searchData = {};
            $scope.resSearch = '';
            $sessionStorage.resSearch = '';
            $scope.showErrorMsg = false;
        } else if (param === 'group') {
            $scope.groupReq = {};
            $sessionStorage.groupSearchData = {};
            $scope.groupSearch = '';
            $sessionStorage.groupSearch = '';
            $scope.showGrpErrorMsg = false;

        }
    }

    $scope.resetForm = function() {
        $scope.showErrorMsg = false;
        $scope.showGrpErrorMsg = false;
        $scope.hasMoreResults = false;
        $scope.showMemberResults = false;
        $scope.showPlanResults = false;
        $scope.showSpinner = false;
        clearData('member');
        clearData('group');
    }

    $scope.stateData = US_STATES.usState;

    $scope.closeModal = function() {
            $scope.$close();
        }
        // validating user given search criteria
    function isValid(input, type) {
        if (_.isNull(input) || _.isUndefined(input) || input === '') {
            return false;
        }
        if (type === 'text') {
            return !(/\d/.test(input));
        } else if (type === 'no') {
            return !isNaN(input);
        } else if (type === 'zip') {
            return !isNaN(input) && (input.length == 5);
        } else if (type === 'date') {
            return _.isDate(input);
        }
        return true;
    }

    function getValidDates(startDate, stopDate) {
        var today = new Date();
        if (isValid(startDate, 'date') && !isValid(stopDate, 'date')) {
            stopDate = new Date('12/31/9999');
        } else if (isValid(stopDate, 'date') && !isValid(startDate)) {
            startDate = new Date((stopDate.getUTCFullYear() - 2), stopDate.getMonth(), stopDate.getDate());
            if (startDate.getTime() > today.getTime()) {
                startDate = today;
            }
        } else if (!isValid(startDate) && !isValid(stopDate)) {
            stopDate = today;
            startDate = new Date((today.getUTCFullYear() - 2), today.getMonth(), today.getDate());
        } else if (!isValid(startDate, 'date') || !isValid(stopDate, 'date')) {
            $scope.showErrorMsg = true;
            $scope.showGrpErrorMsg = true;
            $scope.searchErrMsg = "Invalid Date format Entered, Please enter date format in 'MM-dd-yyyy'";
            return false;
        } else {
            if (startDate.getTime() > stopDate.getTime()) {
                $scope.showErrorMsg = true;
                $scope.showGrpErrorMsg = true;
                $scope.searchErrMsg = "Coverage End Date should be ahead of Coverage Start Date";
                return false;
            }

        }
        return {
            startDate: startDate,
            stopDate: stopDate
        };
    }

    $scope.submitMemberReq = function() {
        $scope.searchBy = 'member';
        $sessionStorage.searchBy = $scope.searchBy;
        $sessionStorage.searchData = $scope.req;
        $sessionStorage.resSearch = '';
        $scope.showMemberResults = false;
        $rootScope.saveState = true;
        $scope.showErrorMsg = false;
        $scope.showGrpErrorMsg = false;
        $scope.searchErrMsg = ERROR_MESSAGE.formErrorMsg;
        $scope.hasMoreResults = false;
        if ($scope.req == null) {
            $scope.showErrorMsg = true;
        } else {
            if ($scope.searchType === 'name') {
                if (isValid($scope.req.lastName, 'text') && (isValid($scope.req.zipCode, 'zip') || isValid($scope.req.state, 'text'))) {

                    $scope.req.memberId = '';
                    $scope.req.memberIdStartDate = '';
                    $scope.req.memberIdStopDate = '';
                    var validDates = getValidDates($scope.req.nameStartDate, $scope.req.nameStopDate);
                    if (validDates) {
                        $scope.req.nameStartDate = validDates.startDate;
                        $scope.req.nameStopDate = validDates.stopDate;
                        $rootScope.userInfo.memberId = undefined;
                        getMemberData($scope.req);
                    }
                } else {
                    if (!isValid($scope.req.lastName, 'text')) {
                        $scope.lastNameError = true;
                    }
                    if (!(isValid($scope.req.zipCode, 'zip') || isValid($scope.req.state, 'text'))) {
                        $scope.zipOrState = true;
                    }
                    $scope.showErrorMsg = true;
                }
            } else {
                if (isValid($scope.req.memberId, 'no')) {
                    var validDates = getValidDates($scope.req.memberIdStartDate, $scope.req.memberIdStopDate);
                    if (validDates) {
                        $scope.req = { 'memberId': $scope.req.memberId };
                        $scope.req.memberIdStartDate = validDates.startDate;
                        $scope.req.memberIdStopDate = validDates.stopDate;
                        $rootScope.userInfo.memberId = $scope.req.memberId;
                        getMemberData($scope.req);
                    }
                } else {
                    $scope.memberIdError = true;
                    $scope.showErrorMsg = true;

                }
            }
        }
    }


    function getMemberData(req) {
        $sessionStorage.searchData = req;
        $scope.showErrorMsg = false;
        $rootScope.userInfo.groupId = undefined;
        var memberSearchServName = "member/findIndividual";
        $scope.showSpinner = true;
        $scope.startDate = getSearchTypeData($scope.searchType).startDate;
        $scope.stopDate = getSearchTypeData($scope.searchType).stopDate;
        TimerService.init();
        $rootScope.$emit('reset');
        serverPostReqSrv.send(memberSearchServName, req).async().then(function(d) {
            TimerService.log('Find Individual Response Got in');
            $scope.hasMoreResults = d.hasMoreResults;
            if (d.hasMoreResults) {
                $scope.searchErrMsg = ERROR_MESSAGE.moreResult;
            }
            $scope.resultsType = $scope.searchType;
            $sessionStorage.resultsType = $scope.resultsType;
            $scope.resSearch = d.individual;
            $sessionStorage.resSearch = d.individual;
            $scope.showMemberResults = true;
            $scope.showSpinner = false;
            if ($scope.resSearch.length === 1) {
                $scope.memberSubmit($scope.resSearch[0]);
                $scope.closeModal();
            }
        }).catch(function(err) {
            $scope.searchErrMsg = ERROR_MESSAGE.findIndividual[err.status];
            $scope.showMemberResults = false;
            $scope.showErrorMsg = true;
            $scope.showSpinner = false;
        });
        $scope.showErrorMsg = false;
    }

    function updateDateFormat(date) {
        var formattedDate = $filter('date')(date, 'yyyy-MM-dd');
        return formattedDate;
    }


    $scope.memberSubmit = function(indv) {
        if ($scope.searchBy === 'recent') {
            clearData('member');
            clearData('group');
        }
        $scope.searchBy = 'member';
        $sessionStorage.searchBy = $scope.searchBy;
        $rootScope.saveState = true;
        clearData('group');
        if (!indv.startDate && !indv.stopDate) {
            indv.startDate = updateDateFormat($scope.startDate);
            indv.stopDate = updateDateFormat($scope.stopDate);
        }
        $rootScope.userInfo.memberId = indv.memberId.id;
        $rootScope.userInfo.groupId = undefined;
        $rootScope.$emit("memberData", indv);
        if (_.isUndefined($sessionStorage.memRecentSearch)) {
            var memrRecArr = [];
        } else {
            var memrRecArr = JSON.parse($sessionStorage.memRecentSearch);
        }
        for (var i = 0; i < memrRecArr.length; i++) {
            if (memrRecArr[i].individualId == indv.individualId) {
                memrRecArr.splice(i, 1);
            }
        }
        memrRecArr.push(indv);
        if (memrRecArr.length > 10) {
            memrRecArr.shift();
        }
        $sessionStorage.memRecentSearch = angular.copy(JSON.stringify(memrRecArr));
        $scope.recMemSearches = JSON.parse($sessionStorage.memRecentSearch);
    }

    $scope.submitGroupReq = function() {
        $scope.searchBy = 'group';
        $sessionStorage.searchBy = $scope.searchBy;
        $sessionStorage.groupSearchData = $scope.groupReq;
        $sessionStorage.groupSearch = '';
        $rootScope.saveState = true;
        $scope.showPlanResults = false;
        $scope.showErrorMsg = false;
        $scope.showGrpErrorMsg = false;
        $scope.searchErrMsg = ERROR_MESSAGE.formErrorMsg;
        $scope.hasMoreResults = false;
        if ($scope.groupReq == null) {
            $scope.showGrpErrorMsg = true;
        } else {

            if ($scope.grpSearchType === 'groupName') {
                if (isValid($scope.groupReq.groupName) && isValid($scope.groupReq.state, 'text')) {
                    $scope.groupReq.groupNo = '';
                    $scope.groupReq.groupStartDate = '';
                    $scope.groupReq.groupStopDate = '';
                    $scope.groupReq.groupNoBboid = '';
                    var validDates = getValidDates($scope.groupReq.gNameStartDate, $scope.groupReq.gNameStopDate);
                    if (validDates) {
                        $scope.groupReq.gNameStartDate = validDates.startDate;
                        $scope.groupReq.gNameStopDate = validDates.stopDate;
                        $rootScope.userInfo.groupId = undefined;
                        getGroupData($scope.groupReq);
                    }

                    // getGroupData($scope.groupReq);
                } else {
                    if (!isValid($scope.groupReq.state, 'text')) {
                        $scope.noState = true;
                    }
                    if (!isValid($scope.groupReq.groupName)) {
                        $scope.groupNameError = true;
                    }
                    $scope.showGrpErrorMsg = true;
                    // $sessionStorage.showGrpErrorMsg = $scope.showGrpErrorMsg;
                }
            } else {
                if (isValid($scope.groupReq.groupNo, 'no')) {
                    var validDates = getValidDates($scope.groupReq.groupStartDate, $scope.groupReq.groupStopDate);
                    if (validDates) {
                        $scope.groupReq = { 'groupNo': $scope.groupReq.groupNo, 'groupNoBboid' : $scope.groupReq.groupNoBboid};
                        $scope.groupReq.groupStartDate = validDates.startDate;
                        $scope.groupReq.groupStopDate = validDates.stopDate;
                        $rootScope.userInfo.groupId = $scope.groupReq.groupNo;
                        getGroupData($scope.groupReq);
                    }
                    // getGroupData($scope.groupReq);
                } else {
                    $scope.groupNoError = true;
                    $scope.showGrpErrorMsg = true;
                    // $sessionStorage.showGrpErrorMsg = $scope.showGrpErrorMsg;

                }
            }

        }
    }

    function getGroupData(groupReq) {
        $sessionStorage.groupSearchData = groupReq;
        $scope.showGrpErrorMsg = false;
        $rootScope.userInfo.memberId = undefined;
        var groupSearchServName = "group/findEmployerGroup";
        $scope.showSpinner = true;
        $scope.grpStartDate = getSearchTypeData($scope.grpSearchType).startDate;
        $scope.grpStopDate = getSearchTypeData($scope.grpSearchType).stopDate;
        $scope.benefitBundleOptionId = getSearchTypeData($scope.grpSearchType).benefitBundleOptionId;
        TimerService.init();
        $rootScope.$emit('reset');
        serverPostReqSrv.send(groupSearchServName, groupReq).async().then(function(d) {
            TimerService.log('Find Employer Group Response Got in');
            $scope.groupResultsType = $scope.groupSearchType;
            $sessionStorage.groupResultsType = $scope.groupResultsType;
            $scope.groupSearch = d.groups;
            $sessionStorage.groupSearch = d.groups;
            if ($scope.groupSearch.length === 1) {
                $scope.groupSubmit($scope.groupSearch[0]);
                $scope.closeModal();
            }
            $scope.showPlanResults = true;
            $scope.showSpinner = false;

        }).catch(function(err) {
            $scope.searchErrMsg = ERROR_MESSAGE.findEmployerGroup[err.status];
            $scope.showPlanResults = false;
            $scope.showSpinner = false;
            $scope.showGrpErrorMsg = true;
        });
    }

    $scope.groupSubmit = function(grp) {
        if ($scope.searchBy === 'recent') {
            clearData('member');
            clearData('group');
        }
        $scope.searchBy = 'group';
        $sessionStorage.searchBy = $scope.searchBy;
        $rootScope.saveState = true;
        clearData('member');
        if (!grp.startDate && !grp.stopDate) {
            grp.startDate = updateDateFormat($scope.grpStartDate);
            grp.stopDate = updateDateFormat($scope.grpStopDate);
        }
        if(!grp.benefitBundleOptionId){
          grp.benefitBundleOptionId = $scope.benefitBundleOptionId;
        }
        $rootScope.userInfo.memberId = undefined;
        $rootScope.userInfo.groupId = grp.groupNo;
        $rootScope.$emit("groupData", grp);
        if (_.isUndefined($sessionStorage.groupRecentSearch)) {
            var groupRecArr = [];
        } else {
            var groupRecArr = JSON.parse($sessionStorage.groupRecentSearch);
        }
        for (var j = 0; j < groupRecArr.length; j++) {
            if (groupRecArr[j].groupNo == grp.groupNo) {
                groupRecArr.splice(j, 1);
            }
        }
        groupRecArr.push(grp);
        if (groupRecArr.length > 10) {
            groupRecArr.shift();
        }
        $sessionStorage.groupRecentSearch = JSON.stringify(groupRecArr);
    }

    if(!_.isEmpty($rootScope.grpInfo) && !$scope.saveState){
      $scope.groupReq = $rootScope.grpInfo;
      $scope.submitGroupReq();
    }
    //Sorting
    $scope.sort = {
        active: '',
        descending: undefined
    }

    $scope.changeSorting = function(column) {
        var sort = $scope.sort;
        if (sort.active == column) {
            sort.descending = !sort.descending;
        } else {
            sort.active = column;
            sort.descending = false;
        }
    };

    $scope.getIcon = function(column) {
        var sort = $scope.sort;
        if (sort.active == column) {
            return sort.descending ? 'fa fa-caret-down' : 'fa fa-caret-up';
        }
        return 'fa fa-sort';
    }

    /*****************                  Please Dont Change             ********************/

    // Configuration for all date picker instances
    //KEEP
    function getFutureDate(date) {
        if (isValid(date) && _.isDate(date)) {
            date.setDate(date.getDate() + 1);
            return date;
        }
    }

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM-dd-yyyy'];
    $scope.format = $scope.formats[4];
    // Date of Birth Config
    $scope.memberDOBDateOps = {
        dateDisabled: false,
        formatYear: 'yyyy',
        startingDay: 1,
        showWeeks: false
    };

    $scope.openMemberDOBDate = function() {
        $scope.memberDOBPopup.opened = true;
        // var memberStartDate = angular.copy($scope.req.startDate);
    };

    $scope.memberDOBPopup = {
        opened: false
    };

    $scope.modelOptions = {
        allowInvalid: true
    };
    $scope.startDateOps = {
        dateDisabled: false,
        formatYear: 'yyyy',
        minDate: new Date(1990, 5, 22),
        startingDay: 1,
        showWeeks: false
    };

    $scope.openStartDate = function() {
        $scope.startDatePopup.opened = true;
    };

    $scope.startDatePopup = {
        opened: false
    };


    // MemberId Stop Date Config
    //Our code make changes accordingly

    function getSearchTypeData(type) {
        var dateObject = {
            memberId: {
                'startDate': $scope.req.memberIdStartDate,
                'stopDate': $scope.req.memberIdStopDate
            },
            name: {
                startDate: $scope.req.nameStartDate,
                stopDate: $scope.req.nameStopDate
            },
            groupNo: {
                startDate: $scope.groupReq.groupStartDate,
                stopDate: $scope.groupReq.groupStopDate,
                benefitBundleOptionId: $scope.groupReq.groupNoBboid

            },
            groupName: {
                startDate: $scope.groupReq.gNameStartDate,
                stopDate: $scope.groupReq.gNameStopDate,
                benefitBundleOptionId: $scope.groupReq.groupNameBboid
            }
        };
        return dateObject[type];
    }

    $scope.endDateOps = {
        dateDisabled: false,
        formatYear: 'yyyy',
        startingDay: 1,
        showWeeks: false
    };

    $scope.openEndDate = function(type) {
        $scope.endDatePopup.opened = true;
        var startDate = getSearchTypeData(type).startDate;
        $scope.endDateOps.minDate = getFutureDate(startDate);
    };

    $scope.endDatePopup = {
        opened: false
    };


    $scope.callingFutureDate = function() {
        var groupStartDate = angular.copy($scope.futureDate);
        getFutureDate(groupStartDate);
        retrieveModalState();
    }

    /***************** End of Date Picker From and to Date End ********************/

};
