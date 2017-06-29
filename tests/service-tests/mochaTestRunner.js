var server   = require('../../server'),
    chai     = require('chai'),
    chaiHTTP = require('chai-http'),
    should   = chai.should();

// console.log('server.y is ' + server.y);
chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Running all the tests', function(){

  before(function(done){

    function getTokenFromServer(){
      server.token(function(token){
        if(token === ""){
          setTimeout(getTokenFromServer, 1000);
        }
        else{
          L7Token = token;
          done();
        }
      });
    }
    getTokenFromServer();

  }); //ALL TESTS ARE COMMENTED OUT AS THERE IS NO VALID DATA TO TEST ON.
  /* var individual  = require('./findIndividualService_test.js'),
       findMember  = require('./findMembershipService_test.js'),
       getMember   = require('./getMembershipService_test.js'),
       getMemberFamily = require('./getMemberFamilyService_test.js'),
       getSubscriptionServiceBenefit = require('./getSubscriptionServiceBenefitService_test.js'),
       findEmployerGroup = require('./findEmployerGroupService_test.js'),
       getEmployerGroupService = require('./getEmployerGroupService_test.js'),
       links       = require('./quicklinksService_test.js'),
       accumulator  = require('./getBenefitAccumulatorService_test.js'),
       Language = require('./getBenefitLanguageService_test.js');*/

});
