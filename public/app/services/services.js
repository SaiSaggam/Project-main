angular.module('masterApp').factory('TimerService', TimerService);

TimerService.$inject = ['$log'];

function TimerService($log) {
    var start = new Date();
    var service = {};

    service.init = function() {
        start = new Date();
    }
    service.log = function(msg) {
        var diff = ((new Date()).getTime() - start.getTime()) / 1000
        $log.log(msg, ':', diff, 'seconds')
    }
    return service;
};

// angular.module('masterApp').factory('AppConfigService', AppConfigService);

// AppConfigService.$inject = ['$http'];

// function AppConfigService($http) {
//     var constants = {};

//     var service = {};

//     service.init = function() {
//         var promise = $http({
//             method: 'GET',
//             url: '/config/constants.json'
//         });
//         promise.success(function(data, status, headers, conf) {
//             constants = data.constants
//         });
//         return promise;
//     }

//     service.get = function(configName) {
//         return constants[configName];
//     }

//     return service;
// }
