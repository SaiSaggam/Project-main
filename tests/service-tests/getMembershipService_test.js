//To Run the test- mocha --timeout 20000 getMembershipService_test.js
var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

var URL = "/member/getMembership";
function setupTestData (surrogateKey,groupNo){
    this.surrogateKey = surrogateKey;
    this.groupNo = groupNo;
}

describe('getMembership', function() {

    it('Test success response property Names: - benefitBundleOptionId,benefitBundleOptionDesc,planType', function(done) {
        var req = new setupTestData("903747845","1558486");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundleOptionId');
                res.body.should.have.property('benefitBundleOptionDesc');
                res.body.should.have.property('startDate');
                res.body.should.have.property('stopDate');
                done();
            });
    });

    it('Test success response property Name: - benefitBundleOptionId', function(done) {
        var req = new setupTestData("903747845","1558486");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundleOptionId');
                done();
            });
    });

    it('Test success response property Name: - benefitBundleOptionDesc', function(done) {
        var req = new setupTestData("903747845","1558486");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefitBundleOptionDesc');
                done();
            });
    });
    it('Test success response property Name: - startDate', function(done) {
        var req = new setupTestData("903747845","1558486");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('startDate');
                done();
            });
    });
    it('Test success response property Name: - stopDate', function(done) {
        var req = new setupTestData("903747845","1558486");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('stopDate');
                done();
            });
    });
    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("903747845","15584");
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
        var req = new setupTestData("903747845","15584");
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
        var req = new setupTestData("903747845","15584");
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
        var req = new setupTestData("903747845","15584");
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
        var req = new setupTestData("903747845","15584");
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
        var req = new setupTestData("903747845","15584");
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
