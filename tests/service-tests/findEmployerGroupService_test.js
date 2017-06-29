var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

// console.log('server.y is ' + server.y);
chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

var URL = "/group/findEmployerGroup";
function setupTestData (groupNo,groupName,state){
    this.groupNo = groupNo;
    this.groupName = groupName;
    this.state = state;
}


describe('findEmployerGroupService', function() {

    it('Test success response property Names: - groupName,groupNo,tel,address,state,sizeDef,effectiveStartDate', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('groupName');
                basename[0].should.have.property('groupNo');
                basename[0].should.have.property('tel');
                basename[0].should.have.property('address');
                basename[0].should.have.property('state');
                basename[0].should.have.property('sizeDef');
                basename[0].should.have.property('effectiveStartDate');
                done();
            });
    });

    it('Test success response property Name: - groupName', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('groupName');
                done();
            });
    });

    it('Test success response property Name: - groupNo', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('groupNo');
                done();
            });
    });

    it('Test success response property Name: - tel', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('tel');
                done();
            });
    });

    it('Test success response property Name: - address', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('address');
                done();
            });
    });

    it('Test success response property Name: - state', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('state');
                done();
            });
    });

    it('Test success response property Name: - sizeDef', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('sizeDef');
                done();
            });
    });

    it('Test success response property Name: -effectiveStartDate', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('effectiveStartDate');
                done();
            });
    });

    // Commented for to work offline env- if you set -NODE_ENV=offline
    // Can be uncommented for other env - local,stage,production


    it('Test error response property Names: - code, name, severity, origin, description, service', function(done) {
        var req = new setupTestData("138846","","");
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
        var req = new setupTestData("138846","","");
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
        var req = new setupTestData("138846","","");
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
        var req = new setupTestData("138846","","");
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
        var req = new setupTestData("138846","","");
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
        var req = new setupTestData("138846","","");
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



    it('Search by Name - provided : Group Name , State', function(done) {
        var req = new setupTestData("1388476","","");
        chai.request(server)
            .post(URL)
            .send(req)
            .end(function(err, res){
                //console.log(res.statusCode);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('groups');
                var empGroupResp = res.body;
                var basename = empGroupResp.groups;
                basename[0].should.have.property('groupName');
                basename[0].should.have.property('groupNo');
                basename[0].should.have.property('tel');
                basename[0].should.have.property('address');
                basename[0].should.have.property('state');
                basename[0].should.have.property('sizeDef');
                basename[0].should.have.property('effectiveStartDate');
                done();
            });
    });
});
