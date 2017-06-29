var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

// console.log('server.y is ' + server.y);
chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

var URL = "/member/getSubscriptionServiceBenefit";
function setupTestData (benefitBundleOptionId,startDate,stopDate){
    this.benefitBundleOptionId = benefitBundleOptionId;
    this.startDate = startDate;
    this.stopDate = stopDate;
}
describe('getSubscriptionbenefitService', function() {

    it('Test success response property Names: - planMetallicLevel,benefitBundleOptionId,basePlan,riderPlan', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('planMetallicLevel');
                res.body.should.have.property('benefitBundleOptionId');
                res.body.should.have.property('basePlan');
                res.body.should.have.property('riderPlan');
                done();
            });
    });
    it('Test success response property Name: - basePlan information', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('INNPrimaryIndividualDeductibleMaximum');
                basename.should.have.property('INNPrimaryFamilyDeductibleMaximum');
                basename.should.have.property('OONPrimaryIndividualDeductibleMaximum');
                basename.should.have.property('OONPrimaryFamilyDeductibleMaximum');
                basename.should.have.property('INNPrimaryIndividualOOPMaximum');
                basename.should.have.property('INNPrimaryFamilyOOPMaximum');
                basename.should.have.property('OONPrimaryIndividualOOPMaximum');
                basename.should.have.property('OONPrimaryFamilyOOPMaximum');
                done();
            });
    });

    it('Test success response property Name: - basePlan INNPrimaryIndividualDeductibleMaximum', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('INNPrimaryIndividualDeductibleMaximum');
                done();
            });
    });

    it('Test success response property Name: - basePlan INNPrimaryFamilyDeductibleMaximum', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('INNPrimaryFamilyDeductibleMaximum');
                done();
            });
    });

    it('Test success response property Name: - basePlan OONPrimaryIndividualDeductibleMaximum', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('OONPrimaryIndividualDeductibleMaximum');
                done();
            });
    });

    it('Test success response property Name: - basePlan OONPrimaryFamilyDeductibleMaximum', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('OONPrimaryFamilyDeductibleMaximum');
                done();
            });
    });


    it('Test success response property Name: - basePlan INNPrimaryIndividualOOPMaximum', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('INNPrimaryIndividualOOPMaximum');
                done();
            });
    });



    it('Test success response property Name: - basePlan OONPrimaryIndividualOOPMaximum', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('OONPrimaryIndividualOOPMaximum');
                done();
            });
    });


    it('Test success response property Name: - basePlan OONPrimaryFamilyOOPMaximum', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('basePlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.basePlan;
                basename.should.have.property('OONPrimaryFamilyOOPMaximum');
                done();
            });
    });


    it('Test success response property Name: - riderPlan information ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('benefitPlanId');
                basename[0].should.have.property('coverageType');
                basename[0].should.have.property('gatedProductIndicator');
                basename[0].should.have.property('legalName');
                basename[0].should.have.property('networkScheduleId');
                basename[0].should.have.property('productName');
                basename[0].should.have.property('productId');
                basename[0].should.have.property('planTypeCode');
                basename[0].should.have.property('customerFacingPlanName');
                done();
            });
    });


    it('Test success response property Name: - riderPlan benefitPlanId ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('benefitPlanId');
                done();
            });
    });

    it('Test success response property Name: - riderPlan coverageType ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('coverageType');
                done();
            });
    });
    it('Test success response property Name: - riderPlan gatedProductIndicator ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('gatedProductIndicator');
                done();
            });
    });
    it('Test success response property Name: - riderPlan legalName ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('legalName');
                done();
            });
    });
    it('Test success response property Name: - riderPlan networkScheduleId ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('networkScheduleId');
                done();
            });
    });
    it('Test success response property Name: - riderPlan productName ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('productName');
                done();
            });
    });
    it('Test success response property Name: - riderPlan productId ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('productId');
                done();
            });
    });
    it('Test success response property Name: - riderPlan planTypeCode ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('planTypeCode');
                done();
            });
    });
    it('Test success response property Name: - riderPlan customerFacingPlanName ', function(done) {
        var req = new setupTestData("2090004","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('riderPlan');
                var subscriptionbenefitResp = res.body;
                var basename = subscriptionbenefitResp.riderPlan;
                basename[0].should.have.property('customerFacingPlanName');
                done();
            });
    });


    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("206","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('code');
                error.should.have.property('name');
                error.should.have.property('severity');
                error.should.have.property('origin');
                error.should.have.property('description');
                error.should.have.property('service');
                done();
            });
    });

    it('Test error response property Name: - name', function(done) {
        var req = new setupTestData("206","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('name');
                done();
            });
    });

    it('Test error response property Name: - code', function(done) {
        var req = new setupTestData("206","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('code');
                done();
            });
    });

    it('Test error response property Name: - severity', function(done) {
        var req = new setupTestData("206","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
               // console.log(error);
                error.should.have.property('severity');
                done();
            });
    });

    it('Test error response property Name: - origin', function(done) {
        var req = new setupTestData("206","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('origin');
                done();
            });
    });

    it('Test error response property Name: - description', function(done) {
        var req = new setupTestData("206","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                //console.log(error);
                error.should.have.property('code');
                done();
            });
    });

});
