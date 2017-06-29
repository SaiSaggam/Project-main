angular.module("masterApp", ['ngStorage', 'ui.bootstrap', 'angular-table', 'ngAnimate', 'angularSpinner'])
    .config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
        usSpinnerConfigProvider.setDefaults({ color: '#196ECF' });
    }])
    .run();
