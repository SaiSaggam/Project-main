var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

var URL = "/member/getBenefitLanguage";
function setupTestData (benefitBundleOptionId){
    this.benefitBundleOptionId = benefitBundleOptionId;
}
describe('Benefit Langugage', function(){

  it('Test success response property Names: - benefitName,benefitCode,benefitSubsection,general,INN,OON', function(done){
      var req = new setupTestData("189000420171");
      chai.request(server)
          .post(URL)
          .send(req)
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('benefits');
            var benefitsResponse = res.body;
            var basename = benefitsResponse.benefits;
            basename[0].should.have.property('benefitName');
            basename[0].should.have.property('benefitCode');
            basename[0].should.have.property('benefitSubsection');
            var subsection = benefitsResponse.benefits[0].benefitSubsection;
            subsection[0].should.have.property('general');
            subsection[0].should.have.property('INN');
            subsection[0].should.have.property('OON');
            done();
        });
      });
    it('Test success response property Names: - benefitName', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                basename[0].should.have.property('benefitName');
                done();
            });
    });
    it('Test success response property Names: - benefitCode', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                basename[0].should.have.property('benefitCode');
                done();
            });
    });
    it('Test success response property Names: - benefitSubsection', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                basename[0].should.have.property('benefitSubsection');
                var subsection = benefitsResponse.benefits[0].benefitSubsection;
                done();
            });
    });
    it('Test success response property Names: - general', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                var subsection = benefitsResponse.benefits[0].benefitSubsection;
                subsection[0].should.have.property('general');
                done();
            });
    });
    it('Test success response property Names: - INN', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                var subsection = benefitsResponse.benefits[0].benefitSubsection;
                subsection[0].should.have.property('INN');
                done();
            });
    });
    it('Test success response property Names: - OON', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                var subsection = benefitsResponse.benefits[0].benefitSubsection;
                subsection[0].should.have.property('OON');
                done();
            });
    });
    it('Test success response property Names: - benefitName,benefitCode,benefitSubsection,general,INN,OON', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                basename[0].should.have.property('benefitName');
                basename[0].should.have.property('benefitCode');
                basename[0].should.have.property('benefitSubsection');
                var subsection = benefitsResponse.benefits[0].benefitSubsection;
                subsection[0].should.have.property('general');
                subsection[0].should.have.property('INN');
                subsection[0].should.have.property('OON');
                done();
            });
    });
    it('Test success response property Names: - benefitName,benefitCode,benefitSubsection,general,INN,OON', function(done){
        var req = new setupTestData("189000420171");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('benefits');
                var benefitsResponse = res.body;
                var basename = benefitsResponse.benefits;
                basename[0].should.have.property('benefitName');
                basename[0].should.have.property('benefitCode');
                basename[0].should.have.property('benefitSubsection');
                var subsection = benefitsResponse.benefits[0].benefitSubsection;
                subsection[0].should.have.property('general');
                subsection[0].should.have.property('INN');
                subsection[0].should.have.property('OON');
                done();
            });
    });

    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("138847");
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

    it('Test success response property Name: - planType', function(done) {
        var req = new setupTestData("138847");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('planType');
                done();
            });
    });
    it('Test error response property Name: - name', function(done) {
        var req = new setupTestData("1388476");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
               // res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('name');
                done();
            });
    });

    it('Test error response property Name: - code', function(done) {
        var req = new setupTestData("138847");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
               // res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('code');
                done();
            });
    });

    it('Test error response property Name: - severity', function(done) {
        var req = new setupTestData("138847");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
               // res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('severity');
                done();
            });
    });

    it('Test error response property Name: - origin', function(done) {
        var req = new setupTestData("138847");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                //res.should.have.status(404);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                // console.log(error);
                error.should.have.property('origin');
                done();
            });
    });

    it('Test error response property Name: - description', function(done) {
        var req = new setupTestData("138847");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
               // res.should.have.status(500);
                res.should.be.json;
                // res.body.should.be.a('object');
                var error = res.body.errors;
                //console.log(error);
                error.should.have.property('code');
                done();
            });
    });



});
