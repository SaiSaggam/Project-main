describe('Master App -> Master Controller', function() {

    beforeEach(function() {
        module('masterApp');
    });

    var scope, rootScope, MasterCtrl;

    beforeEach(inject(function($controller, $injector, $rootScope, serverPostReqSrv) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        serverPostReqSrv = serverPostReqSrv;
        MasterCtrl = $controller('masterCtrl', { $scope: scope, serverPostReqSrv: serverPostReqSrv });

    }));

    it('Getting Family Link Details', inject(function(serverPostReqSrv, $httpBackend, $controller) {
        var mockDataService = serverPostReqSrv;
        spyOn(mockDataService, 'send').and.callThrough();
        var req = { "groupNo": "000737", "effectiveDate": "2016-06-21" };

        var memberDetails = { "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Apple", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-06-21", "stopDate": "9999-12-31" };
        rootScope.$broadcast('getMemberFamilyDetails', memberDetails);

        // scope.submitMemberReq();

        $httpBackend.whenGET('/partials/myModalContent.ejs').respond(200, '<div class="search-modal"></div>');

        mockDataService.send(req);

        var quicklinksData = { "_id": "589a41392ce0f7de5c7dbc0e", "user": "", "link_id": "1", "links": [{ "title": "Knowledge Library", "url": "http://kl/bboard.aspx", "id": false }, { "title": "myuhc.com", "url": "https://www.myuhc.com/member/prewelcome.do?currentLanguageFromPreCheck=en", "id": false }, { "title": "At Your Service (AYS)", "url": "http://helpdesk.uhg.com/At_Your_Service/Pages/default.aspx", "id": false }, { "title": "MyCoach", "url": "https://svckmtmp2.uhc.com/eAgent/iq/ACME/request.do?create=kb:UHG", "id": false }, { "title": "ANA", "url": "https://svckmtmp3.uhc.com/eAgent/iq/KM/request.do?create=kb:OAdminCall", "id": false }, { "title": "RX Link", "url": "TBD", "id": false }, { "title": "WebCSA", "url": "http://oxfcsaapps.oxhp.com/WEBCSA-AF/web/controller/Home.webcsa", "id": false }, { "title": "iCARE(new Appeals & Grievances System)", "url": "http://icare.uhc.com/prweb/PRServletCustom", "id": false }] };
        $httpBackend.whenGET('/quicklinks/getQuickLinks').respond(function(method, url, data) {
            var data = quicklinksData;
            return [200, quicklinksData, {}];
        });



        $httpBackend.whenPOST('/member/getMemberFamily').respond(function(method, url, data) {
            var data = [{ "surrogateKey": "894666810", "memberId": { "id": "59651144201", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Alan", "lastName": "Porter", "dob": "1999-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "relationship": "Spouse" }, { "surrogateKey": "894666811", "memberId": { "id": "59651144202", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Melissa", "lastName": "Porter", "dob": "2007-03-05", "gender": "F", "address": "49737 Hoard Way, Melrose, CT 06016, US", "relationship": "Child" }, { "surrogateKey": "894666812", "memberId": { "id": "59651144203", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Sarah", "lastName": "Porter", "dob": "2015-03-05", "gender": "M", "address": "5 Riverside Circle, Ellington, CT 06029, US", "relationship": "Child" }];
            return [200, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();
        expect(scope.familyError).toEqual(false);
    }));

    it('Getting Family Link Details Error', inject(function(serverPostReqSrv, $httpBackend, $controller) {
        var mockDataService = serverPostReqSrv;
        spyOn(mockDataService, 'send').and.callThrough();
        var req = { "groupNo": "000737", "effectiveDate": "2016-06-21" };

        var memberDetails = { "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Apple", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-06-21", "stopDate": "9999-12-31" };
        rootScope.$broadcast('getMemberFamilyDetails', memberDetails);

        var quicklinksData = { "_id": "589a41392ce0f7de5c7dbc0e", "user": "", "link_id": "1", "links": [{ "title": "Knowledge Library", "url": "http://kl/bboard.aspx", "id": false }, { "title": "myuhc.com", "url": "https://www.myuhc.com/member/prewelcome.do?currentLanguageFromPreCheck=en", "id": false }, { "title": "At Your Service (AYS)", "url": "http://helpdesk.uhg.com/At_Your_Service/Pages/default.aspx", "id": false }, { "title": "MyCoach", "url": "https://svckmtmp2.uhc.com/eAgent/iq/ACME/request.do?create=kb:UHG", "id": false }, { "title": "ANA", "url": "https://svckmtmp3.uhc.com/eAgent/iq/KM/request.do?create=kb:OAdminCall", "id": false }, { "title": "RX Link", "url": "TBD", "id": false }, { "title": "WebCSA", "url": "http://oxfcsaapps.oxhp.com/WEBCSA-AF/web/controller/Home.webcsa", "id": false }, { "title": "iCARE(new Appeals & Grievances System)", "url": "http://icare.uhc.com/prweb/PRServletCustom", "id": false }] };
        $httpBackend.whenGET('/quicklinks/getQuickLinks').respond(function(method, url, data) {
            var data = quicklinksData;
            return [200, quicklinksData, {}];
        });

        // scope.submitMemberReq();

        $httpBackend.whenGET('/partials/myModalContent.ejs').respond(200, '<div class="search-modal"></div>');

        mockDataService.send(req);

        $httpBackend.whenPOST('/member/getMemberFamily').respond(function(method, url, data) {
            var data = {};
            return [400, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();
        expect(scope.familyError).toEqual(true);
    }));

    it('Getting Quick Link Details', inject(function($rootScope, serverGetReqSrv, $httpBackend, $controller) {
        var scope = $rootScope.$new();
        $httpBackend.whenGET('/partials/myModalContent.ejs').respond(200, '<div class="search-modal"></div>');
        var quicklinksData = { "_id": "589a41392ce0f7de5c7dbc0e", "user": "", "link_id": "1", "links": [{ "title": "Knowledge Library", "url": "http://kl/bboard.aspx", "id": false }, { "title": "myuhc.com", "url": "https://www.myuhc.com/member/prewelcome.do?currentLanguageFromPreCheck=en", "id": false }, { "title": "At Your Service (AYS)", "url": "http://helpdesk.uhg.com/At_Your_Service/Pages/default.aspx", "id": false }, { "title": "MyCoach", "url": "https://svckmtmp2.uhc.com/eAgent/iq/ACME/request.do?create=kb:UHG", "id": false }, { "title": "ANA", "url": "https://svckmtmp3.uhc.com/eAgent/iq/KM/request.do?create=kb:OAdminCall", "id": false }, { "title": "RX Link", "url": "TBD", "id": false }, { "title": "WebCSA", "url": "http://oxfcsaapps.oxhp.com/WEBCSA-AF/web/controller/Home.webcsa", "id": false }, { "title": "iCARE(new Appeals & Grievances System)", "url": "http://icare.uhc.com/prweb/PRServletCustom", "id": false }] };
        $httpBackend.whenGET('/quicklinks/getQuickLinks').respond(function(method, url, data) {
            var data = quicklinksData;
            return [200, quicklinksData, {}];
        });

        scope.$digest();
        $httpBackend.flush();

    }));

    it('Getting Quick Link Details', inject(function($rootScope, serverGetReqSrv, $httpBackend, $controller) {
        var scope = $rootScope.$new();
        $httpBackend.whenGET('/partials/myModalContent.ejs').respond(200, '<div class="search-modal"></div>');
        var quicklinksData = { "_id": "589a41392ce0f7de5c7dbc0e", "user": "", "link_id": "1", "links": [{ "title": "Knowledge Library", "url": "http://kl/bboard.aspx", "id": false }, { "title": "myuhc.com", "url": "https://www.myuhc.com/member/prewelcome.do?currentLanguageFromPreCheck=en", "id": false }, { "title": "At Your Service (AYS)", "url": "http://helpdesk.uhg.com/At_Your_Service/Pages/default.aspx", "id": false }, { "title": "MyCoach", "url": "https://svckmtmp2.uhc.com/eAgent/iq/ACME/request.do?create=kb:UHG", "id": false }, { "title": "ANA", "url": "https://svckmtmp3.uhc.com/eAgent/iq/KM/request.do?create=kb:OAdminCall", "id": false }, { "title": "RX Link", "url": "TBD", "id": false }, { "title": "WebCSA", "url": "http://oxfcsaapps.oxhp.com/WEBCSA-AF/web/controller/Home.webcsa", "id": false }, { "title": "iCARE(new Appeals & Grievances System)", "url": "http://icare.uhc.com/prweb/PRServletCustom", "id": false }] };

        $httpBackend.whenGET('/quicklinks/getQuickLinks').respond(function(method, url, data) {
            var data = {};
            return [400, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();

    }));

    it('should respond to the `resource-loaded` event', function() {
        var data = {
            type: 'listing',
            id: 1
        };
        rootScope.$broadcast('memberData', data);
        expect(scope.isOpenPanel).toEqual(true);
    });


    it('should respond to the `reset` event', function() {
        rootScope.$broadcast('reset');
        expect(scope.showUserName).toEqual(false);
    });

    it('should respond to the `groupData` event', function() {
        var data = {
            type: 'listing',
            id: 1
        };
        rootScope.$broadcast('groupData', data);
        expect(scope.isGroupOpenPanel).toEqual(true);
    });

    // it('should respond to the `sendMemberDependentDetails` event', function() {
    //     var data = {
    //         type: 'listing',
    //         id: 1,
    //         memberFamily: "abc"
    //     };
    //     rootScope.$broadcast('sendMemberDependentDetails', data);
    //     expect(scope.showMemberDepedentDetails).toEqual(true);
    // });

    // it('should respond to the `dependentLoading` event', function() {
    //     rootScope.$broadcast('dependentLoading');
    //     expect(scope.showMemberDepedentSpinner).toEqual(true);
    // });

    // it('should respond to the `dependentLoadingfalse` event', function() {
    //     rootScope.$broadcast('dependentLoadingfalse');
    //     expect(scope.showMemberDepedentSpinner).toEqual(false);
    // });

    it('Master Controller should be defined', inject(function() {
        expect(MasterCtrl).toBeDefined();
    }));

    it('Member Info Open hiding', inject(function() {
        scope.isOpenPanel = false;
        scope.toggleOpen();
        expect(scope.isOpenPanel).toEqual(true);
    }));

    it('Rider information Open hiding', inject(function() {
        scope.isRiderInfo = false;
        scope.showRiderInfo();
        expect(scope.isRiderInfo).toEqual(true);
    }));

    it('Group information Open hiding', inject(function() {
        scope.isOpenMemberInfo = false;
        scope.showMemberInfo();
        expect(scope.isOpenMemberInfo).toEqual(true);
    }));

    it('Show Group information', inject(function() {
        scope.isOpenGroupInfo = false;
        scope.showGroupInfo();
        expect(scope.isOpenGroupInfo).toEqual(true);
    }));

    // it('Show Rider information', inject(function() {
    //     scope.isRiderGroupInfo = false;
    //     scope.showGroupRiderInfo();
    //     expect(scope.isRiderGroupInfo).toEqual(true);
    // }));

    it('Show Rider information', inject(function() {
        scope.openAdmin();
        expect(scope.isAdminPage).toEqual(true);
    }));

    it('Group Open', inject(function() {
        scope.isGroupOpenPanel = false;
        scope.toggleGroupOpen();
        expect(scope.isGroupOpenPanel).toEqual(true);
    }));

    it('Show Out Of Pocket', inject(function() {
        scope.isOOPInfo = false;
        scope.showOOPInfo();
        expect(scope.isOOPInfo).toEqual(true);
    }));

    it('Membership dependents', inject(function() {
        var individualDetails = { "surrogateKey": "894666810", "memberId": { "id": "59651144201", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Alan", "lastName": "Porter", "dob": "1999-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "relationship": "Spouse", "$$hashKey": "object:5674" };
        scope.getMembershipForDependents(individualDetails);
        expect(scope.indvDetails).toEqual(individualDetails);
    }));

    it('Setting User Role', inject(function() {
        var userRoleDate = { "firstName": "Local", "lastName": "Env", "userRole": { "isAdmin": true, "isMember": true } };
        scope.retrieveUserRole(JSON.stringify(userRoleDate));
        expect(scope.isAdminRole).toEqual(true);
    }));

    it('Closing Admin Page', inject(function() {
        scope.closeAdminPage();
        expect(scope.isAdminPage).toEqual(false);
    }));

    it('Open Quick Links modal', inject(function() {
        var docType = "SOS"
        scope.openQuickLinksModal(docType);
        expect(true).toEqual(true);
    }));

    it('Retriving family details', inject(function() {
        var memberDetails = { "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Apple", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-06-21", "stopDate": "9999-12-31" };
        rootScope.$broadcast('getMemberFamilyDetails', memberDetails);
        expect(scope.showMemberDepedentDetails).toEqual(true);
    }));

    it('Retriving Query Group Information', inject(function() {
        var groupInfo = "{}";
        scope.retrieveQueryGroupInfo(groupInfo);
        expect(true).toEqual(true);
    }));

    // it('Getting Family Link Details', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
    //     var scope = $rootScope.$new();
    //     var mockDataService = serverPostReqSrv;
    //     spyOn(mockDataService, 'send').and.callThrough();
    //     var controller = $controller('masterCtrl', { $scope: scope, serverPostReqSrv: mockDataService });
    //     var req = { "groupNo": "000737", "effectiveDate": "2016-06-21" };

    //     var memberDetails = { "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Apple", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-06-21", "stopDate": "9999-12-31" };
    //     rootScope.$broadcast('getMemberFamilyDetails', memberDetails);

    //     // scope.submitMemberReq();
    //     mockDataService.send(req);
    //     $httpBackend.whenPOST('/member/getMemberFamily').respond(function(method, url, data) {
    //         var data = [{ "surrogateKey": "894666810", "memberId": { "id": "59651144201", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Alan", "lastName": "Porter", "dob": "1999-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "relationship": "Spouse" }, { "surrogateKey": "894666811", "memberId": { "id": "59651144202", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Melissa", "lastName": "Porter", "dob": "2007-03-05", "gender": "F", "address": "49737 Hoard Way, Melrose, CT 06016, US", "relationship": "Child" }, { "surrogateKey": "894666812", "memberId": { "id": "59651144203", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Sarah", "lastName": "Porter", "dob": "2015-03-05", "gender": "M", "address": "5 Riverside Circle, Ellington, CT 06029, US", "relationship": "Child" }];
    //         return [200, data, {}];
    //     });
    //     // scope.$digest();/
    //     // $httpBackend.flush();
    //     expect(scope.familyError).toEqual(false);
    // }));
});
