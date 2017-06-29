//To Run the test- mocha --timeout 20000 getMembershipService_test.js
var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

var URL = "/group/getEmployerGroup";
function setupTestData (groupNo,startDate,stopDate,benefitBundleOptionId){
    this.groupNo = groupNo;
    this.startDate = startDate;
    this.stopDate = stopDate;
    this.benefitBundleOptionId = benefitBundleOptionId;
}


describe('getEmployerGroup', function() {

    it('Test success response property Names: - basePlanDesc,basePlanNo,coverageStartDate,coverageExpiryDate,benefitBundleOptionId', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                basename[0].should.have.property('basePlanDesc');
                basename[0].should.have.property('basePlanNo');
                basename[0].should.have.property('networkScheduleId');
                basename[0].should.have.property('coverageStartDate');
                basename[0].should.have.property('coverageExpiryDate');
                basename[0].should.have.property('benefitBundleOptionId');
                done();
            });
    });

    it('Test success response property Name: - basePlanDesc', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                basename[0].should.have.property('basePlanDesc');
                done();
            });
    });

    it('Test success response property Name: - basePlanNo', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                basename[0].should.have.property('basePlanNo');
                done();
            });
    });

    it('Test success response property Name: - networkScheduleId', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                basename[0].should.have.property('networkScheduleId');
                done();
            });
    });

    it('Test success response property Name: - coverageStartDate', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                basename[0].should.have.property('coverageStartDate');
                done();
            });
    });

    it('Test success response property Name: - coverageExpiryDate', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                basename[0].should.have.property('coverageExpiryDate');
                done();
            });
    });

    it('Test success response property Name: - benefitBundleOptionId', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                basename[0].should.have.property('benefitBundleOptionId');
                done();
            });
    });

    it('Test success response property Name: - benefitBundleOptionId', function(done) {
        var req = new setupTestData("1388476","1010-06-07","9999-06-07","1940004");

        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundles');
                var benefitBundlesResp = res.body;
                var basename = benefitBundlesResp.benefitBundles;
                var benefitBundleOptionIdValue = basename[0].benefitBundleOptionId;
                basename[0].should.have.property('benefitBundleOptionId');
                benefitBundleOptionIdValue.should.equal('1940004');
                done();
            });
    });


    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("1111331");
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
        var req = new setupTestData("1111331");
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
        var req = new setupTestData("1111331");
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
        var req = new setupTestData("1111331");
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
        var req = new setupTestData("1111331");
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
        var req = new setupTestData("1111331");
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
