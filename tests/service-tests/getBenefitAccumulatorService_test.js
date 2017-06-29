var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

// console.log('server.y is ' + server.y);
chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

var URL = "/member/getBenefitAccumulator";
function setupTestData (benefitBundleOptionId,surrogateKey,startDate,stopDate){
    this.benefitBundleOptionId = benefitBundleOptionId;
    this.surrogateKey = surrogateKey;
    this.startDate = startDate;
    this.stopDate = stopDate;
}
describe('getBenefitAccumulator', function() {

    it('Test success response property Names: - INN,OON', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                res.body.should.have.property('OON');
                done();
            });
    });
    it('Test success response property Name: - INN information', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualDeductibleMax');
                basename.should.have.property('individualDeductibleYTD');
                basename.should.have.property('individualDeductibleRem');
                basename.should.have.property('familyDeductibleMax');
                basename.should.have.property('familyDeductibleYTD');
                basename.should.have.property('familyDeductibleRem');
                basename.should.have.property('individualOOPMax');
                basename.should.have.property('individualOOPYTD');
                basename.should.have.property('individualOOPRem');
                basename.should.have.property('familyOOPMax');
                basename.should.have.property('familyOOPYTD');
                basename.should.have.property('familyOOPRem');
                done();
            });
    });

    it('Test success response property Name: - OON ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.OON;
                basename.should.have.property('individualDeductibleMax');
                basename.should.have.property('individualDeductibleYTD');
                basename.should.have.property('individualDeductibleRem');
                basename.should.have.property('familyDeductibleMax');
                basename.should.have.property('familyDeductibleYTD');
                basename.should.have.property('familyDeductibleRem');
                basename.should.have.property('individualOOPMax');
                basename.should.have.property('individualOOPYTD');
                basename.should.have.property('individualOOPRem');
                basename.should.have.property('familyOOPMax');
                basename.should.have.property('familyOOPYTD');
                basename.should.have.property('familyOOPRem');
                done();
            });
    });

    it('Test success response property Name: - INN- individualDeductibleMax', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualDeductibleMax');
                done();
            });
    });

    it('Test success response property Name: - INN- individualDeductibleYTD', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualDeductibleYTD');
                done();
            });
    });

    it('Test success response property Name: - INN- individualDeductibleRem', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualDeductibleRem');
                done();
            });
    });


    it('Test success response property Name: - INN - familyDeductibleMax', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyDeductibleMax');
                done();
            });
    });



    it('Test success response property Name: - INN - familyDeductibleYTD', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyDeductibleYTD');
                done();
            });
    });


    it('Test success response property Name: - INN - familyDeductibleRem', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyDeductibleRem');
                done();
            });
    });


    it('Test success response property Name: - INN - individualOOPMax ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualOOPMax');
                done();
            });
    });


    it('Test success response property Name: - INN - individualOOPYTD ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualOOPYTD');
                done();
            });
    });

    it('Test success response property Name: - INN - individualOOPRem ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualOOPRem');
                done();
            });
    });
    it('Test success response property Name: - INN - familyOOPMax ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyOOPMax');
                done();
            });
    });
    it('Test success response property Name: - INN - familyOOPYTD ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyOOPYTD');
                done();
            });
    });
    it('Test success response property Name: - INN - familyOOPRem ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('INN');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyOOPRem');
                done();
            });
    });


    it('Test success response property Name: - OON- individualDeductibleMax', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualDeductibleMax');
                done();
            });
    });

    it('Test success response property Name: - OON- individualDeductibleYTD', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualDeductibleYTD');
                done();
            });
    });

    it('Test success response property Name: - OON- individualDeductibleRem', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualDeductibleRem');
                done();
            });
    });


    it('Test success response property Name: - OON - familyDeductibleMax', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyDeductibleMax');
                done();
            });
    });



    it('Test success response property Name: - OON - familyDeductibleYTD', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyDeductibleYTD');
                done();
            });
    });


    it('Test success response property Name: - OON - familyDeductibleRem', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyDeductibleRem');
                done();
            });
    });


    it('Test success response property Name: - OON - individualOOPMax ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualOOPMax');
                done();
            });
    });


    it('Test success response property Name: - OON - individualOOPYTD ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualOOPYTD');
                done();
            });
    });

    it('Test success response property Name: - OON - individualOOPRem ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('individualOOPRem');
                done();
            });
    });
    it('Test success response property Name: - OON - familyOOPMax ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyOOPMax');
                done();
            });
    });
    it('Test success response property Name: - OON - familyOOPYTD ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyOOPYTD');
                done();
            });
    });
    it('Test success response property Name: - OON - familyOOPRem ', function(done) {
        var req = new setupTestData("35567894","999521234367","2016-03-01","9999-12-31");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('OON');
                var benefitAccumulatorResp = res.body;
                var basename = benefitAccumulatorResp.INN;
                basename.should.have.property('familyOOPRem');
                done();
            });
    });

    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("35567894","903747849","2016-03-01","9999-12-31");
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
        var req = new setupTestData("35567894","903747849","2016-03-01","9999-12-31");
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
        var req = new setupTestData("35567894","903747849","2016-03-01","9999-12-31");
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
        var req = new setupTestData("35567894","903747849","2016-03-01","9999-12-31");
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
                res.should.have.status(400);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('origin');
                done();
            });
    });

    it('Test error response property Name: - description', function(done) {
        var req = new setupTestData("35567894","903747849","2016-03-01","9999-12-31");
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
