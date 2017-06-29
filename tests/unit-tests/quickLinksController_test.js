// 'use strict';
// describe('Master App -> Quick Links', function() {
//     beforeEach(function() {
//         module('masterApp');
//     });
//     describe('Controller Definition Check', function() {
//         it('Quick Links controller should be defined', inject(function($controller, $rootScope) {
//             var scope = $rootScope.$new();
//             var quickLinkCtrl = $controller('quickLinksCtrl', { $scope: scope });
//             expect(quickLinkCtrl).toBeDefined();
//         }));
//     });
//     describe('Add new quick links items', function() {
//         it('To Open a new quicklinks add field', inject(function($controller, $rootScope) {
//             var $scope = $rootScope.$new();
//             var controller = $controller('quickLinksCtrl', { $scope: $scope });
//             var item = {};
//             $scope.addFields(item);
//         }));
//         it('To Open a new quicklinks add field with form Data', inject(function($controller, $rootScope) {
//             var $scope = $rootScope.$new();
//             var controller = $controller('quickLinksCtrl', { $scope: $scope });
//             var item = {
//                 "id": "111",
//                 "user": "user1",
//                 "links": [
//                     { title: 'Knowledge Library', url: 'http://kl/bboard.aspx' },
//                     { title: 'myuhc.com', url: 'https://www.myuhc.com/member/prewelcome.do?currentLanguageFromPreCheck=en' },
//                     { title: 'At Your Service (AYS)', url: 'http://helpdesk.uhg.com/At_Your_Service/Pages/default.aspx' },
//                     { title: 'MyCoach', url: 'https://svckmtmp2.uhc.com/eAgent/iq/ACME/request.do?create=kb:UHG' },
//                     { title: 'ANA', url: 'https://svckmtmp3.uhc.com/eAgent/iq/KM/request.do?create=kb:OAdminCall' },
//                     { title: 'RX Link', url: 'TBD' },
//                     { title: 'WebCSA', url: 'http://oxfcsaapps.oxhp.com/WEBCSA-AF/web/controller/Home.webcsa' },
//                     { title: 'iCARE(new Appeals & Grievances System)', url: 'http://icare.uhc.com/prweb/PRServletCustom' }
//                 ]
//             };
//             $scope.addFields(item);
//         }));
//     });
//     describe('Delete quick links items', function() {
//         it('To Delete a quick link item', inject(function($controller, $rootScope) {
//             var $scope = $rootScope.$new();
//             var controller = $controller('quickLinksCtrl', { $scope: $scope });
//             var item = {
//                 "id": "111",
//                 "user": "user1",
//                 "links": [
//                     { title: 'Knowledge Library', url: 'http://kl/bboard.aspx' },
//                     { title: 'myuhc.com', url: 'https://www.myuhc.com/member/prewelcome.do?currentLanguageFromPreCheck=en' },
//                     { title: 'At Your Service (AYS)', url: 'http://helpdesk.uhg.com/At_Your_Service/Pages/default.aspx' },
//                     { title: 'MyCoach', url: 'https://svckmtmp2.uhc.com/eAgent/iq/ACME/request.do?create=kb:UHG' },
//                     { title: 'ANA', url: 'https://svckmtmp3.uhc.com/eAgent/iq/KM/request.do?create=kb:OAdminCall' },
//                     { title: 'RX Link', url: 'TBD' },
//                     { title: 'WebCSA', url: 'http://oxfcsaapps.oxhp.com/WEBCSA-AF/web/controller/Home.webcsa' },
//                     { title: 'iCARE(new Appeals & Grievances System)', url: 'http://icare.uhc.com/prweb/PRServletCustom' }
//                 ]
//             };
//             $scope.deleteRow(1, item);
//         }));
//     });
//     describe('Save newly added quick links', function() {
//         it('Adding a newly added quick links', inject(function($controller, $rootScope) {
//             var $scope = $rootScope.$new();
//             var controller = $controller('quickLinksCtrl', { $scope: $scope });
//             var item = {
//                 "id": "111",
//                 "user": "user1",
//                 "links": [
//                     { title: 'Knowledge Library', url: 'http://kl/bboard.aspx' },
//                     { title: 'myuhc.com', url: 'https://www.myuhc.com/member/prewelcome.do?currentLanguageFromPreCheck=en' },
//                     { title: 'At Your Service (AYS)', url: 'http://helpdesk.uhg.com/At_Your_Service/Pages/default.aspx' },
//                     { title: 'MyCoach', url: 'https://svckmtmp2.uhc.com/eAgent/iq/ACME/request.do?create=kb:UHG' },
//                     { title: 'ANA', url: 'https://svckmtmp3.uhc.com/eAgent/iq/KM/request.do?create=kb:OAdminCall' },
//                     { title: 'RX Link', url: 'TBD' },
//                     { title: 'WebCSA', url: 'http://oxfcsaapps.oxhp.com/WEBCSA-AF/web/controller/Home.webcsa' },
//                     { title: 'iCARE(new Appeals & Grievances System)', url: 'http://icare.uhc.com/prweb/PRServletCustom' }
//                 ]
//             };
//             $scope.submit(item);
//         }));
//     });
//     describe('Reset Quick links Section', function() {
//         it('Reset Quick links form', inject(function($controller, $rootScope) {
//             var $scope = $rootScope.$new();
//             var controller = $controller('quickLinksCtrl', { $scope: $scope });
//             $scope.Cancel();
//         }));
//     });
// });
