var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

// console.log('server.y is ' + server.y);
chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Quick Links -Additional link Listing', function(){

  it('getQuickLinks - Test success response property Names: - Title', function(done){
    chai.request(server)
        .get('/quicklinks/getQuickLinks')
        .end(function(err,res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          var base = res.body.links[0];
          base.should.have.property('title');
          done();
        });
      });

  it('getQuickLinks - Test success response property Names: - URL', function(done){
    chai.request(server)
        .get('/quicklinks/getQuickLinks')
        .end(function(err,res){
         res.should.have.status(200);
         res.should.be.json;
         res.body.should.be.a('object');
         var base = res.body.links[0];
         base.should.have.property('url');
         done();
        });
      });

  it('postQuickLinks - Test postQuickLink save with property Names: - Title', function(done){
    chai.request(server)
        .post('/quicklinks/postQuickLinks')
        .send({
            "links": [
                {
                    "title": "Knowledge Library",
                    "url": ""
                }
            ]
        })
        .end(function(err,res){
          res.should.have.status(200);
            var base = res.body;
            for(var i = 0; i < base.length; i++){
                if(base[i].hasOwnProperty('title')){
                    base[i].should.have.property('title');
                    base[i].should.have.property('url');
                    base[i].title.should.equal('Knowledge Library');
                    base[i].url.should.equal('');
                }
            }
          done();
    });
  });

  it('Test postQuickLink save with property Names: - url', function(done){
    chai.request(server)
        .post('/quicklinks/postQuickLinks')
        .send({
            "links": [
                {
                    "title": "",
                    "url": "http://kl/bboard.aspx"
                }
            ]
        })
        .end(function(err,res){
          res.should.have.status(200);
            var base = res.body;
            for(var i = 0; i < base.length; i++){
                if(base[i].hasOwnProperty('title')){
                    base[i].should.have.property('title');
                    base[i].should.have.property('url');
                    base[i].title.should.equal('');
                    base[i].url.should.equal('http://kl/bboard.aspx');
                }
            }
          done();
    });
  });

  it('Test postQuickLink save with property Names: - Title, url', function(done){
      chai.request(server)
        .post('/quicklinks/postQuickLinks')
        .send({
            "links": [
                {
                    "title": "Knowledge Library",
                    "url": "http://kl/bboard.aspx"
                }
            ]
        })
        .end(function(err,res){
          res.should.have.status(200);
            var base = res.body;
            for(var i = 0; i < base.length; i++){
                if(base[i].hasOwnProperty('title')){
                    base[i].should.have.property('title');
                    base[i].should.have.property('url');
                    base[i].title.should.equal('Knowledge Library');
                    base[i].url.should.equal('http://kl/bboard.aspx');
                }
            }
          done();
        });
      });
});
