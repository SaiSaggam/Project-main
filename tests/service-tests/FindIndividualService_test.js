var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

// console.log('server.y is ' + server.y);
chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

describe('findIndividualService', function() {

    var URL = "/member/findIndividual";
    function setupTestData (memberId,firstName,lastName,state,dob,zipCode){
        this.memberId = memberId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.state = state;
        this.dob = dob;
        this.zipCode = zipCode;
    }

    it('Test success response property Names: - surrogateKey,memberId,firstName,middleName,lastName,dob,gender,address', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
              //  console.log(res);
              //  console.log(err);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('surrogateKey');
                basename[0].should.have.property('memberId');
                var memberId = basename[0].memberId;
                memberId.should.have.property('id');
                memberId.should.have.property('type');
                memberId.should.have.property('sourceSysCode');
                basename[0].should.have.property('firstName');
                basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');
                done();
            });
    });


    it('Test success response property Name: - surrogateKey', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('surrogateKey');
                done();
            });
    });

    it('Test success response property Name: - memberId', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('memberId');
                var memberId = basename[0].memberId;
                memberId.should.have.property('id');
                memberId.should.have.property('type');
                memberId.should.have.property('sourceSysCode');
                basename[0].should.have.property('firstName');
                done();
            });
    });

    it('Test success response property Name: - firstName', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('firstName');
                done();
            });
    });

    it('Test success response property Name: - middleName', function(done) {

        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('middleName');
                done();
            });
    });

    it('Test success response property Name: - lastName', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('lastName');
                done();
            });
    });

    it('Test success response property Name: - dob', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('dob');

                done();
            });
    });

    it('Test success response property Name: -gender', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('gender');
                done();
            });
    });

    it('Test success response property Name: - address', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('address');
                done();
            });
    });

    // Commented for to work offline env- if you set -NODE_ENV=offline
    // Can be uncommented for other env - local,stage,production


    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("aa","","","","","");
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
        var req = new setupTestData("aa","","","","","");
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
        var req = new setupTestData("aa","","","","","");
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
        var req = new setupTestData("aa","","","","","");
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
        var req = new setupTestData("aa","","","","","");
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
        var req = new setupTestData("aa","","","","","");
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


    it('Search by Member ID - provided : memberID ', function(done) {
        var req = new setupTestData("53879674100","","","","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('memberId');
                basename[0].memberId.id.should.equal('53879674100');
                basename[0].memberId.should.have.property('type');
                basename[0].should.have.property('firstName');
                basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');
                done();
            });
    });

    it('Search by Name - provided : Last Name , State', function(done) {

        var req = new setupTestData("","","Wilson","CT","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('surrogateKey');
                basename[0].should.have.property('firstName');
               // basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');

                done();
            });
    });

    it('Search by Name - provided : Last Name , State, Zip Code', function(done) {

        var req = new setupTestData("","","Wilson","CT","","06059");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('surrogateKey');
                // basename[i].memberId.should.equal('0750523301');
                basename[0].should.have.property('firstName');
               // basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');
                done();
            });
    });

    it('Search by Name - provided : Last Name, State, DOB', function(done) {
        var req = new setupTestData("","","Wilson","CT","1966-07-08","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('surrogateKey');
                // basename[i].memberId.should.equal('0750523301');
                basename[0].should.have.property('firstName');
                //basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');

                done();
            });
    });

    it('Search by Name - provided : Last Name , State, First Name', function(done) {
        var req = new setupTestData("","Andrea","Wilson","CT","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('surrogateKey');
                basename[0].should.have.property('firstName');
               // basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');
                done();
            });
    });

    it('Search by Name - provided : Last Name , State, DOB, First Name', function(done) {
        var req = new setupTestData("","Andrea","Wilson","CT","1966-07-08","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('surrogateKey');
                //basename[i].memberId.should.equal('0750523301');
                basename[0].should.have.property('firstName');
               // basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');

                done();
            });
    });


    it('Search by Name - provided : Last Name , State,Active as of, DOB, First Name,zipcode', function(done) {
        var req = new setupTestData("","Andrea","Wilson","CT","1966-07-08","06059");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('individual');
                var findIndividualResp = res.body;
                var basename = findIndividualResp.individual;
                basename[0].should.have.property('memberId');
                // basename[i].memberId.should.equal('0750523301');
                basename[0].should.have.property('firstName');
               // basename[0].should.have.property('middleName');
                basename[0].should.have.property('lastName');
                basename[0].should.have.property('dob');
                basename[0].should.have.property('gender');
                basename[0].should.have.property('address');

                done();
            });
    });

});
