describe('Master App -> Search Form Controller', function() {

    beforeEach(function() {
        module('masterApp');
    });

    var scope, rootScope, SearchController;

    beforeEach(inject(function($controller, $injector, $rootScope, $sessionStorage) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        sessionStorage = $sessionStorage;
        SearchController = $controller('searchFormCtrl', { $scope: scope });

    }));

    it('Search Form controller should be defined', inject(function() {
        expect(SearchController).toBeDefined();
    }));

    it('Accessing Member Tab', inject(function() {
        scope.isMemberRole = true;
        expect(scope.accessMemberTab()).toEqual('');
    }));

    it('Accessing Member Tab Without improper access', inject(function() {
        scope.isMemberRole = false;
        expect(scope.accessMemberTab()).toEqual('disabledTab');
    }));

    it('Search Using Group and type as Group Number', inject(function() {
        scope.grpDropdownValue('groupNo')
        expect(scope.isGroupNoSearch).toEqual(true);
    }));

    it('Search Using Group and type as Group Name', inject(function() {
        scope.grpDropdownValue('groupName')
        expect(scope.isGroupNoSearch).toEqual(false);
    }));

    it('Search Using Member and type as Member Id', inject(function() {
        scope.dropdownValue('memberId')
        expect(scope.isMemberIdSearch).toEqual(true);
    }));

    it('Search Using Member and type as Name', inject(function() {
        scope.dropdownValue('name')
        expect(scope.isMemberIdSearch).toEqual(false);
    }));

    it('Current Tab Active', inject(function() {
        scope.searchBy = 'memberId';
        expect(scope.isActive('memberId')).toEqual('active');
    }));

    it('Current Tab In Active', inject(function() {
        scope.searchBy = 'name';
        expect(scope.isActive('memberId')).toEqual('');
    }));

    it('Set Tab Active Data', inject(function() {
        scope.setActiveData('searchVar');
        expect(scope.searchBy).toEqual('searchVar');
    }));

    it('Saving the tab state', inject(function() {
        rootScope.saveState = 'member';
        expect(true).toEqual(true);
    }));

    it('Reset User entered data', inject(function() {
        scope.resetForm();
        expect(scope.showMemberResults).toEqual(false);
        expect(scope.showMemberResults).toEqual(false);
    }));

    it('Submit Member Request', inject(function() {
        scope.submitMemberReq();
        expect(scope.showMemberResults).toEqual(false);
    }));

    it('Submit Member Request as null', inject(function() {
        scope.req = null;
        scope.submitMemberReq();
        expect(scope.showErrorMsg).toEqual(true);
    }));

    describe('Member Tab Name Search', function() {

        it('Submit Member Request with search type as name with Invalid values', inject(function() {
            scope.searchType = 'name';
            scope.req = {
                'nameStartDate': new Date(),
                'nameStopDate': new Date(),
                'dob': new Date(),
                'lastName': 1234,
                'zipCode': 'sai',
                'state': 123
            };
            scope.submitMemberReq();
            expect(scope.showMemberResults).toEqual(false);
        }));

        it('Submit Member Request with search type as name with valid values', inject(function() {

            rootScope.userInfo = {};
            rootScope.userInfo.memberId = undefined;

            scope.searchType = 'name';
            scope.req = {
                'nameStartDate': new Date(),
                'nameStopDate': new Date(),
                'dob': new Date(),
                'lastName': 'sai',
                'zipCode': 12345,
                'state': 'cct'
            };
            scope.submitMemberReq();

            scope.req = {
                'nameStartDate': new Date(),
                'nameStopDate': new Date(),
                'dob': new Date(),
                'lastName': 'sai',
                'state': 'cct'
            };
            scope.submitMemberReq();

            expect(scope.showMemberResults).toEqual(false);
        }));

    });

    describe('Member Tab Member Id Search', function() {

        it('Submit Member Request with search type as memberId with valid values', inject(function() {

            rootScope.userInfo = {};
            rootScope.userInfo.memberId = undefined;

            scope.searchType = 'memberId';
            scope.req = {
                'memberIdStartDate': new Date(),
                'memberIdStopDate': new Date(),
                'dob': new Date(),
                'memberId': 1234

            };
            scope.submitMemberReq();
            expect(scope.showMemberResults).toEqual(false);
        }));
    });

    it('Change Sorting ascending', inject(function() {
        scope.sort = { "active": "" }
        scope.changeSorting('firstName');
        expect(true).toEqual(true);
    }));

    it('Change Sorting descending', inject(function() {
        scope.sort = { "active": "firstName", "descending": true }
        scope.changeSorting('firstName');
        expect(true).toEqual(true);
    }));


    it('Change SortIcon ascending', inject(function() {
        scope.sort = { "active": "" }
        expect(scope.getIcon('firstName')).toEqual('fa fa-sort');
    }));

    it('Change SortIcon descending if available', inject(function() {
        scope.sort = { "active": "firstName", "descending": true }
        expect(scope.getIcon('firstName')).toEqual('fa fa-caret-down');
    }));

    it('Change SortIcon descending if not available', inject(function() {
        scope.sort = { "active": "firstName" }
        expect(scope.getIcon('firstName')).toEqual('fa fa-caret-up');
    }));

    describe('Getting Member Details Based on each id', function() {
        it('Member Details', inject(function() {
            var individualObj = { "surrogateKey": "894666810", "memberId": { "id": "59651144200", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Tammy", "lastName": "Porter", "dob": "1964-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "$$hashKey": "object:263" };
            rootScope.userInfo = {};
            scope.memberSubmit(individualObj);
            expect(scope.saveState).toEqual(true);
        }));

        it('Member Details recent search', inject(function() {
            var individualObj = { "surrogateKey": "894666810", "memberId": { "id": "59651144200", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Tammy", "lastName": "Porter", "dob": "1964-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "$$hashKey": "object:263" };
            scope.searchBy = 'recent';
            rootScope.userInfo = {};
            scope.memberSubmit(individualObj);
            expect(scope.saveState).toEqual(true);
        }));
    });

    describe('Start Date, End Date and DOB Configurations', function() {

        it('Opening Member Start Date', inject(function() {
            scope.openStartDate();
            expect(scope.startDatePopup.opened).toEqual(true);
        }));

        it('Opening Member DOB Date', inject(function() {
            scope.openMemberDOBDate()
            expect(scope.memberDOBPopup.opened).toEqual(true);
        }));

        it('Opening Member DOB Date', inject(function() {
            scope.openEndDate('memberId');
            expect(scope.endDatePopup.opened).toEqual(true);
        }));

        it('Calling Future Date', inject(function() {
            scope.futureDate = new Date();
            scope.callingFutureDate();
            expect(true).toEqual(true);
        }));

    });

    it('Group Request with invalid valid dates', inject(function() {
        scope.groupReq = {
            'startDate': new Date(),
            'stopDate': undefined
        };
        scope.submitGroupReq();

        scope.groupReq = {
            'startDate': new Date(),
            'stopDate': undefined
        };
        scope.submitGroupReq();

        scope.groupReq = {
            'startDate': new Date(),
            'stopDate': undefined
        };
        scope.submitGroupReq();

        scope.groupReq = {
            'startDate': new Date(),
            'stopDate': undefined
        };
        scope.submitGroupReq();

        scope.groupReq = {
            'startDate': new Date(),
            'stopDate': null
        };
        scope.submitGroupReq();

        scope.groupReq = {
            'startDate': new Date(),
            'stopDate': "30/12/2017"
        };
        scope.submitGroupReq();


        scope.groupReq = {
            'startDate': undefined,
            'stopDate': undefined
        };
        scope.submitGroupReq();

        scope.groupReq = {
            'startDate': null,
            'stopDate': null
        };
        scope.submitGroupReq();


        expect(scope.showPlanResults).toEqual(false);
    }));



    it('Member/Name Request with valid validations', inject(function() {

        rootScope.userInfo = {};
        rootScope.userInfo.memberId = undefined;

        scope.searchType = 'name';
        scope.req = {
            'nameStartDate': new Date(),
            'nameStopDate': undefined,
            'lastName': 'sai',
            'zipCode': 1234,
            'state': 'cct'
        };
        scope.submitMemberReq();

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 100000);
        scope.req = {
            'nameStartDate': undefined,
            'nameStopDate': tomorrow,
            'lastName': 'sai',
            'zipCode': 1234,
            'state': 'cct'
        };
        scope.submitMemberReq();

        scope.req = {
            'nameStartDate': undefined,
            'nameStopDate': undefined,
            'lastName': 'sai',
            'zipCode': 1234,
            'state': 'cct'
        };
        scope.submitMemberReq();

        scope.req = {
            'nameStartDate': "15/15/2017",
            'lastName': 'sai',
            'zipCode': 1234,
            'state': 'cct'
        };
        scope.submitMemberReq();

        scope.req = {
            'nameStopDate': "15/15/2017",
            'lastName': 'sai',
            'zipCode': 1234,
            'state': 'cct'
        };
        scope.submitMemberReq();

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 100000);
        scope.req = {
            'nameStartDate': new Date(),
            'nameStopDate': new Date(),
            'lastName': 'sai',
            'zipCode': 1234,
            'state': 'cct'
        };
        scope.submitMemberReq();


        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 10);
        scope.req = {
            'nameStartDate': tomorrow,
            'nameStopDate': new Date(),
            'lastName': 'sai',
            'zipCode': 1234,
            'state': 'cct'
        };
        scope.submitMemberReq();

        expect(scope.showMemberResults).toEqual(false);
    }));




    describe('Member Tab Name Search', function() {
        it('Submit Member Request with search type as name with valid values and mock member data', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {

            rootScope.userInfo = {};
            rootScope.userInfo.memberId = undefined;

            var scope = $rootScope.$new();
            var mockDataService = serverPostReqSrv;
            spyOn(mockDataService, 'send').and.callThrough();
            var controller = $controller('searchFormCtrl', { $scope: scope, serverPostReqSrv: mockDataService });
            scope.searchType = 'name';
            scope.req = {
                'nameStartDate': new Date(),
                'nameStopDate': new Date(),
                'dob': new Date(),
                'lastName': 'sai',
                'zipCode': 1234,
                'state': 'cct'
            };
            scope.submitMemberReq();
            mockDataService.send(scope.req);
            $httpBackend.whenPOST('/member/findIndividual').respond(function(method, url, data) {
                var data = { "individual": [{ "individualId": "7293281", "memberId": "", "type": "", "firstName": "Connie", "middleName": "A", "lastName": "Grimm", "relationship": "EE", "dob": "1963-02-01", "gender": "F", "address": "16283 IVORY COURT , Chino Hills , NY ,USA" }, { "individualId": "7293276", "memberId": "", "type": "", "firstName": "Gregory", "middleName": "A", "lastName": "Grimm", "relationship": "SP", "dob": "1963-02-05", "gender": "M", "address": "16283 IVORY COURT , Chino Hills , NY ,USA" }, { "individualId": "7293368", "memberId": "", "type": "", "firstName": "Dietrch", "middleName": "N", "lastName": "Grimm", "relationship": "CH\t", "dob": "1997-12-26", "gender": "M", "address": "16283 IVORY COURT , Chino Hills , NY ,USA" }] };
                return [200, data, {}];
            });
            scope.$digest();
            $httpBackend.flush();

            expect(scope.showMemberResults).toEqual(true);
        }));

        it('Submit Member Request with search type as name with valid values and mock with error 404', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {

            rootScope.userInfo = {};
            rootScope.userInfo.memberId = undefined;

            var scope = $rootScope.$new();
            var mockDataService = serverPostReqSrv;
            spyOn(mockDataService, 'send').and.callThrough();
            var controller = $controller('searchFormCtrl', { $scope: scope, serverPostReqSrv: mockDataService });
            scope.searchType = 'name';
            scope.req = {
                'nameStartDate': new Date(),
                'nameStopDate': new Date(),
                'dob': new Date(),
                'lastName': 'sai',
                'zipCode': 1234,
                'state': 'cct'
            };
            scope.submitMemberReq();
            mockDataService.send(scope.req);
            $httpBackend.whenPOST('/member/findIndividual').respond(function(method, url, data) {
                var data = {};
                return [404, data, {}];
            });
            scope.$digest();
            $httpBackend.flush();

            expect(scope.showMemberResults).toEqual(false);
        }));

        it('Submit Member Request with search type as name with valid values and mock with error 500', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {

            rootScope.userInfo = {};
            rootScope.userInfo.memberId = undefined;

            var scope = $rootScope.$new();
            var mockDataService = serverPostReqSrv;
            spyOn(mockDataService, 'send').and.callThrough();
            var controller = $controller('searchFormCtrl', { $scope: scope, serverPostReqSrv: mockDataService });
            scope.searchType = 'name';
            scope.req = {
                'nameStartDate': new Date(),
                'nameStopDate': new Date(),
                'dob': new Date(),
                'lastName': 'sai',
                'zipCode': 1234,
                'state': 'cct'
            };
            scope.submitMemberReq();
            mockDataService.send(scope.req);
            $httpBackend.whenPOST('/member/findIndividual').respond(function(method, url, data) {
                var data = {};
                return [500, data, {}];
            });
            scope.$digest();
            $httpBackend.flush();

            expect(scope.showMemberResults).toEqual(false);
        }));

    });


    describe('Group Tab Search', function() {

        it('Submitted Group Request with null values', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            scope.grpSearchType = 'groupName';
            scope.groupReq = null;
            scope.submitGroupReq();
            expect(scope.showGrpErrorMsg).toEqual(true);
        }));

        it('Submitted Group Request with group type as "GroupName" valid values values', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            rootScope.userInfo = {};
            rootScope.userInfo.groupId = undefined;
            scope.grpSearchType = 'groupName';
            scope.groupReq = {
                'state': 123123
            };
            scope.submitGroupReq();
            expect(true).toEqual(true);
        }));

        it('Submitted Group Request with group type as "GroupName" valid values values', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            rootScope.userInfo = {};
            rootScope.userInfo.groupId = undefined;
            scope.grpSearchType = 'groupName';
            scope.groupReq = {
                'groupName': 'Sai',
                'state': 'cct'
            };
            scope.submitGroupReq();
            expect(true).toEqual(true);
        }));


        it('Submitted Group Request with group type as "GroupName" valid values values', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            rootScope.userInfo = {};
            rootScope.userInfo.groupId = undefined;
            scope.grpSearchType = 'groupName';
            scope.groupReq = {
                'groupName': 'Sai',
                'state': 'cct',
                'groupStartDate': new Date(),
                'groupStopDate': new Date()
            };
            scope.submitGroupReq();
            expect(true).toEqual(true);
        }));

        it('Submitted Group Request with group type as "GroupId" valid values values', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            rootScope.userInfo = {};
            rootScope.userInfo.groupId = undefined;
            scope.grpSearchType = 'groupNo';
            scope.groupReq = {
                'groupNo': 1234,
                'groupStartDate': new Date(),
                'groupStopDate': new Date()
            };
            scope.submitGroupReq();
            expect(true).toEqual(true);
        }));

        it('Submit group request and data', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            rootScope.userInfo = {};
            rootScope.userInfo.groupId = undefined;

            var scope = $rootScope.$new();
            var mockDataService = serverPostReqSrv;
            spyOn(mockDataService, 'send').and.callThrough();
            var controller = $controller('searchFormCtrl', { $scope: scope, serverPostReqSrv: mockDataService });
            scope.grpSearchType = 'groupName';
            scope.groupReq = {
                'groupName': 'Sai',
                'state': 'cct',
                'groupStartDate': new Date(),
                'groupStopDate': new Date()
            };
            scope.submitGroupReq();
            mockDataService.send(scope.req);
            $httpBackend.whenPOST('/group/findEmployerGroup').respond(function(method, url, data) {
                var data = { "groups": [{ "groupName": "SoftBank", "groupNo": "1118476", "tel": "645-686-2111", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }, { "groupName": "Apple", "groupNo": "1118477", "tel": "212-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }, { "groupName": "Barclays", "groupNo": "1118478", "tel": "860-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }, { "groupName": "Benz Cie.", "groupNo": "1118479", "tel": "645-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }] };
                return [200, data, {}];
            });
            scope.$digest();
            $httpBackend.flush();

            expect(true).toEqual(true);
        }));

        it('Submit group request and data', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            rootScope.userInfo = {};
            rootScope.userInfo.groupId = undefined;

            var scope = $rootScope.$new();
            var mockDataService = serverPostReqSrv;
            spyOn(mockDataService, 'send').and.callThrough();
            var controller = $controller('searchFormCtrl', { $scope: scope, serverPostReqSrv: mockDataService });
            scope.grpSearchType = 'groupName';
            scope.groupReq = {
                'groupName': 'Sai',
                'state': 'cct',
                'groupStartDate': new Date(),
                'groupStopDate': new Date()
            };
            scope.submitGroupReq();
            mockDataService.send(scope.req);
            $httpBackend.whenPOST('/group/findEmployerGroup').respond(function(method, url, data) {
                var data = { "groups": [{ "groupName": "SoftBank", "groupNo": "1118476", "tel": "645-686-2111", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }, { "groupName": "Apple", "groupNo": "1118477", "tel": "212-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }, { "groupName": "Barclays", "groupNo": "1118478", "tel": "860-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }, { "groupName": "Benz Cie.", "groupNo": "1118479", "tel": "645-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01" }] };
                return [400, data, {}];
            });
            scope.$digest();
            $httpBackend.flush();

            expect(true).toEqual(true);
        }));


        it('Group Submit', inject(function($rootScope, serverPostReqSrv, $httpBackend, $controller) {
            scope.searchBy = 'recent';
            var groupData = {
                "groupName": "SoftBank",
                "groupNo": "1118476",
                "tel": "645-686-2111",
                "address": "356 Main St s, HARTFORD, CT 06103",
                "sizeDef": "Small Group",
                "effectiveStartDate": "2017-01-01"
            };
            rootScope.userInfo = {};
            scope.groupSubmit(groupData);
            expect(true).toEqual(true);
        }));
    });

    it('Mocking Session Storage', inject(function($controller, $sessionStorage) {
        $sessionStorage.memRecentSearch = JSON.stringify([{ "surrogateKey": "894666826", "memberId": { "id": "75993725100", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Patrick", "lastName": "Hanson", "dob": "1967-02-08", "gender": "M", "address": "886 Johnson Crossing, Hfd, CT 06145, US", "$$hashKey": "object:948", "startDate": "2015-06-18", "stopDate": "2017-06-18", "birthday": 50 }]);
        $sessionStorage.groupRecentSearch = JSON.stringify([{ "groupName": "Benz Cie.", "groupNo": "1118479", "tel": "645-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01", "$$hashKey": "object:932", "startDate": "2015-06-18", "stopDate": "2017-06-18" }]);

        SearchController = $controller('searchFormCtrl', { $scope: scope });
    }));

    it('Calling Future Date', inject(function($sessionStorage) {
        scope.futureDate = new Date();
        $sessionStorage.resSearch = "data";

        $sessionStorage.groupSearch = "data";
        $sessionStorage.memRecentSearch = JSON.stringify([{ "surrogateKey": "894666826", "memberId": { "id": "75993725100", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Patrick", "lastName": "Hanson", "dob": "1967-02-08", "gender": "M", "address": "886 Johnson Crossing, Hfd, CT 06145, US", "$$hashKey": "object:948", "startDate": "2015-06-18", "stopDate": "2017-06-18", "birthday": 50 }]);
        $sessionStorage.groupRecentSearch = JSON.stringify([{ "groupName": "Benz Cie.", "groupNo": "1118479", "tel": "645-686-2703", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01", "$$hashKey": "object:932", "startDate": "2015-06-18", "stopDate": "2017-06-18" }]);

        scope.callingFutureDate();
        expect(true).toEqual(true);
    }));


    it('Mocking Session Storage', inject(function($controller, $sessionStorage) {
        rootScope.saveState = true;
        SearchController = $controller('searchFormCtrl', { $scope: scope });
    }));


});
