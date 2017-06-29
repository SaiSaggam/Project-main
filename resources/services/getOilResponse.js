var request = require('request-promise');
/*
Desc: makes a http post call to the Oil services.
Params: jsonObj : The oil formatted json request object.
        path: the path it needs to post that request.
        callback: The callback function it needs to trigger when the call is complete.
Status: Stable
Notes: DO NOT MAKE ANY CHANGES
*/

exports.response = function(jsonObj, type) {

 logger.debug("---- OIL service call - " +type+ " - request Info " +JSON.stringify(jsonObj)+ "-----");
  var userName = '';
  var path = config[type];
  if(type === "findDocument" || type === "getDocument"){
    userName = 'baseui_npd';
  }

  return new Promise(function(resolve, reject){
    var getTheResponse = function(theToken) {
      var token = theToken.access_token;
      var actor = theToken.token_type;
      var timestamp = theToken.expires_in;
      var scope = theToken.scope;

      var postheaders = {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'timestamp': timestamp,
          'actor': actor,
          'scope': scope,
          'Authorization': actor + ' ' + token,
          'userName': userName
      };

      var options = {
          url: config.url + path,
          method: 'POST',
          headers: postheaders,
          body: jsonObj,
          json: true,
          resolveWithFullResponse: true,
          rejectUnauthorized: false,
          requestCert: true,
          agent: false
      };
      request(options).then(function(response){
        resolve(response.body);
      }).catch(function(err){
        logger.error("---- OIL service call - " +type+ " - error Info " + JSON.stringify(err)+ "-----");
        if(!err.error){
          reject({result:{errors:[{code:err.statusCode}]}});
        }
        else{
          reject(err.error);
        }
      }); // end request
    }
     // end getTheResponse
    getTheResponse(L7Token);
  });
}; // end getRes
