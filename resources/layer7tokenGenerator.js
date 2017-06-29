// /*
// Desc: makes a http post call to Layer 7 to get the token, actor, timestamp, scope.
// Params: callback: The callback function it needs to trigger when the call is complete.
// Status: Stable
// Notes: DO NOT MAKE ANY CHANGES
// */
var request = require('request-promise');
var CryptoJS = require("crypto-js");

exports.tokenGen = function(encryptClientId, encryptClientSecret){
  return new Promise(function(resolve, reject){
    logger.info('>>> get layer7 token  >>>');
    var clientId  = CryptoJS.AES.decrypt(encryptClientId, 'navigators');
    var clientId = clientId.toString(CryptoJS.enc.Utf8);

    var clientSecret  = CryptoJS.AES.decrypt(encryptClientSecret, 'navigators');
    var clientSecret = clientSecret.toString(CryptoJS.enc.Utf8);

    var pheaders = {'Content-Type': 'application/x-www-form-urlencoded'};

    var options = {
      url: config.token.url,
      qs: { client_id: clientId,  client_secret: clientSecret, grant_type: config.token.grant_type },
      method: 'POST',
      headers: pheaders,
      json: true,
      // resolveWithFullResponse: true,
      rejectUnauthorized: false,
      requestCert: true,
      agent: false
    };

    request(options)
    .then(function(body){
      logger.info('<<< get layer7 token  <<<');
      resolve(body);
    })
    .catch(function(err){
      logger.error('<<< get layer7 token '+ err +' <<<');
      reject(err);
    });
  });
};

//DEPRECIATED - OLD VERSION USING CALLBACKS
// var request = require('request');
// var CryptoJS = require("crypto-js");
//
// exports.tokenGen = function(encryptClientId, encryptClientSecret, callback){
//
//   var clientId  = CryptoJS.AES.decrypt(encryptClientId, 'navigators');
//   var clientId = clientId.toString(CryptoJS.enc.Utf8);
//
//   var clientSecret  = CryptoJS.AES.decrypt(encryptClientSecret, 'navigators');
//   var clientSecret = clientSecret.toString(CryptoJS.enc.Utf8);
//
// var pheaders = {'Content-Type': 'application/x-www-form-urlencoded'};
//
// var options = {
//   url: config.token.url,
//   qs: { client_id: clientId,  client_secret: clientSecret, grant_type: config.token.grant_type },
//   method: 'POST',
//   headers: pheaders,
//   rejectUnauthorized: false,
//   requestCert: true,
//   agent: false
// };
//
// request(options, function(error, response, body) {
//     if(error){
//       logger.fatal(error);
//       // console.log(error);
//     } else {
//       // logger.info(body);
//       callback(body);
//     }
//   });
// };
