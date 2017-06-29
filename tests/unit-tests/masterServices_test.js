describe('Master App -> Server Post Request which sends client reques to server/backend for oil response', function() {
        var serverPostReqSrv, httpBackend;
        beforeEach(module("masterApp"));
        beforeEach(inject(function(_serverPostReqSrv_, _$httpBackend_, $rootScope) {
            serverPostReqSrv = _serverPostReqSrv_;
            httpBackend = _$httpBackend_;
            rootScope = $rootScope;
            scope = $rootScope.$new();
        }));

        it("Should Call serverPostReqSrv to get the Member Details Data", function() {
            var userObj = {};
            userObj.firstName = "Sai";
            userObj.lastName = "Saggam";
            userObj.msid = 123345;
            userObj.memberId = 12345;
            userObj.groupId = 123;
            rootScope.userInfo = userObj;
            var jsonData = {
                "activeAsOf": "",
                "dob": "",
                "firstName": "",
                "lastName": "grimm",
                "memberId": "",
                "state": "mn",
                "zipCode": ""
            };
            httpBackend.whenPOST('/testFindIndPost').respond(200, {
                data: { "activeAsOf": "", "dob": "", "firstName": "", "lastName": "grimm", "memberId": "", "state": "mn", "zipCode": "" }
            });
            serverPostReqSrv.send("testFindIndPost", jsonData).async().then(function(d) {});
            scope.$digest();
            httpBackend.flush();
        });

        it("Should Call serverPostReqSrv needs to fail", function() {
            var jsonData = {
                "activeAsOf": "",
                "dob": "",
                "firstName": "",
                "lastName": "grimm",
                "memberId": "",
                "state": "mn",
                "zipCode": ""
            };
            httpBackend.whenPOST('/testFindIndPost').respond(function(method, url, data) {
                var data = { "errors": "Some Error Has Been Happened" };
                return [404, data, {}];
            });
            serverPostReqSrv.send("testFindIndPost", jsonData).async().then(function(d) {
                expect(d.data).toEqual({ "errors": "Some Error Has Been Happened" });
            });
            httpBackend.flush();
        });
    })
    // describe('TimerService', function() {
    //     var params;
    //     beforeEach(module('masterApp'));
    //     beforeEach(inject(function(_TimerService_) {
    //         TimerService = _TimerService_;
    //     }));
    //     it('Should ', function() {
    //         TimerService.log('msg');
    //     });
    // });
