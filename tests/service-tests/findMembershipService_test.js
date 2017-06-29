//To Run the test- mocha --timeout 20000 coverageService_test.js
var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;


var URL = "/member/findMembership";
function setupTestData (surrogateKey,startDate,stopDate){
    this.surrogateKey = surrogateKey;
    this.startDate = startDate;
    this.stopDate = stopDate;
}

describe('coverageService', function() {
    it('Test success response property Names: - systemCode,coverageType,plan,planNo,relationship,group,groupNo,startDate,stopDate', function(done) {
        var req = new setupTestData("903747845","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('systemCode');
                    basename[0].should.have.property('coverageType');
                    basename[0].should.have.property('plan');
                    basename[0].should.have.property('planNo');
                    basename[0].should.have.property('relationship');
                    basename[0].should.have.property('group');
                    basename[0].should.have.property('groupNo');
                    basename[0].should.have.property('startDate');
                    basename[0].should.have.property('stopDate');
                done();
            });
    });

    it('Test success response property Name: - systemCode', function(done) {
        var req = new setupTestData("903747845","","");
            chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('systemCode');
                done();
            });
    });

    it('Test success response property Name: - coverageType', function(done) {
        var req = new setupTestData("903747845","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('coverageType');
                done();
            });
    });
    it('Test success response property Name: - plan', function(done) {
        var req = new setupTestData("903747845","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('plan');
                done();
            });
    });

    it('Test success response property Name: - planNo', function(done) {
        var req = new setupTestData("903747845","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('planNo');
                done();
            });
    });
    it('Test success response property Name: - relationship', function(done) {
            var req = new setupTestData("903747845","","");
            chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('relationship');
                done();
            });
    });

    it('Test success response property Name: - group', function(done) {
        var req = new setupTestData("903747845","","");
            chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('group');

                done();
            });
    });

    it('Test success response property Name: - groupNo', function(done) {
        var req = new setupTestData("903747845","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('groupNo');
                done();
            });
    });


    it('Test success response property Name: - startDate', function(done) {
        var req = new setupTestData("903747845","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('startDate');
                done();
            });
    });

    it('Test success response property Name: - stopDate', function(done) {
        var req = new setupTestData("903747845","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('memberships');
                var coverageResponse = res.body;
                var basename = coverageResponse.memberships;
                    basename[0].should.have.property('stopDate');
                done();
            });
    });


    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("903747845","2014-05-01","");
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
        var req = new setupTestData("903747845","2014-05-01","");
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
        var req = new setupTestData("903747845","2014-05-01","");
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
        var req = new setupTestData("903747845","2014-05-01","");
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
        var req = new setupTestData("903747845","2014-05-01","");
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
        var req = new setupTestData("903747845","2014-05-01","");
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
