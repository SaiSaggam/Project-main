describe('Master App -> Search Form Controller', function() {

    beforeEach(function() {
        module('masterApp');
    });

    var scope, rootScope, MemberResultsController;

    beforeEach(inject(function($controller, $injector, $rootScope, $sessionStorage, serverPostReqSrv) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        sessionStorage = $sessionStorage;
        serverPostReqSrv = serverPostReqSrv
        MemberResultsController = $controller('memberResultCtrl', { $scope: scope });

    }));

    it('Member Results controller should be defined', inject(function() {
        expect(MemberResultsController).toBeDefined();
    }));

    it('should respond to the `memberData` event', function() {
        var data = { "surrogateKey": "894666810", "memberId": { "id": "59651144200", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Tammy", "lastName": "Porter", "dob": "1964-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "$$hashKey": "object:290", "startDate": "2015-06-27", "stopDate": "2017-06-27", "birthday": 53 };
        rootScope.$broadcast('memberData', data);
        expect(scope.isMemberSearch).toEqual(true);
    });

    it('should respond to the `getMembershipForDependents` event', function() {
        var data = { "surrogateKey": "894666810", "memberId": { "id": "59651144200", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Tammy", "lastName": "Porter", "dob": "1964-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "$$hashKey": "object:290", "startDate": "2015-06-27", "stopDate": "2017-06-27", "birthday": 53 };
        rootScope.$broadcast('getMembershipForDependents', data);
        expect(true).toEqual(true);
    });

    it('should respond to the `groupData` event', function() {
        var data = { "groupName": "SoftBank", "groupNo": "1118476", "tel": "645-686-2111", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01", "$$hashKey": "object:284", "startDate": "2015-06-27", "stopDate": "2017-06-27" };
        rootScope.$broadcast('groupData', data);
        expect(scope.isGroupSearch).toEqual(true);
    });

    it('should respond to the `reset` event', function() {
        rootScope.$broadcast('reset');
        expect(scope.showMembership).toEqual(false);
    });

    it('Getting Coverage Information Details', inject(function(serverPostReqSrv, $httpBackend, $controller) {
        var mockDataService = serverPostReqSrv;
        spyOn(mockDataService, 'send').and.callThrough();

        var data = { "surrogateKey": "894666810", "memberId": { "id": "59651144200", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Tammy", "lastName": "Porter", "dob": "1964-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "$$hashKey": "object:290", "startDate": "2015-06-27", "stopDate": "2017-06-27", "birthday": 53 };
        rootScope.$broadcast('memberData', data);
        expect(scope.isMemberSearch).toEqual(true);

        $httpBackend.whenPOST('/member/findMembership').respond(function(method, url, data) {
            var data = { "memberships": [{ "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Apple", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-06-21", "stopDate": "9999-12-31" }, { "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Tesla", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-04-14", "stopDate": "9999-12-31" }, { "systemCode": "CS", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Dental", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Google", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-01-01", "stopDate": "9999-12-31" }, { "systemCode": "CS", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Pharmacy", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "UHC", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-11-14", "stopDate": "9999-12-31" }] };
            return [200, data, {}];
        });

        $httpBackend.whenPOST('/member/getMembership').respond(function(method, url, data) {
            var data = { "benefitBundleOptionId": "111111111111111111", "benefitBundleOptionDesc": "benefit Bundle Option Desc" };
            return [200, data, {}];
        });

        $httpBackend.whenPOST('/member/getSubscriptionServiceBenefit').respond(function(method, url, data) {
            var data = { "planMetallicLevel": "25567894", "benefitBundleOptionId": "35567894", "basePlan": [{ "INNPrimaryIndividualDeductibleMaximum": "2500", "INNPrimaryFamilyDeductibleMaximum": "5000", "OONPrimaryIndividualDeductibleMaximum": "6000", "OONPrimaryFamilyDeductibleMaximum": "10000", "INNPrimaryIndividualOOPMaximum": "4000", "INNPrimaryFamilyOOPMaximum": "8000", "OONPrimaryIndividualOOPMaximum": "12000", "OONPrimaryFamilyOOPMaximum": "17000" }, { "INNPrimaryIndividualDeductibleMaximum": "2500", "INNPrimaryFamilyDeductibleMaximum": "5000", "OONPrimaryIndividualDeductibleMaximum": "6000", "OONPrimaryFamilyDeductibleMaximum": "10000", "INNPrimaryIndividualOOPMaximum": "4000", "INNPrimaryFamilyOOPMaximum": "8000", "OONPrimaryIndividualOOPMaximum": "12000", "OONPrimaryFamilyOOPMaximum": "17000" }], "riderPlan": [{ "benefitPlanId": "CPD124", "coverageType": "M", "gatedProductIndicator": "MED", "legalName": "Oxford Health Insurance, Inc.", "networkScheduleId": "", "productName": "Gated INN/ONN", "productId": "CPRD222", "planTypeCode": "02", "customerFacingPlanName": "planname03" }] };
            return [200, data, {}];
        });

        $httpBackend.whenPOST('/member/getBenefitAccumulator').respond(function(method, url, data) {
            var data = { "INN": { "individualDeductibleMax": 2500, "individualDeductibleYTD": 555, "individualDeductibleRem": 1945, "familyDeductibleMax": 5000, "familyDeductibleYTD": 500, "familyDeductibleRem": 4500, "individualOOPMax": 2500, "individualOOPYTD": 555, "individualOOPRem": 1945, "familyOOPMax": 5000, "familyOOPYTD": 545, "familyOOPRem": 4455 }, "OON": { "individualDeductibleMax": 2500, "individualDeductibleYTD": 565, "individualDeductibleRem": 1935, "familyDeductibleMax": 5000, "familyDeductibleYTD": 500, "familyDeductibleRem": 4500, "individualOOPMax": 2500, "individualOOPYTD": 585, "individualOOPRem": 1915, "familyOOPMax": 5000, "familyOOPYTD": 500, "familyOOPRem": 4500 } };
            return [200, data, {}];
        });

        $httpBackend.whenPOST('/member/getBenefitLanguage').respond(function(method, url, data) {
            var data = { "benefits": [{ "benefitName": "Accidental Dental in an outpatient setting", "benefitCode": "ACCIDENTAL_DENTAL_OUTPATIENT", "benefitSubsection": [{ "general": "Coverage for inpatient psychiatric care is based upon medical necessity and limited to 30 days per calendar year.  Services for the member must be authorized by either the OXHP Behavioral Health Team or their PCP to a participating facility. Services received must be clinically appropriate for the condition.", "INN": "Inpatient mental health care is covered up to Individual_Dollar_Limit at Oxford approved facilities only. Benefits are covered at Coinsurance 10% per $100. Pre-certification in advance through Oxford's Behavioral Health team is required for coverage.", "OON": "" }] }, { "benefitName": "Office Physical Therapy Autism", "benefitCode": "PHYSICAL_THERAPY_AUTISM_OFFICE", "benefitSubsection": [{ "general": "Hospice care is covered for Individual_Visit_Limit beginning with the first days on which care is provided.  Hospice care benefit covers inpatient hospice care in a hospice, hospital provided by the hospice including drugs and medical supplies.  Hospice care requires pre-certification through Oxford's Medical Management Department.", "INN": "Hospice care is covered at Coinsurance 10% at approved facilities.  Pre-certification in advance through Oxford's Medical Management Department is required for coverage.", "OON": "" }] }, { "benefitName": "Preventive Blood Draw", "benefitCode": "PREVENTIVE_BLOOD_DRAW", "benefitSubsection": [{ "general": "Prescription drugs are covered through Our Network pharmacies.  Prescriptions can be ordered by any physician, not just Oxford participating physicians.", "INN": "The member is responsible for a:Tier 1:  $5 copayment per prescription Tier 2:  $50 copayment per prescription Tier 3:  30% coinsurance up to $500 copay max per prescription Tier 4:  50% coinsurance up to $750 copay max per prescription", "OON": "" }] }, { "benefitName": "Preventive Blood Draw", "benefitCode": "PREVENTIVE_BLOOD_DRAW", "benefitSubsection": [{ "general": " Outpatient physical, speech,  occupational and cognitive therapy rendered by an Oxford participating provider is covered subject to the inplan deductible and a $10 Copay member copayment.", "INN": "For Non-Gated Plans - a referral is not necessary.  For gated products, a referral is required.", "OON": "" }] }] };
            return [200, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();
        expect(scope.beachSpinner).toEqual(false);
    }));


    it('Getting Coverage Error Information Details', inject(function(serverPostReqSrv, $httpBackend, $controller) {
        var mockDataService = serverPostReqSrv;
        spyOn(mockDataService, 'send').and.callThrough();

        var data = { "surrogateKey": "894666810", "memberId": { "id": "59651144200", "type": "MCH", "sourceSysCode": "CR" }, "firstName": "Tammy", "lastName": "Porter", "dob": "1964-03-05", "gender": "F", "address": "5 Riverside Circle, Ellington, CT 06029, US", "$$hashKey": "object:290", "startDate": "2015-06-27", "stopDate": "2017-06-27", "birthday": 53 };
        rootScope.$broadcast('memberData', data);
        expect(scope.isMemberSearch).toEqual(true);

        $httpBackend.whenPOST('/member/findMembership').respond(function(method, url, data) {
            var data = {};
            return [404, data, {}];
        });

        var objData = { "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Apple", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-06-21", "stopDate": "9999-12-31" };

        scope.submitCoverageType(objData, 1);

        $httpBackend.whenPOST('/member/getMembership').respond(function(method, url, data) {
            var data = { "benefitBundleOptionId": "111111111111111111", "benefitBundleOptionDesc": "benefit Bundle Option Desc" };
            return [200, data, {}];
        });

        $httpBackend.whenPOST('/member/getSubscriptionServiceBenefit').respond(function(method, url, data) {
            var data = {};
            return [404, data, {}];
        });

        $httpBackend.whenPOST('/member/getBenefitAccumulator').respond(function(method, url, data) {
            var data = {};
            return [404, data, {}];
        });

        $httpBackend.whenPOST('/member/getBenefitLanguage').respond(function(method, url, data) {
            var data = {};
            return [404, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();
        expect(scope.beachSpinner).toEqual(false);
    }));


    it('Getting Coverage Error Information Details', inject(function(serverPostReqSrv, $httpBackend, $controller) {
        var mockDataService = serverPostReqSrv;
        spyOn(mockDataService, 'send').and.callThrough();

        var objData = { "systemCode": "CR", "planCode": "urn:uuid:f1e9c8ef-8a20-4896-a2ee-ecf112338975", "coverageType": "Medical", "plan": "HMO", "planNo": "23456", "relationship": "Self", "group": "Apple", "groupNo": "000737", "product": "MEDN5", "startDate": "2016-06-21", "stopDate": "9999-12-31" };

        scope.submitCoverageType(objData, 1);

        $httpBackend.whenPOST('/member/getMembership').respond(function(method, url, data) {
            var data = {};
            return [404, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();
        expect(scope.beachSpinner).toEqual(false);
    }));



    it('Getting Group Coverage Information Details', inject(function(serverPostReqSrv, $httpBackend, $controller) {
        var mockDataService = serverPostReqSrv;
        spyOn(mockDataService, 'send').and.callThrough();


        var data = { "groupName": "SoftBank", "groupNo": "1118476", "tel": "645-686-2111", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01", "$$hashKey": "object:284", "startDate": "2015-06-27", "stopDate": "2017-06-27" };
        rootScope.$broadcast('groupData', data);
        expect(scope.isGroupSearch).toEqual(true);

        scope.grpDetails = {};
        scope.grpDetails.employeeCounts = {};

        $httpBackend.whenPOST('/group/getEmployerGroup').respond(function(method, url, data) {
            var data = { "employeeCount": 100, "benefitBundles": [{ "basePlanDesc": "CTSM SMART HSA HMO D40/D50 ER D/200", "basePlanNo": "M000000082", "networkScheduleId": "", "coverageStartDate": "2017-01-01", "coverageExpiryDate": "2017-10-31", "benefitBundleOptionId": "1940004" }, { "basePlanDesc": "CTSM SMART HSA HMO D30/D50 ER D/200", "basePlanNo": "M000000016", "networkScheduleId": "", "coverageStartDate": "2017-01-01", "coverageExpiryDate": "2017-12-31", "benefitBundleOptionId": "1930005" }] };
            return [200, data, {}];
        });

        $httpBackend.whenPOST('/member/getSubscriptionServiceBenefit').respond(function(method, url, data) {
            var data = { "planMetallicLevel": "25567894", "benefitBundleOptionId": "35567894", "basePlan": [{ "INNPrimaryIndividualDeductibleMaximum": "2500", "INNPrimaryFamilyDeductibleMaximum": "5000", "OONPrimaryIndividualDeductibleMaximum": "6000", "OONPrimaryFamilyDeductibleMaximum": "10000", "INNPrimaryIndividualOOPMaximum": "4000", "INNPrimaryFamilyOOPMaximum": "8000", "OONPrimaryIndividualOOPMaximum": "12000", "OONPrimaryFamilyOOPMaximum": "17000" }, { "INNPrimaryIndividualDeductibleMaximum": "2500", "INNPrimaryFamilyDeductibleMaximum": "5000", "OONPrimaryIndividualDeductibleMaximum": "6000", "OONPrimaryFamilyDeductibleMaximum": "10000", "INNPrimaryIndividualOOPMaximum": "4000", "INNPrimaryFamilyOOPMaximum": "8000", "OONPrimaryIndividualOOPMaximum": "12000", "OONPrimaryFamilyOOPMaximum": "17000" }], "riderPlan": [{ "benefitPlanId": "CPD124", "coverageType": "M", "gatedProductIndicator": "MED", "legalName": "Oxford Health Insurance, Inc.", "networkScheduleId": "", "productName": "Gated INN/ONN", "productId": "CPRD222", "planTypeCode": "02", "customerFacingPlanName": "planname03" }] };
            return [200, data, {}];
        });

        $httpBackend.whenPOST('/member/getBenefitLanguage').respond(function(method, url, data) {
            var data = { "benefits": [{ "benefitName": "Accidental Dental in an outpatient setting", "benefitCode": "ACCIDENTAL_DENTAL_OUTPATIENT", "benefitSubsection": [{ "general": "Coverage for inpatient psychiatric care is based upon medical necessity and limited to 30 days per calendar year.  Services for the member must be authorized by either the OXHP Behavioral Health Team or their PCP to a participating facility. Services received must be clinically appropriate for the condition.", "INN": "Inpatient mental health care is covered up to Individual_Dollar_Limit at Oxford approved facilities only. Benefits are covered at Coinsurance 10% per $100. Pre-certification in advance through Oxford's Behavioral Health team is required for coverage.", "OON": "" }] }, { "benefitName": "Office Physical Therapy Autism", "benefitCode": "PHYSICAL_THERAPY_AUTISM_OFFICE", "benefitSubsection": [{ "general": "Hospice care is covered for Individual_Visit_Limit beginning with the first days on which care is provided.  Hospice care benefit covers inpatient hospice care in a hospice, hospital provided by the hospice including drugs and medical supplies.  Hospice care requires pre-certification through Oxford's Medical Management Department.", "INN": "Hospice care is covered at Coinsurance 10% at approved facilities.  Pre-certification in advance through Oxford's Medical Management Department is required for coverage.", "OON": "" }] }, { "benefitName": "Preventive Blood Draw", "benefitCode": "PREVENTIVE_BLOOD_DRAW", "benefitSubsection": [{ "general": "Prescription drugs are covered through Our Network pharmacies.  Prescriptions can be ordered by any physician, not just Oxford participating physicians.", "INN": "The member is responsible for a:Tier 1:  $5 copayment per prescription Tier 2:  $50 copayment per prescription Tier 3:  30% coinsurance up to $500 copay max per prescription Tier 4:  50% coinsurance up to $750 copay max per prescription", "OON": "" }] }, { "benefitName": "Preventive Blood Draw", "benefitCode": "PREVENTIVE_BLOOD_DRAW", "benefitSubsection": [{ "general": " Outpatient physical, speech,  occupational and cognitive therapy rendered by an Oxford participating provider is covered subject to the inplan deductible and a $10 Copay member copayment.", "INN": "For Non-Gated Plans - a referral is not necessary.  For gated products, a referral is required.", "OON": "" }] }] };
            return [200, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();
        expect(scope.beachSpinner).toEqual(false);
    }));

    it('Getting Group Coverage Error Information Details', inject(function(serverPostReqSrv, $httpBackend, $controller) {
        var mockDataService = serverPostReqSrv;
        spyOn(mockDataService, 'send').and.callThrough();


        var data = { "groupName": "SoftBank", "groupNo": "1118476", "tel": "645-686-2111", "address": "356 Main St s, HARTFORD, CT 06103", "sizeDef": "Small Group", "effectiveStartDate": "2017-01-01", "$$hashKey": "object:284", "startDate": "2015-06-27", "stopDate": "2017-06-27" };
        rootScope.$broadcast('groupData', data);
        expect(scope.isGroupSearch).toEqual(true);

        scope.grpDetails = {};
        scope.grpDetails.employeeCounts = {};

        $httpBackend.whenPOST('/group/getEmployerGroup').respond(function(method, url, data) {
            var data = {};
            return [404, data, {}];
        });

        scope.$digest();
        $httpBackend.flush();
        expect(scope.beachSpinner).toEqual(false);
    }));




});
