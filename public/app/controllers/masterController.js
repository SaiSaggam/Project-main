angular.module('masterApp').controller('masterCtrl', masterCtrl);
masterCtrl.$inject = ['$scope', '$rootScope', '$uibModal', '$filter', '$sessionStorage', 'TimerService', 'serverGetReqSrv', 'serverPostReqSrv', 'ERROR_MESSAGE'];

function masterCtrl($scope, $rootScope, $uibModal, $filter, $sessionStorage, TimerService, serverGetReqSrv, serverPostReqSrv, ERROR_MESSAGE) {
    var initialLoginTime = $filter('date')(new Date(), 'hh:mma');
    $scope.currentLogin = initialLoginTime;

    $scope.open = function() {
        var modalInstance = $uibModal.open({
            windowClass: 'search-modal',
            templateUrl: '/partials/myModalContent.ejs',
            controller: 'searchFormCtrl',
            backdrop: 'static',
            size: 'lg'
        });
    };

    $scope.toggleOpen = function() {
        $scope.isOpenPanel = !$scope.isOpenPanel;
    }

    $scope.showRiderInfo = function() {
        $scope.isRiderInfo = !$scope.isRiderInfo;
    }
    $scope.showOOPInfo = function() {
        $scope.isOOPInfo = !$scope.isOOPInfo;
    }

    $scope.showMemberInfo = function() {
        $scope.isOpenMemberInfo = !$scope.isOpenMemberInfo;
    }

    $scope.toggleGroupOpen = function() {
        $scope.isGroupOpenPanel = !$scope.isGroupOpenPanel;
    }

    $scope.showGroupInfo = function() {
        $scope.isOpenGroupInfo = !$scope.isOpenGroupInfo;
    }



    $scope.openQuickLinksModal = function(documentType) {
        $rootScope.documentType = angular.copy(documentType);
        var modalInstance = $uibModal.open({
            windowClass: 'quicklinks-data-modal',
            templateUrl: '/partials/quicksLinksDataModal.ejs',
            controller: 'quickLinksCtrl',
            backdrop: 'static',
            size: 'lg'
        });
    }

    $scope.openAdmin = function() {
        $scope.isAdminPage = true;
        // $scope.form = $scope.resQuickLinks;
    };

    $rootScope.$on("memberData", function(event, indv) {
        $scope.isOpenPanel = true;
        $scope.isOpenMemberInfo = true;
        $scope.isRiderInfo = true;
        $scope.isOOPInfo = true;
        $scope.showMemberGrid = true;
        $scope.showGroupGrid = false;
        $scope.showUserName = true;
        $scope.showGroupName = false;
        $scope.indvDetails = indv;
        $scope.indvDetails.birthday = calculateAge($scope.indvDetails.dob);
        $scope.showQuickLinkGroup = false;
        $scope.showQuickLink = true;
    });

    $rootScope.$on('reset', function() {
        $scope.showUserName = false;
        $scope.showGroupName = false;
        $scope.showMemberGrid = false;
        $scope.showGroupGrid = false;
        $scope.showMemberDepedentDetails = false;
        $scope.showQuickLink = false;
    });

    $rootScope.$on("groupData", function(event, grp) {
        $scope.isGroupOpenPanel = true;
        $scope.isOpenGroupInfo = true;
        $scope.isRiderGroupInfo = true;
        $scope.isOOPInfo = true;
        $scope.showMemberGrid = false;
        $scope.showGroupGrid = true;
        $scope.showUserName = false;
        $scope.showGroupName = true;
        $scope.grpDetails = grp;
        $scope.showQuickLink = false;
        $scope.showQuickLinkGroup = true;
    });

  $rootScope.$on("getMemberFamilyDetails", function(event, memDetails){
    getMemberFamilyDetails(memDetails);
  });
  function getMemberFamilyDetails(memDetails) {
      var memberFamilyReqObj = {
              "surrogateKey": "",
              "groupNo": "",
              "effectiveDate": ""
          }
          // name of the service

      var memberFamilyServiceName = "member/getMemberFamily";
      $scope.showMemberDepedentSpinner = true;
      memberFamilyReqObj.surrogateKey = memDetails.surrogateKey;
      memberFamilyReqObj.groupNo = memDetails.groupNo;
      memberFamilyReqObj.effectiveDate = memDetails.startDate;
      TimerService.init();
      $scope.showMemberDepedentDetails = true;
      serverPostReqSrv.send(memberFamilyServiceName, memberFamilyReqObj).async().then(function(d) {
        TimerService.log('Get member family response got in');
          $scope.familyError = false;
          $scope.showMemberDepedentSpinner = false;

          $scope.memberDepedentDetails = d.memberFamily;
      }).catch(function(err) {
          $scope.familyInfoErr = ERROR_MESSAGE.getMemberFamily[err.status];
          $scope.showMemberDepedentSpinner = false;
          $scope.familyError = true;
      });
  }

    $scope.getMembershipForDependents = function(individual) {
        $scope.indvDetails = individual;
        $scope.indvDetails.birthday = calculateAge($scope.indvDetails.dob);
        $scope.showMemberDepedentDetails = false;
        $rootScope.$emit("getMembershipForDependents", individual);
    }

    function init() {
        $scope.isOpenPanel = true;
        $scope.isOpenMemberInfo = true;
        $scope.showMemberDepedentDetails = false;
        $scope.isOOPInfo = true;
        $scope.isRiderInfo = true;
        $scope.isGroupOpenPanel = true;
        $scope.isOpenGroupInfo = true;
        $scope.isRiderGroupInfo = true;
        $scope.isOOPInfo = true;

        getQuickLinksData();
        $scope.isAdminPage = false;
        // $sessionStorage.$reset();
        $scope.open();


    }

    init();

    $scope.retrieveUserRole = function(userInfo) {
        userInfo = JSON.parse(userInfo);
        $scope.isAdminRole = userInfo.userRole.isAdmin;
        $sessionStorage.isMemberRole = userInfo.userRole.isMember;
        $rootScope.userInfo = userInfo;
    }

    $scope.retrieveQueryGroupInfo = function(grpInfo){
      $rootScope.grpInfo = JSON.parse(grpInfo);

    }

    $scope.closeAdminPage = function() {
        // getQuickLinksData();
        $scope.isAdminPage = false;
    }

    function getQuickLinksData() {
        serverGetReqSrv.send("quicklinks/getQuickLinks").async().then(function(d) {
            $scope.resQuickLinks = d.links;
            $scope.form = d;
            $scope.restObj = angular.copy($scope.form);
        }, function(err) {
            console.log("Error got at getData");
        });
    }

    function calculateAge(dob) {
        var ageDifMs = Date.now() - new Date(dob);
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

}
