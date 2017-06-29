/************************************************/
/************ Sliding Directive ***********/
/************************************************/


angular.module("masterApp").directive('slideToggle', function() {
    return {
        restrict: 'AE',
        scope: {
            isOpen: "=slideToggle"
        },
        link: function(scope, element, attr) {
            var slideDuration = parseInt(attr.slideToggleDuration, 10) || 250;
            scope.$watch('isOpen', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    element.stop().slideToggle(slideDuration);
                }
            });
        }
    };
});
