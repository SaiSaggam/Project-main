angular.module('masterApp').service('serverPostReqSrv', serverPostReqSrv);
serverPostReqSrv.$inject = ['$http', '$q', '$rootScope'];

function serverPostReqSrv($http, $q, $rootScope) {
    // var loginFirstName = document.getElementById('loginFirstName').value;
    // var loginLastName = document.getElementById('loginLastName').value;
    // console.log('rrrr ' + $rootScope.userInfo);
    // console.log(loginFirstName + loginLastName);
    var service = {};
    service.send = function(serviceType, jsonReq) {
        if ($rootScope.userInfo) {
            var loginFirstName = $rootScope.userInfo.firstName;
            var loginLastName = $rootScope.userInfo.lastName;
            var loginMsId = $rootScope.userInfo.msid;
            var memberId = $rootScope.userInfo.memberId;
            var groupId = $rootScope.userInfo.groupId;
        }

        var config = {
            headers: {
                'Content-Type': 'application/json',
                'firstname': loginFirstName,
                'lastName': loginLastName,
                'msId': loginMsId,
                'memberId': memberId,
                'groupId': groupId
            }
        }
        return {
            async: function() {
                return $http.post('/' + serviceType, jsonReq, config).then(function(response) {
                  return response.data;
                }, function(errResponse) {
                  // if(errResponse.status == -1){
                          //   console.log('Hi');  // window.location.reload();
                          //   window.open("http://google.com", "_blank"); // window.location.reload();
                          // }
                  console.error('Error while calling BEACH service');
                  return $q.reject(errResponse);
                });
            }
        };
    }
    return service;
}

angular.module('masterApp').service('serverGetReqSrv', serverGetReqSrv);
serverGetReqSrv.$inject = ['$http', '$q'];

function serverGetReqSrv($http, $q) {
    var service = {};

    service.send = function(serviceType) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return {
            async: function() {
                return $http.get('/' + serviceType, config).then(function(response) {
                    return response.data;
                }, function(errResponse) {
                    console.error('Error while calling BEACH service');
                    return $q.reject(errResponse);
                });
            }
        }
    }
    return service;

}
